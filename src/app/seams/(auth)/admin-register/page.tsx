"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  UserPlus,
  AlertTriangle,
  Plane,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

const adminRegistrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    adminLevel: z.enum(["SUPER_ADMIN", "ADMIN", "MANAGER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type AdminRegistrationForm = z.infer<typeof adminRegistrationSchema>;

export default function AdminRegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [canRegister, setCanRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AdminRegistrationForm>({
    resolver: zodResolver(adminRegistrationSchema),
  });

  // Check if SUPER_ADMIN already exists
  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        const response = await fetch("/api/admin/check-super-admin");
        const data = await response.json();
        console.log("super admin data", data);
        if (data.exists) {
          setError(
            "A SUPER_ADMIN user already exists. Admin registration is not allowed."
          );
          setCanRegister(false);
        } else {
          setCanRegister(true);
        }
      } catch (error) {
        console.error("Error checking super admin:", error);
        setError("Failed to check admin status. Please try again.");
        setCanRegister(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkSuperAdmin();
  }, []);

  const onSubmit = async (data: AdminRegistrationForm) => {
    if (!canRegister) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Redirect to email verification
      // router.push(
      //   `/seams/verify-email?email=${encodeURIComponent(data.email)}`
      // );
      router.push(`/seams/admin-login`);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#f6d57f]" />
          <p className="text-gray-300">Checking admin status...</p>
        </div>
      </div>
    );
  }

  if (!canRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Plane className="h-12 w-12 text-[#f6d57f] mr-3" />
              <h1 className="text-4xl font-bold text-white">PMB Aero Club</h1>
            </div>
            <p className="text-gray-300 text-lg">Admin Registration System</p>
          </div>

          <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
            <CardHeader className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-xl text-red-400">
                Registration Not Allowed
              </CardTitle>
              <CardDescription className="text-gray-300">
                Admin registration is not available at this time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert
                variant="destructive"
                className="bg-red-900/20 border-red-500 text-red-300"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => router.push("/seams/login")}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Go to Login
                </Button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-12 w-12 text-[#f6d57f] mr-3" />
            <h1 className="text-4xl font-bold text-white">PMB Aero Club</h1>
          </div>
          <p className="text-gray-300 text-lg">Admin Registration System</p>
        </div>

        <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6d57f] rounded-full mb-4 mx-auto">
              <Shield className="w-8 h-8 text-[#262626]" />
            </div>
            <CardTitle className="text-2xl text-white">
              Admin Registration
            </CardTitle>
            <CardDescription className="text-gray-300">
              Create the first admin account for PMB Aero Club
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className={`bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className={`bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                />
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
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] pr-12 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className={`bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-[#f6d57f] focus:ring-[#f6d57f] pr-12 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminLevel" className="text-white">
                  Admin Level
                </Label>
                <select
                  {...register("adminLevel")}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f]"
                >
                  <option
                    value="SUPER_ADMIN"
                    className="bg-[#1a1a1a] text-white"
                  >
                    Super Admin
                  </option>
                  <option value="ADMIN" className="bg-[#1a1a1a] text-white">
                    Admin
                  </option>
                  <option value="MANAGER" className="bg-[#1a1a1a] text-white">
                    Manager
                  </option>
                </select>
                {errors.adminLevel && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.adminLevel.message}
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
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Admin Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-[#f6d57f] hover:text-yellow-400"
                  onClick={() => router.push("/seams/login")}
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
