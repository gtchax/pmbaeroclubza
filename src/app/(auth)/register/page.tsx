"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane, User, Shield, FileText, ArrowLeft } from "lucide-react";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import VerificationForm from "./components/VerificationForm";
import DocumentsForm from "./components/DocumentsForm";
import { useRegistrationStore } from "@/lib/stores/registration-store";
import { uploadRegistrationDocumentsToMega } from "@/lib/actions/mega-actions";

// Import types from components
import type { PrivateUserFormData, CommercialUserFormData } from "./components/PersonalDetailsForm";
import type { VerificationFormData } from "./components/VerificationForm";
import type { DocumentsFormData } from "./components/DocumentsForm";

export default function RegisterPage() {
  const router = useRouter();
  const {
    currentStep,
    userType,
    personalDetails,
    verificationData,
    documentsData,
    clerkUserId,
    setCurrentStep,
    setUserType,
    setPersonalDetails,
    setVerificationData,
    setDocumentsData,
    setClerkUserId,
    resetRegistration,
  } = useRegistrationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: "User Type",
      icon: User,
      description: "Choose your user type",
    },
    {
      id: 2,
      title: "Personal Details",
      icon: User,
      description: "Enter your information",
    },
    {
      id: 3,
      title: "Verification",
      icon: Shield,
      description: "Verify your identity",
    },
    {
      id: 4,
      title: "Documents",
      icon: FileText,
      description: "Upload required documents",
    },
    {
      id: 5,
      title: "Submit",
      icon: FileText,
      description: "Submit registration",
    },
  ];

  const handleUserTypeSelection = (type: "private" | "commercial") => {
    setUserType(type);
  };

  const handlePersonalDetailsComplete = (data: PrivateUserFormData | CommercialUserFormData) => {
    setPersonalDetails(data);
  };

  const handleVerificationComplete = (data: VerificationFormData) => {
    setVerificationData(data);
  };

  const handleDocumentsComplete = (data: DocumentsFormData) => {
    setDocumentsData(data);
  };

  const handleFinalSubmit = async () => {
    if (!personalDetails || !verificationData || !documentsData || !userType) {
      setSubmitError("Missing required data. Please complete all steps.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Step 1: Sign up with Clerk via backend API
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: personalDetails.email,
          password: personalDetails.password,
          firstName:
            userType === "private"
              ? personalDetails.firstName
              : personalDetails.contactPerson?.firstName,
          lastName:
            userType === "private"
              ? personalDetails.lastName
              : personalDetails.contactPerson?.lastName,
          userType: userType,
        }),
      });

      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData.error || "Clerk signup failed");
      }

      const signupResult = await signupResponse.json();

      if (signupResult.success && signupResult.userId) {
        // Step 2: Save Clerk user ID to store
        setClerkUserId(signupResult.userId);

        // Step 3: Upload documents to MEGA
        let megaDocuments = null;
        if (documentsData && Object.keys(documentsData).length > 0) {
          try {
            // Convert documentsData to the format expected by MEGA upload
            const documentsForMega = Object.entries(documentsData).map(
              ([key, value]) => ({
                name: key,
                data: Buffer.from(value as string, "base64"), // Assuming documentsData contains base64 strings
                type: "application/octet-stream",
                mimeType: "application/octet-stream",
                documentType: "OTHER" as const,
                category: "REGISTRATION" as const,
                notes: `Document uploaded during registration: ${key}`,
              })
            );

            const megaResult =
              await uploadRegistrationDocumentsToMega(documentsForMega);

            if (megaResult.success && megaResult.files) {
              megaDocuments = megaResult.files;
              console.log(
                "Documents uploaded to MEGA successfully:",
                megaResult.message
              );
            } else {
              console.warn(
                "Failed to upload documents to MEGA:",
                megaResult.message
              );
              // Continue with registration even if MEGA upload fails
            }
          } catch (error) {
            console.error("Error uploading documents to MEGA:", error);
            // Continue with registration even if MEGA upload fails
          }
        }

        // Step 4: Save all data to database (including MEGA document IDs)
        const response = await fetch("/api/user/complete-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: signupResult.userId,
            userType,
            personalDetails,
            verificationData,
            documentsData: megaDocuments, // Pass MEGA document data instead of original documentsData
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save profile to database");
        }

        // Success! Redirect to success page
        console.log("Registration completed successfully");
        router.push("/registration-success");
      } else {
        throw new Error("Clerk signup failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };



  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reset registration when component unmounts
  useEffect(() => {
    return () => {
      // Only reset if user hasn't completed registration
      if (!clerkUserId) {
        resetRegistration();
      }
    };
  }, [clerkUserId, resetRegistration]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;

      case 2:
        return (
          <PersonalDetails
            onNext={() => setCurrentStep(3)}
            onBack={goBack}
            userType={userType}
            onComplete={handlePersonalDetailsComplete}
          />
        );

      case 3:
        return (
          <Verification
            onNext={() => setCurrentStep(4)}
            onBack={goBack}
            onComplete={handleVerificationComplete}
          />
        );

      case 4:
        return (
          <Documents
            onNext={() => setCurrentStep(5)}
            onComplete={handleDocumentsComplete}
          />
        );

      case 5:
        // Show the final submission step
        return (
          <FinalSubmission
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSubmit={handleFinalSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-12 w-12 text-[#f6d57f] mr-3" />
            <h1 className="text-4xl font-bold text-white">PMB Aero Club</h1>
          </div>
          <p className="text-gray-300 text-lg">Join our aviation community</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "border-[#f6d57f] bg-[#f6d57f] text-[#262626]"
                      : "border-gray-600 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <div className="w-6 h-6 bg-[#f6d57f] rounded-full flex items-center justify-center">
                      <span className="text-[#262626] text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-[#f6d57f]" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div
          key={currentStep}
          className="transition-all duration-300 ease-in-out"
        >
          {renderStepContent()}
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
          Choose Your User Type
        </CardTitle>
        <CardDescription className="text-gray-300">
          Select the type of account you want to create
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
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

function PersonalDetails({
  onNext,
  onBack,
  userType,
  onComplete,
}: {
  onNext: () => void;
  onBack: () => void;
  userType: "private" | "commercial" | null;
  onComplete: (data: PrivateUserFormData | CommercialUserFormData) => void;
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Personal Details</CardTitle>
        <CardDescription className="text-gray-300">
          {userType === "private"
            ? "Tell us about yourself"
            : "Tell us about your organization"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PersonalDetailsForm
          onNext={onNext}
          userType={userType}
          onComplete={onComplete}
        />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Verification({
  onNext,
  onBack,
  onComplete,
}: {
  onNext: () => void;
  onBack: () => void;
  onComplete: (data: VerificationFormData) => void;
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Identity Verification
        </CardTitle>
        <CardDescription className="text-gray-300">
          Verify your identity to complete registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerificationForm onNext={onNext} onComplete={onComplete} />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Documents({
  onNext,
  onComplete,
}: {
  onNext: () => void;
  onComplete: (data: DocumentsFormData) => void;
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Required Documents
        </CardTitle>
        <CardDescription className="text-gray-300">
          Upload the necessary documents for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentsForm onNext={onNext} onComplete={onComplete} />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FinalSubmission({
  isSubmitting,
  submitError,
  onSubmit,
}: {
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <FileText className="h-20 w-20 text-[#f6d57f]" />
        </div>
        <CardTitle className="text-3xl text-white">
          Final Step: Create Your Account
        </CardTitle>
        <CardDescription className="text-gray-300 text-lg">
          Review your information and click the button below to create your
          account. This will create your Clerk user account and save all your
          profile data.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          {submitError && (
            <div className="text-red-500 text-sm">{submitError}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
