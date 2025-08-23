"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Plane, User, Shield, FileText, ArrowLeft } from "lucide-react"
import PersonalDetailsForm from "./components/PersonalDetailsForm"
import VerificationForm from "./components/VerificationForm"
import DocumentsForm from "./components/DocumentsForm"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"private" | "commercial" | null>(null)

  const steps = [
    { id: 1, title: "User Type", icon: User, description: "Choose your user type" },
    { id: 2, title: "Personal Details", icon: User, description: "Enter your information" },
    { id: 3, title: "Verification", icon: Shield, description: "Verify your identity" },
    { id: 4, title: "Documents", icon: FileText, description: "Upload required documents" },
    { id: 5, title: "Complete", icon: CheckCircle, description: "Registration complete" }
  ]

  const handleUserTypeSelection = (type: "private" | "commercial") => {
    setUserType(type)
    setCurrentStep(2)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

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
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'border-[#f6d57f] bg-[#f6d57f] text-[#262626]' 
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-[#f6d57f]' : 'bg-gray-600'
                  }`} />
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
            {currentStep === 1 && (
              <UserTypeSelection onSelect={handleUserTypeSelection} />
            )}
            {currentStep === 2 && (
              <PersonalDetails onNext={nextStep} onBack={prevStep} userType={userType} />
            )}
            {currentStep === 3 && (
              <Verification onNext={nextStep} onBack={prevStep} />
            )}
            {currentStep === 4 && (
              <Documents onNext={nextStep} onBack={prevStep} />
            )}
            {currentStep === 5 && (
              <Complete />
            )}
          </div>
      </div>
    </div>
  )
}

function UserTypeSelection({ onSelect }: { onSelect: (type: "private" | "commercial") => void }) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Choose Your User Type</CardTitle>
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
              <h3 className="text-xl font-semibold text-white mb-2">Private User</h3>
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
              <h3 className="text-xl font-semibold text-white mb-2">Commercial User</h3>
              <p className="text-gray-400">
                For flight schools, airlines, and aviation businesses
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

function PersonalDetails({ 
  onNext, 
  onBack, 
  userType 
}: { 
  onNext: () => void
  onBack: () => void
  userType: "private" | "commercial" | null
}) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Personal Details</CardTitle>
        <CardDescription className="text-gray-300">
          {userType === "private" ? "Tell us about yourself" : "Tell us about your organization"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PersonalDetailsForm onNext={onNext} userType={userType} />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Verification({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Identity Verification</CardTitle>
        <CardDescription className="text-gray-300">
          Verify your identity to complete registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerificationForm onNext={onNext} />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Documents({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Required Documents</CardTitle>
        <CardDescription className="text-gray-300">
          Upload the necessary documents for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentsForm onNext={onNext} />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Complete() {
  return (
    <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <CheckCircle className="h-20 w-20 text-[#f6d57f]" />
        </div>
        <CardTitle className="text-3xl text-white">Registration Complete!</CardTitle>
        <CardDescription className="text-gray-300 text-lg">
          Welcome to PMB Aero Club! Your account is being reviewed and you&apos;ll receive an email confirmation shortly.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button className="w-full" size="lg">
          Continue to Dashboard
        </Button>
      </CardContent>
    </Card>
  )
}
