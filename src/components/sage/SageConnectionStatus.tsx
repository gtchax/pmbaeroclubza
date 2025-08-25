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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Link as LinkIcon,
  X,
  Loader2,
} from "lucide-react";
import { useSageAuth } from "@/lib/sage-auth";
import Link from "next/link";

interface SageConnectionStatusProps {
  className?: string;
  showDetails?: boolean;
}

export function SageConnectionStatus({
  className = "",
  showDetails = true,
}: SageConnectionStatusProps) {
  const { authState, isAuthenticated, logout, refreshToken } = useSageAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshToken = async () => {
    try {
      setIsRefreshing(true);
      await refreshToken();
    } catch (error) {
      console.error("Error refreshing token:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnect = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <Card className={`border-0 bg-white shadow-lg ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <CardTitle className="text-lg">SAGE Connection</CardTitle>
                <CardDescription>
                  Connect to SAGE Business Cloud Accounting
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              Disconnected
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50 text-orange-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Connect to SAGE to access real-time financial data, transactions,
              and account balances.
            </AlertDescription>
          </Alert>

          <Button
            asChild
            className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold"
          >
            <Link href="/auth/sage/login">
              <LinkIcon className="mr-2 h-4 w-4" />
              Connect to SAGE
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-0 bg-white shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">SAGE Connected</CardTitle>
              <CardDescription>
                Successfully connected to SAGE Business Cloud Accounting
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="default"
            className="bg-green-100 text-green-700 border-green-200"
          >
            Connected
          </Badge>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Status:</span>
              <span className="ml-2 text-green-600 font-medium">Active</span>
            </div>
            <div>
              <span className="text-gray-500">Company ID:</span>
              <span className="ml-2 font-mono text-gray-700">
                {authState.companyId || "Not set"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Token Expires:</span>
              <span className="ml-2 text-gray-700">
                {authState.expiresAt
                  ? new Date(authState.expiresAt).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Last Updated:</span>
              <span className="ml-2 text-gray-700">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshToken}
              disabled={isRefreshing}
              className="flex-1"
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Token
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
