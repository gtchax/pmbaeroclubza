"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Plane, ArrowLeft } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Error Content */}
            <div className="mb-12">
              {/* Animated Error Icon */}
              <div className="relative mb-8">
                <div className="animate-pulse">
                  <AlertTriangle className="h-24 w-24 text-red-600 mx-auto" />
                </div>
                <div className="absolute inset-0 bg-red-200 rounded-full blur-xl opacity-30 animate-ping"></div>
              </div>

              {/* Error Message */}
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Something Went Wrong
              </h1>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                We've encountered an unexpected error. Our team has been notified and is working to resolve this issue.
              </p>
              
              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === "development" && (
                <Card className="bg-red-50 border-red-200 max-w-2xl mx-auto mb-6">
                  <CardHeader>
                    <CardTitle className="text-red-800 text-lg">Error Details</CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
                    <p className="text-sm text-red-700 font-mono bg-red-100 p-3 rounded border">
                      {error.message || "Unknown error occurred"}
                    </p>
                    {error.digest && (
                      <p className="text-xs text-red-600 mt-2">
                        Error ID: {error.digest}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={reset}
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return Home
                </Link>
              </Button>
            </div>

            {/* Helpful Navigation Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Flight School</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    Explore our flight training programs and start your aviation journey
                  </CardDescription>
                  <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    <Link href="/flight-school">
                      Learn More
                      <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300 border-green-100">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    If this issue persists, please contact our technical support team
                  </CardDescription>
                  <Button asChild variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <Link href="/contact">
                      Get Help
                      <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Support Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Need Immediate Assistance?</CardTitle>
                <CardDescription>
                  Our support team is available to help you resolve this issue quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Technical Support</p>
                      <p className="text-sm text-gray-600">+27-33-123-4567 (ext. 2)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plane className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">General Inquiries</p>
                      <p className="text-sm text-gray-600">info@pmbaeroclub.co.za</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 PMB Aero Club. All rights reserved. | 
                <Link href="/privacy-policy" className="text-blue-600 hover:underline ml-1">
                  Privacy Policy
                </Link>
                {" | "}
                <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
