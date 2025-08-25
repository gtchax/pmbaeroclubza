"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SageErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "access_denied":
        return "Access was denied. Please try again and ensure you authorize the application.";
      case "invalid_request":
        return "Invalid request. Please try connecting again.";
      case "server_error":
        return "SAGE server error. Please try again later.";
      case "temporarily_unavailable":
        return "SAGE service is temporarily unavailable. Please try again later.";
      case "missing_parameters":
        return "Missing authentication parameters. Please try connecting again.";
      case "callback_failed":
        return "Authentication callback failed. Please try connecting again.";
      case "unexpected_error":
        return "An unexpected error occurred. Please try again.";
      default:
        return "An error occurred during authentication. Please try again.";
    }
  };

  const getErrorTitle = (errorCode: string | null) => {
    switch (errorCode) {
      case "access_denied":
        return "Access Denied";
      case "invalid_request":
        return "Invalid Request";
      case "server_error":
        return "Server Error";
      case "temporarily_unavailable":
        return "Service Unavailable";
      case "missing_parameters":
        return "Missing Parameters";
      case "callback_failed":
        return "Authentication Failed";
      case "unexpected_error":
        return "Unexpected Error";
      default:
        return "Authentication Error";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 bg-white shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-[#262626]">
              {getErrorTitle(error)}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Failed to connect to SAGE Business Cloud Accounting
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert className="border-red-200 bg-red-50 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don&apos;t worry, you can try connecting again. Make sure you
                  have:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• A valid SAGE Business Cloud Accounting account</li>
                  <li>• Proper permissions to authorize the application</li>
                  <li>• A stable internet connection</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold"
              >
                <Link href="/auth/sage/login">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                If the problem persists, please contact support or try again
                later.
                <br />
                Error Code: {error || "unknown"}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
