"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Building2, ArrowRight } from "lucide-react";
import { useSageAuth } from "@/lib/sage-auth";
import { useRouter } from "next/navigation";

export default function SageSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const { authState } = useSageAuth();
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to dashboard after countdown
      router.push("/dashboard");
    }
  }, [countdown, router]);

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
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-[#262626]">
              Successfully Connected!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your SAGE Business Cloud Accounting account is now connected
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">
                  ✓ OAuth2 authentication successful
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-800">
                  ✓ Access token obtained and stored securely
                </span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Redirecting to dashboard in {countdown} seconds...
              </p>

              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                You can now access your financial data from SAGE Business Cloud
                Accounting
                <br />
                in the PMB Aero Club dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
