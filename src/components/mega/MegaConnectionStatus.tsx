"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMegaStorage } from "@/lib/hooks/use-mega-storage";
import { Cloud, CloudOff, RefreshCw, Settings, Database } from "lucide-react";

interface MegaConnectionStatusProps {
  showDetails?: boolean;
  className?: string;
}

export function MegaConnectionStatus({
  showDetails = false,
  className = "",
}: MegaConnectionStatusProps) {
  const {
    isConnected,
    baseFolderId,
    isLoading,
    error,
    storageUsage,
    storageLoading,
    connect,
    disconnect,
    isConnecting,
    isDisconnecting,
    refetch,
  } = useMegaStorage();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStoragePercentage = (): number => {
    if (!storageUsage) return 0;
    return Math.round((storageUsage.used / storageUsage.total) * 100);
  };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">MEGA Cloud Storage</CardTitle>
          </div>
          <Badge
            variant={isConnected ? "default" : "secondary"}
            className={
              isConnected
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <CardDescription>
          Secure cloud storage for registration documents and images
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Cloud className="h-4 w-4 text-green-600" />
            ) : (
              <CloudOff className="h-4 w-4 text-gray-600" />
            )}
            <span className="text-sm font-medium">
              {isConnected ? "Connected to MEGA" : "Not connected"}
            </span>
          </div>

          <div className="flex space-x-2">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {isDisconnecting ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <CloudOff className="h-4 w-4" />
                )}
                Disconnect
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isConnecting ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Cloud className="h-4 w-4" />
                )}
                Connect
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading || storageLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading || storageLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Connection error: {error.message || "Unknown error occurred"}
            </AlertDescription>
          </Alert>
        )}

        {/* Connection Details */}
        {showDetails && isConnected && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Base Folder ID:</span>
              <code className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">
                {baseFolderId || "Not set"}
              </code>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        )}

        {/* Storage Usage */}
        {isConnected && storageUsage && (
          <div className="space-y-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">
                Storage Usage
              </span>
              <span className="text-xs text-blue-600">
                {getStoragePercentage()}% used
              </span>
            </div>

            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getStoragePercentage()}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-blue-700">
              <span>{formatBytes(storageUsage.used)} used</span>
              <span>{formatBytes(storageUsage.total)} total</span>
            </div>
          </div>
        )}

        {/* Advanced Options */}
        {showDetails && (
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full justify-between"
            >
              <span>Advanced Options</span>
              <Settings
                className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-90" : ""}`}
              />
            </Button>

            {showAdvanced && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="text-xs text-gray-600">
                  <p>
                    <strong>Base Folder:</strong>{" "}
                    {process.env.NEXT_PUBLIC_MEGA_BASE_FOLDER ||
                      "PMB_Aero_Club_Registrations"}
                  </p>
                  <p>
                    <strong>Connection Type:</strong> OAuth2
                  </p>
                  <p>
                    <strong>Security:</strong> End-to-end encryption
                  </p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Open MEGA settings or configuration
                      console.log("Open MEGA settings");
                    }}
                    className="text-xs"
                  >
                    Configure
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Test connection
                      console.log("Test MEGA connection");
                    }}
                    className="text-xs"
                  >
                    Test Connection
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading States */}
        {(isLoading || storageLoading) && (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Loading...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
