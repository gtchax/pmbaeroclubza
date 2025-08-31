"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MegaConnectionStatus } from "./MegaConnectionStatus";
import { DocumentUpload } from "./DocumentUpload";
import { useMegaStorage } from "@/lib/hooks/use-mega-storage";
import {
  Database,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  FileText,
  HardDrive,
  Users,
  Shield,
} from "lucide-react";

interface MegaDashboardProps {
  userId?: string;
  className?: string;
}

export function MegaDashboard({ userId, className = "" }: MegaDashboardProps) {
  const { isConnected, storageUsage, refetch } = useMegaStorage();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const mockStats = {
    totalUsers: 156,
    totalDocuments: 1247,
    totalStorage: storageUsage?.total || 0,
    usedStorage: storageUsage?.used || 0,
    activeConnections: isConnected ? 1 : 0,
    securityStatus: "Secure",
  };

  const mockRecentActivity = [
    {
      id: 1,
      user: "John Doe",
      action: "Uploaded",
      document: "medical_certificate.pdf",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Downloaded",
      document: "license_copy.jpg",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Deleted",
      document: "old_photo.png",
      time: "1 day ago",
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "Uploaded",
      document: "insurance_docs.pdf",
      time: "2 days ago",
    },
  ];

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStoragePercentage = (): number => {
    if (!storageUsage) return 0;
    return Math.round((mockStats.usedStorage / mockStats.totalStorage) * 100);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              MEGA Cloud Storage Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage cloud storage for PMB Aero Club registration documents
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Connection Status */}
          <MegaConnectionStatus showDetails={true} />

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" aria-label="Users icon" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Registered members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Documents
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" aria-label="Documents icon" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStats.totalDocuments}
                </div>
                <p className="text-xs text-muted-foreground">Stored files</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Storage Used
                </CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatBytes(mockStats.usedStorage)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {getStoragePercentage()}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Security Status
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockStats.securityStatus}
                </div>
                <p className="text-xs text-muted-foreground">
                  End-to-end encrypted
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Storage Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>
                Current storage utilization across all users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Used: {formatBytes(mockStats.usedStorage)}</span>
                <span>Total: {formatBytes(mockStats.totalStorage)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getStoragePercentage()}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{getStoragePercentage()}% utilized</span>
                <span>
                  {formatBytes(mockStats.totalStorage - mockStats.usedStorage)}{" "}
                  available
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest document operations across the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          activity.action === "Uploaded"
                            ? "bg-green-100 text-green-600"
                            : activity.action === "Downloaded"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {activity.action === "Uploaded" ? (
                          <Upload className="h-4 w-4" />
                        ) : activity.action === "Downloaded" ? (
                          <Download className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-gray-500">
                          {activity.action} {activity.document}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          {userId ? (
            <DocumentUpload
              userId={userId}
              maxFiles={20}
              maxFileSize={100}
              onUploadComplete={(files) => {
                console.log("Upload completed:", files);
                // Handle upload completion
              }}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No User Selected
                </h3>
                <p className="text-gray-600">
                  Please select a user to upload documents for.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                View, download, and manage stored documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" aria-label="Document management icon" />
                <p>Document listing functionality coming soon...</p>
                <p className="text-sm mt-2">
                  This will include search, filtering, and bulk operations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>MEGA Configuration</CardTitle>
              <CardDescription>
                Configure MEGA cloud storage settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Folder</label>
                  <input
                    type="text"
                    value="PMB_Aero_Club_Registrations"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Connection Type</label>
                  <input
                    type="text"
                    value="OAuth2"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Encryption</label>
                  <input
                    type="text"
                    value="End-to-End"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-Connect</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto-connect"
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="auto-connect" className="text-sm">
                      Automatically connect on startup
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="mr-2">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Reset Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
