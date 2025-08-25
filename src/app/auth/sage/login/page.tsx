"use client";

import { useState } from "react";
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
import { Loader2, Building2, Shield, Zap } from "lucide-react";
import { useSageAuth } from "@/lib/sage-auth";

export default function SageLoginPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useSageAuth();

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Redirect to SAGE OAuth
      login();
    } catch (error) {
      console.error("Error connecting to SAGE:", error);
      setError(
        "Failed to connect to SAGE Business Cloud Accounting. Please try again."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 bg-white shadow-xl">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-[#262626]" />
            </div>
            <h3 className="text-xl font-semibold text-[#262626] mb-2">
              Already Connected!
            </h3>
            <p className="text-gray-600 mb-4">
              You are already connected to SAGE Business Cloud Accounting.
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 bg-white shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-[#262626]" />
            </div>
            <CardTitle className="text-2xl text-[#262626]">
              Connect to SAGE
            </CardTitle>
            <CardDescription className="text-gray-600">
              Connect your SAGE Business Cloud Accounting account to access
              financial data
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Secure OAuth2 connection with SAGE
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">
                  Real-time financial data synchronization
                </span>
              </div>
            </div>

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold h-12"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Building2 className="mr-2 h-4 w-4" />
                  Connect to SAGE
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By connecting, you authorize PMB Aero Club to access your SAGE
                Business Cloud Accounting data.
                <br />
                Your data remains secure and is only used for financial
                reporting and management.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
