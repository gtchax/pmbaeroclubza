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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Eye, EyeOff } from "lucide-react";

// Custom styles for PhoneInput to match PMB Aero Club theme exactly
const phoneInputStyles = `

  .PhoneInput {
    @apply w-full flex items-center gap-2;
  }
  
  .PhoneInputCountry {
    @apply flex-shrink-0;
  }
  
  .PhoneInputCountrySelect {
    @apply bg-[#262626] border-gray-600 text-white rounded-md px-3 py-2 text-sm min-w-[120px] h-10;
    background-color: #262626 !important;
    border-color: #6b7280 !important;
    color: white !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    font-size: 0.875rem !important;
    height: 2.5rem !important;
    border-width: 1px !important;
    border-style: solid !important;
    min-width: 120px !important;
  }
  
  .PhoneInputCountrySelect:focus {
    @apply outline-none;
    outline: none !important;
    border-color: #f6d57f !important;
    box-shadow: 0 0 0 2px #f6d57f !important;
  }
  
  .PhoneInputCountrySelect option {
    @apply bg-[#262626] text-white;
    background-color: #262626 !important;
    color: white !important;
  }
  
  .PhoneInputInput {
    @apply bg-[#262626] border-gray-600 text-white rounded-md px-3 py-2 text-sm w-full flex-1 h-10;
  }
  
  .PhoneInputInput:focus {
    @apply outline-none ring-2 ring-[#f6d57f] border-[#f6d57f];
  }
  
  .PhoneInputInput::placeholder {
    @apply text-gray-400;
  }
  
  .PhoneInputCountryIcon {
    @apply w-5 h-5;
  }
  
  .PhoneInputCountryIcon--border {
    @apply border border-gray-400;
  }
  
  /* Override default react-phone-number-input styles to match our theme */
  .PhoneInputInput {
    background-color: #262626 !important;
    border-color: #6b7280 !important;
    color: white !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    font-size: 0.875rem !important;
    width: 100% !important;
    height: 2.5rem !important;
    border-width: 1px !important;
  }
  
  .PhoneInputInput:focus {
    outline: none !important;
    border-color: #f6d57f !important;
    box-shadow: 0 0 0 2px #f6d57f !important;
  }
  
  .PhoneInputInput::placeholder {
    color: #9ca3af !important;
  }
  
  .PhoneInputCountrySelect {
    background-color: #262626 !important;
    border-color: #6b7280 !important;
    color: white !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    font-size: 0.875rem !important;
    height: 2.5rem !important;
    border-width: 1px !important;
    min-width: 120px !important;
  }
  
  .PhoneInputCountrySelect:focus {
    outline: none !important;
    border-color: #f6d57f !important;
    box-shadow: 0 0 0 2px #f6d57f !important;
  }
  
  .PhoneInputCountrySelect option {
    background-color: #262626 !important;
    color: white !important;
  }
  
  /* Custom class for additional styling control */
  .phone-input-field {
    @apply w-full;
  }
  
  /* Ensure exact match with regular Input components */
  .PhoneInput {
    @apply w-full;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    width: 100% !important;
  }
  
  .PhoneInputCountry {
    flex-shrink: 0 !important;
  }
  
  .PhoneInputInput {
    @apply bg-[#262626] border-gray-600 text-white;
    background-color: #262626 !important;
    border-color: #6b7280 !important;
    color: white !important;
    border-radius: 0.375rem !important;
    padding: 0.5rem 0.75rem !important;
    font-size: 0.875rem !important;
    width: 100% !important;
    height: 2.5rem !important;
    border-width: 1px !important;
    border-style: solid !important;
  }
  
  .PhoneInputInput:focus {
    @apply outline-none;
    outline: none !important;
    border-color: #f6d57f !important;
    box-shadow: 0 0 0 2px #f6d57f !important;
  }
  
  .PhoneInputInput::placeholder {
    @apply text-gray-400;
    color: #9ca3af !important;
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = phoneInputStyles;
  document.head.appendChild(styleElement);
}

// Schema for private user
const privateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .refine(
      (password) => password.length >= 8,
      "Password must be at least 8 characters long"
    ),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .refine((phone) => {
      // Basic validation for international phone numbers
      return phone && phone.length >= 10;
    }, "Please enter a valid phone number with country code"),
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
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactRelationship: z.string().min(2, "Relationship is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Emergency contact phone is required")
    .refine((phone) => {
      // Basic validation for international phone numbers
      return phone && phone.length >= 10;
    }, "Please enter a valid emergency contact phone number with country code"),
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
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .refine(
      (password) => password.length >= 8,
      "Password must be at least 8 characters long"
    ),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .refine((phone) => {
      // Basic validation for international phone numbers
      return phone && phone.length >= 10;
    }, "Please enter a valid phone number with country code"),
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
    phone: z
      .string()
      .min(10, "Please enter a valid phone number")
      .refine((phone) => {
        // Basic validation for international phone numbers
        return phone && phone.length >= 10;
      }, "Please enter a valid phone number with country code"),
  }),
  fleetSize: z.enum(["1-5", "6-10", "11-25", "26-50", "50+"]),
  operations: z
    .array(z.enum(["training", "charter", "scheduled", "maintenance", "sales"]))
    .min(1, "Select at least one operation type"),
});

export type PrivateUserFormData = z.infer<typeof privateUserSchema>;
export type CommercialUserFormData = z.infer<typeof commercialUserSchema>;

interface PersonalDetailsFormProps {
  onNext: () => void;
  userType: "private" | "commercial" | null;
  onComplete: (data: PrivateUserFormData | CommercialUserFormData) => void;
}

export default function PersonalDetailsForm({
  onNext,
  userType,
  onComplete,
}: PersonalDetailsFormProps) {
  const [emailCheckStatus, setEmailCheckStatus] = useState<
    "idle" | "checking" | "available" | "exists"
  >("idle");
  const [lastCheckedEmail, setLastCheckedEmail] = useState("");
  const [showPrivatePassword, setShowPrivatePassword] = useState(false);
  const [showCommercialPassword, setShowCommercialPassword] = useState(false);

  const {
    isLoading,
    error,
    emailExists,
    clearEmailExists,
    checkEmailOnly,
  } = useClerkSignup();

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

      // Use the new email-only check function for better user experience
      const result = await checkEmailOnly(email);

      if (result.available) {
        setEmailCheckStatus("available");
      } else if (result.exists) {
        setEmailCheckStatus("exists");
      } else {
        setEmailCheckStatus("idle");
      }
    } catch {
      setEmailCheckStatus("idle");
    }
  };

  const onSubmitPrivate = async (data: PrivateUserFormData) => {
    try {
      // Check email availability before proceeding
      const emailCheck = await checkEmailOnly(data.email);
      if (!emailCheck.available) {
        setEmailCheckStatus("exists");
        return;
      }

      // Save data to state and move to next step

      onComplete(data);
      onNext();
    } catch (error: unknown) {
      console.error("Error during form submission:", error);
    }
  };

  const onSubmitCommercial = async (data: CommercialUserFormData) => {
    try {
      // Check email availability before proceeding
      const emailCheck = await checkEmailOnly(data.email);
      if (!emailCheck.available) {
        setEmailCheckStatus("exists");
        return;
      }

      // Save data to state and move to next step
      console.log("Commercial user details saved:", data);
      onComplete(data);
      onNext();
    } catch (error: unknown) {
      console.error("Error during form submission:", error);
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          placeholder="Enter phone number"
                          defaultCountry="US"
                          international
                          countryCallingCodeEditable={false}
                          className="phone-input-field"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={privateForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white mt-4">
                      Password *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPrivatePassword ? "text" : "password"}
                          className="bg-[#262626] border-gray-600 text-white pr-10"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPrivatePassword(!showPrivatePassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPrivatePassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div className="text-xs text-gray-400 mt-1">
                      Password must contain at least 8 characters with
                      uppercase, lowercase, number, and special character
                    </div>
                  </FormItem>
                )}
              />
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
                  name="emergencyContactName"
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
                  name="emergencyContactRelationship"
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
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Emergency Contact Phone *
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          placeholder="Enter emergency contact phone"
                          defaultCountry="US"
                          international
                          countryCallingCodeEditable={false}
                          className="phone-input-field"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showCommercialPassword ? "text" : "password"}
                            className="bg-[#262626] border-gray-600 text-white pr-10"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowCommercialPassword(!showCommercialPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showCommercialPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <div className="text-xs text-gray-400 mt-1">
                        Password must contain at least 8 characters with
                        uppercase, lowercase, number, and special character
                      </div>
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
                        <PhoneInput
                          {...field}
                          placeholder="Enter organization phone"
                          defaultCountry="US"
                          international
                          countryCallingCodeEditable={false}
                          className="phone-input-field"
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
                        <PhoneInput
                          {...field}
                          placeholder="Enter contact person phone"
                          defaultCountry="US"
                          international
                          countryCallingCodeEditable={false}
                          className="phone-input-field"
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
