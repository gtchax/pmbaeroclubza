import { useSignUp } from "@clerk/nextjs";
import { useState, useCallback } from "react";

interface SignupData {
  emailAddress: string;
  password: string; // Add password field for Clerk
  // firstName: string;
  // lastName: string;
  // phone?: string; // Keep for database storage, not for Clerk
  // userType?: "private" | "commercial";
  // userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  // // Additional fields that will be saved to database
  // [key: string]: any;
}

export function useClerkSignup() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailExists, setEmailExists] = useState(false);

  // Separate function for checking email availability without affecting signup state
  const checkEmailOnly = useCallback(async (email: string) => {
    try {
      if (!email || !email.includes("@")) {
        return {
          available: false,
          exists: false,
          error: "Invalid email format",
        };
      }

      const response = await fetch(
        `/api/clerk/check-email?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          available: !data.exists,
          exists: data.exists,
          error: null,
        };
      } else {
        return {
          available: true, // Assume available if API fails
          exists: false,
          error: "Unable to verify email availability",
        };
      }
    } catch {
      return {
        available: true, // Assume available if there's an error
        exists: false,
        error: "Failed to check email availability",
      };
    }
  }, []);

  const checkEmailAvailability = useCallback(
    async (email: string) => {
      try {
        if (!email || !email.includes("@")) {
          setEmailExists(false);
          return true;
        }

        // Use the separate email check function
        const result = await checkEmailOnly(email);

        if (result.exists) {
          setEmailExists(true);
          return false;
        } else {
          setEmailExists(false);
          return true;
        }
      } catch (err: unknown) {
        setError(
          (err instanceof Error
            ? err.message
            : "An error occurred while checking email availability") ||
            "An error occurred while checking email availability"
        );
        return false;
      }
    },
    [checkEmailOnly]
  );

  const signUpUser = useCallback(
    async (
      data: SignupData
    ): Promise<{ success: boolean; userId: string | null }> => {
      if (!isLoaded || !signUp) {
        setError("Signup system not ready");
        return { success: false, userId: null };
      }

      setIsLoading(true);
      setError(null);

      // Create the user with Clerk (phone number will be handled separately for database)
      const signUpData: { emailAddress: string; password: string } = {
        emailAddress: data.emailAddress,
        password: data.password,
      };

      console.log("Creating Clerk user with data:", signUpData);
      console.log("Raw data received:", data);
      // console.log("firstName value:", data.firstName);
      // console.log("lastName value:", data.lastName);

      try {
        // Check email availability first
        const emailAvailable = await checkEmailAvailability(data.emailAddress);
        if (!emailAvailable) {
          setIsLoading(false);
          return { success: false, userId: null };
        }

        const result = await signUp.create(signUpData);

        if (result.status === "complete") {
          // User created successfully, set as active
          await setActive({ session: result.createdSessionId });

          // Return the user ID for profile completion
          return { success: true, userId: result.createdSessionId };
        } else if (result.status === "missing_requirements") {
          // Handle verification requirements
          if (result.verifications.emailAddress?.status === "unverified") {
            // Email verification required
            // Note: Verification will be handled automatically by Clerk
            return { success: true, userId: result.createdSessionId };
          }
          // Handle other verification requirements as needed
          return { success: true, userId: result.createdSessionId };
        }

        return { success: false, userId: null };
      } catch (err: unknown) {
        console.error("Clerk signup error:", err);

        // Handle other parameter errors if needed
        if (
          err &&
          typeof err === "object" &&
          "errors" in err &&
          Array.isArray(
            (err as { errors: Array<{ code: string; message: string }> }).errors
          )
        ) {
          const errors = (
            err as { errors: Array<{ code: string; message: string }> }
          ).errors;

          // Log any parameter errors for debugging
          if (errors.length > 0) {
            console.error("Clerk parameter errors:", errors);
          }
        }

        if (
          err &&
          typeof err === "object" &&
          "errors" in err &&
          Array.isArray((err as { errors: Array<{ code: string }> }).errors) &&
          (err as { errors: Array<{ code: string }> }).errors[0]?.code ===
            "form_identifier_exists"
        ) {
          setEmailExists(true);
          setError("An account with this email already exists");
        } else {
          setError(
            (err instanceof Error
              ? err.message
              : "An error occurred during signup") ||
              "An error occurred during signup"
          );
        }
        return { success: false, userId: null };
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp, setActive, checkEmailAvailability]
  );

  const resendVerificationEmail = useCallback(async () => {
    if (!isLoaded || !signUp) return false;

    try {
      // Note: Email verification is handled automatically by Clerk
      // The user will receive verification emails automatically
      return true;
    } catch (err: unknown) {
      setError(
        (err instanceof Error
          ? err.message
          : "Failed to resend verification email") ||
          "Failed to resend verification email"
      );
      return false;
    }
  }, [isLoaded, signUp]);

  const verifyEmail = useCallback(async () => {
    if (!isLoaded || !signUp) return false;

    try {
      // Note: Email verification is handled automatically by Clerk
      // Users will receive verification emails and can verify through the Clerk dashboard
      return true;
    } catch (err: unknown) {
      setError(
        (err instanceof Error ? err.message : "Invalid verification code") ||
          "Invalid verification code"
      );
      return false;
    }
  }, [isLoaded, signUp]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearEmailExists = useCallback(() => {
    setEmailExists(false);
  }, []);

  return {
    signUpUser,
    checkEmailAvailability,
    checkEmailOnly,
    resendVerificationEmail,
    verifyEmail,
    isLoading,
    error,
    emailExists,
    clearError,
    clearEmailExists,
    isLoaded,
  };
}
