import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Home, LogIn } from "lucide-react";
import Link from "next/link";

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#262626] flex items-center justify-center p-4">
      <Card className="bg-[#262626] border-[#f6d57f] shadow-2xl max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-6">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <CardTitle className="text-4xl text-white mb-4">
            Registration Complete!
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Welcome to PMB Aero Club! Your account has been successfully created
            and is pending approval.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-[#f6d57f] mr-3" />
              <h3 className="text-xl font-semibold text-white">
                What Happens Next?
              </h3>
            </div>
            <div className="text-left text-gray-300 space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#f6d57f] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Your registration has been submitted and is under review</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#f6d57f] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Our team will review your information and documents</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#f6d57f] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>You&apos;ll receive an email notification once approved</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-[#f6d57f] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>After approval, you can log in and access your dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]"
            >
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            <p>
              Have questions? Contact us at{" "}
              <a
                href="mailto:support@pmbaeroclub.com"
                className="text-[#f6d57f] hover:underline"
              >
                support@pmbaeroclub.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
