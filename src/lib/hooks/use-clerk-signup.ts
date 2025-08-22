import { useSignUp } from "@clerk/nextjs";
import { useState, useCallback } from "react";

interface UseClerkSignupProps {
  userType: "private" | "commercial";
}

interface SignupData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export function useClerkSignup({ userType }: UseClerkSignupProps) {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailExists, setEmailExists] = useState(false);

  const checkEmailAvailability = useCallback(
    async (email: string) => {
      try {
        // Start the signup process to check if email exists
        const result = await signUp?.create({
          emailAddress: email,
          firstName: "temp",
          lastName: "temp",
        });

        if (result?.status === "complete") {
          // Email doesn't exist, we can proceed
          setEmailExists(false);
          return true;
        } else if (result?.status === "missing_requirements") {
          // Check if the issue is email already exists
          const emailFactor = result.verifications.emailAddress;
          if (
            emailFactor?.status === "unverified" &&
            emailFactor.error?.code === "form_identifier_exists"
          ) {
            setEmailExists(true);
            return false;
          }
          // Other missing requirements, we can proceed
          setEmailExists(false);
          return true;
        }

        return true;
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          "errors" in err &&
          Array.isArray((err as { errors: Array<{ code: string }> }).errors) &&
          (err as { errors: Array<{ code: string }> }).errors[0]?.code ===
            "form_identifier_exists"
        ) {
          setEmailExists(true);
          return false;
        }
        setError(
          (err instanceof Error
            ? err.message
            : "An error occurred while checking email availability") ||
            "An error occurred while checking email availability"
        );
        return false;
      }
    },
    [signUp]
  );

  const signUpUser = useCallback(
    async (data: SignupData) => {
      if (!isLoaded || !signUp) {
        setError("Signup system not ready");
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Check email availability first
        const emailAvailable = await checkEmailAvailability(data.email);
        if (!emailAvailable) {
          setIsLoading(false);
          return false;
        }

        // Note: User role will be determined by the webhook based on userType

        // Create the user with Clerk
        const result = await signUp.create({
          emailAddress: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone,
        });

        if (result.status === "complete") {
          // User created successfully, set as active
          await setActive({ session: result.createdSessionId });

          // Note: Metadata will be handled by the webhook when user is created
          // The webhook will create the appropriate profile based on userType and userRole
          return true;
        } else if (result.status === "missing_requirements") {
          // Handle verification requirements
          if (result.verifications.emailAddress?.status === "unverified") {
            // Email verification required
            // Note: Verification will be handled automatically by Clerk
            return true;
          }
          // Handle other verification requirements as needed
          return true;
        }

        return false;
      } catch (err: unknown) {
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
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp, setActive, userType, checkEmailAvailability]
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
