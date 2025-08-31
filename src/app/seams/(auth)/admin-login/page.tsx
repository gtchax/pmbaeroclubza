"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Shield,
  Mail,
  Lock,
  AlertTriangle,
  Plane,
} from "lucide-react";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const { signIn, setActive } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    setShowVerificationMessage(false);

    try {
      // First, validate admin credentials and privileges
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === "EMAIL_NOT_VERIFIED") {
          setShowVerificationMessage(true);
          // Send verification email
          await fetch("/api/admin/resend-verification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.email }),
          });
        } else {
          throw new Error(result.error || "Login failed");
        }
        return;
      }

      // If admin validation passes, sign in with Clerk
      try {
        const signInResult = await signIn?.create({
          identifier: data.email,
          password: data.password,
        });

        if (signInResult?.status === "complete") {
          // Set the user session active
          await setActive?.({ session: signInResult.createdSessionId });

          // Redirect to dashboard
          router.push("/seams/admin");
        } else if (signInResult?.status === "needs_first_factor") {
          // User needs to verify email
          setShowVerificationMessage(true);
        } else {
          throw new Error("Sign in failed");
        }
      } catch (signInError: unknown) {
        console.error("Clerk sign in error:", signInError);
        throw new Error("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const email = document.querySelector<HTMLInputElement>(
        'input[name="email"]'
      )?.value;
      if (!email) return;

      await fetch("/api/admin/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setError("Verification email sent. Please check your inbox.");
    } catch (error) {
      console.error("Failed to send verification email:", error);
      setError("Failed to send verification email. Please try again.");
    }
  };

  const handleGoToVerification = () => {
    const email = document.querySelector<HTMLInputElement>(
      'input[name="email"]'
    )?.value;
    if (email) {
      router.push(`/seams/verify-email?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-12 w-12 text-[#f6d57f] mr-3" />
            <h1 className="text-4xl font-bold text-white">PMB Aero Club</h1>
          </div>
          <p className="text-gray-300 text-lg">Admin Login System</p>
        </div>

        <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6d57f] rounded-full mb-4 mx-auto">
              <Shield className="w-8 h-8 text-[#262626]" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to your PMB Aero Club admin account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert
                variant="destructive"
                className="mb-6 bg-red-900/20 border-red-500 text-red-300"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showVerificationMessage && (
              <Alert className="mb-6 border-yellow-200 bg-yellow-900/20 text-yellow-300">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <AlertDescription>
                  Your email address is not verified. Please check your inbox
                  for a verification email.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`pl-10 bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={`pl-10 bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#f6d57f] hover:bg-yellow-500 text-[#262626] font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {showVerificationMessage && (
              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleResendVerification}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Resend Verification Email
                </Button>
                <Button
                  onClick={handleGoToVerification}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Go to Email Verification
                </Button>
              </div>
            )}

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-400">
                Don&apos;t have an admin account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-[#f6d57f] hover:text-yellow-400"
                  onClick={() => router.push("/seams/admin-register")}
                >
                  Register here
                </Button>
              </p>
              <p className="text-sm text-gray-400">
                Regular user?{" "}
                <Button
                  variant="link"
                  className="p-0 text-[#f6d57f] hover:text-yellow-400"
                  onClick={() => router.push("/login")}
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            © 2025 PMB Aeroclub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
