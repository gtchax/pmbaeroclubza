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
          (err as { errors: Array<{ code: string }> }).errors[0]?.code === "form_identifier_exists"
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

        // Determine the user role based on userType
        let userRole = "STUDENT"; // Default role
        if (userType === "commercial") {
          userRole = "INSTRUCTOR"; // Commercial users typically become instructors
        }

        // Create the user with Clerk including role information
        const result = await signUp.create({
          emailAddress: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone,
          publicMetadata: {
            userType: userType,
            userRole: userRole,
            registrationStep: "personal_details_completed",
            registrationDate: new Date().toISOString(),
            isActive: true,
          },
          privateMetadata: {
            // Store sensitive information in private metadata
            registrationSource: "pmb_aeroclub_website",
            registrationFlow: "multi_step_registration",
          },
        });

        if (result.status === "complete") {
          // User created successfully, set as active
          await setActive({ session: result.createdSessionId });
          return true;
        } else if (result.status === "missing_requirements") {
          // Handle verification requirements
          if (result.verifications.emailAddress?.status === "unverified") {
            // Email verification required
            await result.verifications.emailAddress.prepareEmailAddressVerification();
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
          (err as { errors: Array<{ code: string }> }).errors[0]?.code === "form_identifier_exists"
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
      await signUp.verifications.emailAddress.prepareEmailAddressVerification();
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

  const verifyEmail = useCallback(
    async (code: string) => {
      if (!isLoaded || !signUp) return false;

      try {
        const result =
          await signUp.verifications.emailAddress.attemptEmailAddressVerification(
            {
              code,
            }
          );

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          return true;
        }

        return false;
      } catch (err: unknown) {
        setError(
          (err instanceof Error ? err.message : "Invalid verification code") ||
            "Invalid verification code"
        );
        return false;
      }
    },
    [isLoaded, signUp, setActive]
  );

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
