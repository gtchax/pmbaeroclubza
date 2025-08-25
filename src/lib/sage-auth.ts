import { sageApi } from "./sage-api";

// ================================
// SAGE OAUTH2 CONFIGURATION
// ================================

export interface SageOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
  tokenUrl: string;
}

export interface SageTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface SageAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  companyId: string | null;
}

// Default SAGE OAuth2 configuration
export const SAGE_OAUTH_CONFIG: SageOAuthConfig = {
  clientId: process.env.SAGE_CLIENT_ID || "",
  clientSecret: process.env.SAGE_CLIENT_SECRET || "",
  redirectUri:
    process.env.SAGE_REDIRECT_URI ||
    "http://localhost:3000/api/auth/sage/callback",
  scope: "full_access",
  authUrl: "https://www.sageone.com/oauth2/auth/central",
  tokenUrl: "https://oauth.accounting.sage.com/token",
};

// ================================
// OAUTH2 AUTHENTICATION FLOW
// ================================

export class SageOAuthManager {
  private config: SageOAuthConfig;
  private state: SageAuthState;

  constructor(config: SageOAuthConfig = SAGE_OAUTH_CONFIG) {
    this.config = config;
    this.state = this.loadAuthState();
  }

  // ================================
  // AUTHENTICATION INITIATION
  // ================================

  /**
   * Generate the OAuth2 authorization URL
   */
  generateAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope,
      response_type: "code",
      state: this.generateState(),
    });

    return `${this.config.authUrl}?${params.toString()}`;
  }

  /**
   * Handle the OAuth2 callback with authorization code
   */
  async handleCallback(code: string, state: string): Promise<SageAuthState> {
    try {
      // Verify state parameter
      if (!this.verifyState(state)) {
        throw new Error("Invalid state parameter");
      }

      // Exchange authorization code for access token
      const tokenResponse = await this.exchangeCodeForToken(code);

      // Update authentication state
      this.state = {
        isAuthenticated: true,
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        expiresAt: Date.now() + tokenResponse.expires_in * 1000,
        companyId: null, // Will be set when fetching company info
      };

      // Save state
      this.saveAuthState();

      // Update SAGE API client with new token
      sageApi.setAccessToken(tokenResponse.access_token);

      return this.state;
    } catch (error) {
      console.error("Error handling OAuth callback:", error);
      throw error;
    }
  }

  // ================================
  // TOKEN MANAGEMENT
  // ================================

  /**
   * Exchange authorization code for access token
   */
  private async exchangeCodeForToken(code: string): Promise<SageTokenResponse> {
    const response = await fetch(this.config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${this.config.clientId}:${this.config.clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(): Promise<string | null> {
    if (!this.state.refreshToken) {
      return null;
    }

    try {
      const response = await fetch(this.config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${this.config.clientId}:${this.config.clientSecret}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.state.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const tokenResponse: SageTokenResponse = await response.json();

      // Update state with new tokens
      this.state.accessToken = tokenResponse.access_token;
      this.state.expiresAt = Date.now() + tokenResponse.expires_in * 1000;

      // Update refresh token if provided
      if (tokenResponse.refresh_token) {
        this.state.refreshToken = tokenResponse.refresh_token;
      }

      this.saveAuthState();
      sageApi.setAccessToken(tokenResponse.access_token);

      return tokenResponse.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Clear invalid tokens
      this.clearAuthState();
      return null;
    }
  }

  /**
   * Check if access token is valid and refresh if needed
   */
  async ensureValidToken(): Promise<string | null> {
    if (!this.state.isAuthenticated || !this.state.accessToken) {
      return null;
    }

    // Check if token is expired or will expire soon (within 5 minutes)
    if (
      this.state.expiresAt &&
      Date.now() > this.state.expiresAt - 5 * 60 * 1000
    ) {
      return await this.refreshAccessToken();
    }

    return this.state.accessToken;
  }

  // ================================
  // COMPANY SELECTION
  // ================================

  /**
   * Set the company ID for API calls
   */
  setCompanyId(companyId: string): void {
    this.state.companyId = companyId;
    this.saveAuthState();
    sageApi.setCompanyId(companyId);
  }

  /**
   * Get the current company ID
   */
  getCompanyId(): string | null {
    return this.state.companyId;
  }

  // ================================
  // AUTHENTICATION STATE MANAGEMENT
  // ================================

  /**
   * Get current authentication state
   */
  getAuthState(): SageAuthState {
    return { ...this.state };
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.state.isAuthenticated && !!this.state.accessToken;
  }

  /**
   * Clear authentication state
   */
  clearAuthState(): void {
    this.state = {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      companyId: null,
    };
    this.saveAuthState();
    sageApi.clearAuth();
  }

  // ================================
  // UTILITY METHODS
  // ================================

  /**
   * Generate random state parameter for CSRF protection
   */
  private generateState(): string {
    const state = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("sage_oauth_state", state);
    return state;
  }

  /**
   * Verify state parameter
   */
  private verifyState(state: string): boolean {
    const storedState = sessionStorage.getItem("sage_oauth_state");
    sessionStorage.removeItem("sage_oauth_state");
    return storedState === state;
  }

  /**
   * Load authentication state from storage
   */
  private loadAuthState(): SageAuthState {
    if (typeof window === "undefined") {
      return {
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        companyId: null,
      };
    }

    try {
      const stored = localStorage.getItem("sage_auth_state");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if token is still valid
        if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
    }

    return {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      companyId: null,
    };
  }

  /**
   * Save authentication state to storage
   */
  private saveAuthState(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("sage_auth_state", JSON.stringify(this.state));
    } catch (error) {
      console.error("Error saving auth state:", error);
    }
  }
}

// Export singleton instance
export const sageOAuthManager = new SageOAuthManager();

// ================================
// HOOKS FOR REACT COMPONENTS
// ================================

export function useSageAuth() {
  const authState = sageOAuthManager.getAuthState();
  const isAuthenticated = sageOAuthManager.isAuthenticated();

  const login = () => {
    const authUrl = sageOAuthManager.generateAuthUrl();
    window.location.href = authUrl;
  };

  const logout = () => {
    sageOAuthManager.clearAuthState();
  };

  const refreshToken = async () => {
    return await sageOAuthManager.refreshAccessToken();
  };

  const ensureValidToken = async () => {
    return await sageOAuthManager.ensureValidToken();
  };

  const setCompanyId = (companyId: string) => {
    sageOAuthManager.setCompanyId(companyId);
  };

  return {
    authState,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    ensureValidToken,
    setCompanyId,
  };
}
