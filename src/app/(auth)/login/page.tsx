"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff, Plane, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<"private" | "commercial" | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleUserTypeSelection = (type: "private" | "commercial") => {
    setUserType(type);
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate email format before sending to Clerk
      const email = formData.email.trim().toLowerCase();

      if (!email || !email.includes("@") || !email.includes(".")) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Basic email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // First, check if the user exists
      try {
        const result = await signIn?.create({
          identifier: email,
          password: formData.password,
        });

        if (result?.status === "complete") {
          // Set the user session active
          await setActive?.({ session: result.createdSessionId });

          // Redirect to dashboard
          router.push("/dashboard");
        } else if (result?.status === "needs_first_factor") {
          // User needs to verify email
          router.push(`/login/verify?email=${encodeURIComponent(email)}`);
        } else {
          setError(
            "Login failed. Please check your credentials and try again."
          );
        }
      } catch (signInError: unknown) {
        // If sign in fails, check if it's because user doesn't exist
        const error = signInError as { errors?: Array<{ code: string }> };
        if (error.errors?.[0]?.code === "form_identifier_not_found") {
          setError(
            "No account found with this email address. Please check your email or sign up."
          );
        } else {
          throw signInError; // Re-throw other errors to be handled by outer catch
        }
      }
    } catch (err: unknown) {
      console.error("Login error:", err);

      // Handle specific Clerk error codes
      const clerkError = err as { errors?: Array<{ code: string; message?: string }> };
      if (clerkError.errors && Array.isArray(clerkError.errors)) {
        const firstError = clerkError.errors[0];

        switch (firstError.code) {
          case "form_identifier_not_found":
            setError(
              "No account found with this email address. Please check your email or sign up."
            );
            break;
          case "form_password_incorrect":
            setError("Incorrect password. Please try again.");
            break;
          case "form_identifier_invalid":
            setError("Please enter a valid email address.");
            break;
          case "form_param_unknown":
            setError("Invalid login attempt. Please try again.");
            break;
          default:
            setError(firstError.message || "Login failed. Please try again.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const goBack = () => {
    setCurrentStep(1);
    setUserType(null);
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
          <p className="text-gray-300 text-lg">
            Welcome back to our aviation community
          </p>
        </div>

        {/* Step Content */}
        <div className="transition-all duration-300 ease-in-out">
          {currentStep === 1 && (
            <UserTypeSelection onSelect={handleUserTypeSelection} />
          )}
          {currentStep === 2 && (
            <LoginForm
              userType={userType}
              formData={formData}
              showPassword={showPassword}
              isLoading={isLoading}
              error={error}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onBack={goBack}
            />
          )}
        </div>

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

function UserTypeSelection({
  onSelect,
}: {
  onSelect: (type: "private" | "commercial") => void;
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">
          Choose Your Account Type
        </CardTitle>
        <CardDescription className="text-gray-300">
          Select how you want to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Card
            className="bg-[#1a1a1a] border-2 border-gray-600 hover:border-[#f6d57f] cursor-pointer transition-all duration-200 hover:scale-105"
            onClick={() => onSelect("private")}
          >
            <CardContent className="p-6 text-center">
              <User className="h-16 w-16 text-[#f6d57f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Private User
              </h3>
              <p className="text-gray-400">
                For individual pilots, students, and aviation enthusiasts
              </p>
            </CardContent>
          </Card>

          <Card
            className="bg-[#1a1a1a] border-2 border-gray-600 hover:border-[#f6d57f] cursor-pointer transition-all duration-200 hover:scale-105"
            onClick={() => onSelect("commercial")}
          >
            <CardContent className="p-6 text-center">
              <Plane className="h-16 w-16 text-[#f6d57f] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Commercial User
              </h3>
              <p className="text-gray-400">
                For flight schools, airlines, and aviation businesses
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

function LoginForm({
  userType,
  formData,
  showPassword,
  isLoading,
  error,
  onSubmit,
  onInputChange,
  onTogglePassword,
  onBack,
}: {
  userType: "private" | "commercial" | null;
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onBack: () => void;
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6d57f] rounded-full mb-4 mx-auto">
          {userType === "private" ? (
            <User className="w-8 h-8 text-[#262626]" />
          ) : (
            <Plane className="w-8 h-8 text-[#262626]" />
          )}
        </div>
        <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
        <CardDescription className="text-gray-300">
          Sign in to your {userType} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={onInputChange}
                required
                className="bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  onInputChange({
                    target: {
                      name: "rememberMe",
                      type: "checkbox",
                      checked: checked as boolean,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="border-gray-600 data-[state=checked]:bg-[#f6d57f] data-[state=checked]:border-[#f6d57f]"
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-300">
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#f6d57f] hover:text-yellow-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f6d57f] hover:bg-yellow-500 text-[#262626] font-semibold"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        {/* <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#262626] text-gray-400">Or continue with</span>
            </div>
          </div>
        </div> */}

        {/* Social Login Options */}
        {/* <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="bg-[#1a1a1a] border-gray-600 text-white hover:bg-gray-800">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          <Button variant="outline" className="bg-[#1a1a1a] border-gray-600 text-white hover:bg-gray-800">
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </Button>
        </div> */}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Back
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#f6d57f] hover:text-yellow-400 transition-colors font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
