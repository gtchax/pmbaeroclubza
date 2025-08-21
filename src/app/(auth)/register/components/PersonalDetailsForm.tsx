"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClerkSignup } from "@/lib/hooks/use-clerk-signup";
import { useState, useEffect } from "react";

// Schema for private user
const privateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Province is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
  }),
  aviationExperience: z.enum([
    "beginner",
    "student",
    "licensed",
    "experienced",
  ]),
  licenseNumber: z.string().optional(),
  medicalClass: z.enum(["class1", "class2", "class3", "none"]),
  emergencyContact: z.object({
    name: z.string().min(2, "Emergency contact name is required"),
    relationship: z.string().min(2, "Relationship is required"),
    phone: z.string().min(10, "Emergency contact phone is required"),
  }),
});

// Schema for commercial user
const commercialUserSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name must be at least 2 characters"),
  organizationType: z.enum([
    "flight_school",
    "airline",
    "charter",
    "maintenance",
    "other",
  ]),
  registrationNumber: z.string().min(1, "Registration number is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url().optional().or(z.literal("")),
  address: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Province is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
  }),
  contactPerson: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    position: z.string().min(2, "Position is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
  }),
  fleetSize: z.enum(["1-5", "6-10", "11-25", "26-50", "50+"]),
  operations: z
    .array(z.enum(["training", "charter", "scheduled", "maintenance", "sales"]))
    .min(1, "Select at least one operation type"),
});

type PrivateUserFormData = z.infer<typeof privateUserSchema>;
type CommercialUserFormData = z.infer<typeof commercialUserSchema>;

interface PersonalDetailsFormProps {
  onNext: () => void;
  userType: "private" | "commercial" | null;
}

export default function PersonalDetailsForm({
  onNext,
  userType,
}: PersonalDetailsFormProps) {
  const [emailCheckStatus, setEmailCheckStatus] = useState<
    "idle" | "checking" | "available" | "exists"
  >("idle");
  const [lastCheckedEmail, setLastCheckedEmail] = useState("");

  const {
    signUpUser,
    isLoading,
    error,
    emailExists,
    clearError,
    clearEmailExists,
  } = useClerkSignup({ userType: userType || "private" });

  const privateForm = useForm<PrivateUserFormData>({
    resolver: zodResolver(privateUserSchema),
    defaultValues: {
      aviationExperience: "beginner",
      medicalClass: "none",
    },
  });

  const commercialForm = useForm<CommercialUserFormData>({
    resolver: zodResolver(commercialUserSchema),
    defaultValues: {
      organizationType: "flight_school",
      fleetSize: "1-5",
      operations: ["training"],
    },
  });

  // Watch email field for changes
  const watchedEmail =
    userType === "private"
      ? privateForm.watch("email")
      : commercialForm.watch("email");

  // Clear email exists error when email changes
  useEffect(() => {
    if (emailExists && watchedEmail !== lastCheckedEmail) {
      clearEmailExists();
      setEmailCheckStatus("idle");
    }
  }, [watchedEmail, lastCheckedEmail, emailExists, clearEmailExists]);

  const handleEmailCheck = async (email: string) => {
    if (!email || email === lastCheckedEmail) return;

    setEmailCheckStatus("checking");
    setLastCheckedEmail(email);

    try {
      // Simple email format validation first
      if (!email.includes("@")) {
        setEmailCheckStatus("idle");
        return;
      }

      // Check if email exists in Clerk
      const emailAvailable = await signUpUser({
        email,
        firstName: "temp",
        lastName: "temp",
      });

      if (emailAvailable) {
        setEmailCheckStatus("available");
      } else {
        setEmailCheckStatus("exists");
      }
    } catch (error: unknown) {
      setEmailCheckStatus("idle");
    }
  };

  const onSubmitPrivate = async (data: PrivateUserFormData) => {
    try {
      // Check email availability before proceeding
      const emailAvailable = await signUpUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });

      if (emailAvailable) {
        console.log("Private user data:", data);
        onNext();
      }
    } catch (error: unknown) {
      console.error("Error during signup:", error);
    }
  };

  const onSubmitCommercial = async (data: CommercialUserFormData) => {
    try {
      // Check email availability before proceeding
      const emailAvailable = await signUpUser({
        email: data.email,
        firstName: data.contactPerson.firstName,
        lastName: data.contactPerson.lastName,
        phone: data.phone,
      });

      if (emailAvailable) {
        console.log("Commercial user data:", data);
        onNext();
      }
    } catch (error: unknown) {
      console.error("Error during signup:", error);
    }
  };

  if (!userType) return null;

  if (userType === "private") {
    return (
      <Form {...privateForm}>
        <form
          onSubmit={privateForm.handleSubmit(onSubmitPrivate)}
          className="space-y-6"
        >
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Personal Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={privateForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">First Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="email"
                            className="bg-[#262626] border-gray-600 text-white pr-10"
                            onBlur={() => handleEmailCheck(field.value)}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {emailCheckStatus === "checking" && (
                              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                            )}
                            {emailCheckStatus === "available" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {emailCheckStatus === "exists" && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {emailCheckStatus === "exists" && (
                        <p className="text-sm text-red-500 mt-1">
                          An account with this email already exists. Please use
                          a different email address.
                        </p>
                      )}
                      {emailCheckStatus === "available" && (
                        <p className="text-sm text-green-500 mt-1">
                          Email address is available.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Date of Birth *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Nationality *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Address Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={privateForm.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-white">
                        Street Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">City *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        State/Province *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="address.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Postal Code *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Country *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Aviation Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Aviation Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={privateForm.control}
                  name="aviationExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Aviation Experience *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#262626] border-gray-600 text-white">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#262626] border-gray-600">
                          <SelectItem value="beginner">
                            Beginner (No experience)
                          </SelectItem>
                          <SelectItem value="student">Student Pilot</SelectItem>
                          <SelectItem value="licensed">
                            Licensed Pilot
                          </SelectItem>
                          <SelectItem value="experienced">
                            Experienced Pilot
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        License Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="medicalClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Medical Class *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#262626] border-gray-600 text-white">
                            <SelectValue placeholder="Select medical class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#262626] border-gray-600">
                          <SelectItem value="class1">Class 1</SelectItem>
                          <SelectItem value="class2">Class 2</SelectItem>
                          <SelectItem value="class3">Class 3</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Emergency Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={privateForm.control}
                  name="emergencyContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Emergency Contact Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="emergencyContact.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Relationship *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={privateForm.control}
                  name="emergencyContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Emergency Contact Phone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading || emailCheckStatus === "exists"}
              className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  if (userType === "commercial") {
    return (
      <Form {...commercialForm}>
        <form
          onSubmit={commercialForm.handleSubmit(onSubmitCommercial)}
          className="space-y-6"
        >
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Organization Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Organization Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={commercialForm.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-white">
                        Organization Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="organizationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Organization Type *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#262626] border-gray-600 text-white">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#262626] border-gray-600">
                          <SelectItem value="flight_school">
                            Flight School
                          </SelectItem>
                          <SelectItem value="airline">Airline</SelectItem>
                          <SelectItem value="charter">
                            Charter Company
                          </SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance Company
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Registration Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Tax ID *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={commercialForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Organization Email *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="email"
                            className="bg-[#262626] border-gray-600 text-white pr-10"
                            onBlur={() => handleEmailCheck(field.value)}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {emailCheckStatus === "checking" && (
                              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                            )}
                            {emailCheckStatus === "available" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {emailCheckStatus === "exists" && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {emailCheckStatus === "exists" && (
                        <p className="text-sm text-red-500 mt-1">
                          An account with this email already exists. Please use
                          a different email address.
                        </p>
                      )}
                      {emailCheckStatus === "available" && (
                        <p className="text-sm text-green-500 mt-1">
                          Email address is available.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Organization Phone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Person */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Primary Contact Person
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={commercialForm.control}
                  name="contactPerson.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">First Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="contactPerson.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="contactPerson.position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Position *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="contactPerson.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Contact Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="contactPerson.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Contact Phone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Address Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={commercialForm.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-white">
                        Street Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">City *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        State/Province *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="address.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Postal Code *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Country *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#262626] border-gray-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Operations Information */}
          <Card className="bg-[#1a1a1a] border-gray-600">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Operations Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={commercialForm.control}
                  name="fleetSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Fleet Size *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#262626] border-gray-600 text-white">
                            <SelectValue placeholder="Select fleet size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#262626] border-gray-600">
                          <SelectItem value="1-5">1-5 aircraft</SelectItem>
                          <SelectItem value="6-10">6-10 aircraft</SelectItem>
                          <SelectItem value="11-25">11-25 aircraft</SelectItem>
                          <SelectItem value="26-50">26-50 aircraft</SelectItem>
                          <SelectItem value="50+">50+ aircraft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={commercialForm.control}
                  name="operations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Operations *</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {(
                            [
                              "training",
                              "charter",
                              "scheduled",
                              "maintenance",
                              "sales",
                            ] as const
                          ).map((operation) => (
                            <div
                              key={operation}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={operation}
                                checked={field.value?.includes(operation)}
                                onChange={(e) => {
                                  const currentValue = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([
                                      ...currentValue,
                                      operation,
                                    ]);
                                  } else {
                                    field.onChange(
                                      currentValue.filter(
                                        (op) => op !== operation
                                      )
                                    );
                                  }
                                }}
                                className="rounded border-gray-600 bg-[#262626] text-[#f6d57f] focus:ring-[#f6d57f]"
                              />
                              <label
                                htmlFor={operation}
                                className="text-sm text-white capitalize"
                              >
                                {operation}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading || emailCheckStatus === "exists"}
              className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return null;
}
