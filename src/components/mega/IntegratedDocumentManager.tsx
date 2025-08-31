"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Database,
  Cloud
} from "lucide-react";
import { DocumentUpload } from "./DocumentUpload";
import { MegaConnectionStatus } from "./MegaConnectionStatus";
import { useUserDocumentManagement } from "@/lib/hooks/use-user-documents";
import { useMegaStorage } from "@/lib/hooks/use-mega-storage";
import { DocumentType, DocumentCategory, DocumentStatus } from "@/lib/types";

interface IntegratedDocumentManagerProps {
  userId: string;
  title?: string;
}

export function IntegratedDocumentManager({ 
  userId, 
  title = "Document Management" 
}: IntegratedDocumentManagerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Hooks for integrated functionality
  const documentManagement = useUserDocumentManagement(userId);
  const megaStorage = useMegaStorage();

  // ================================
  // UTILITY FUNCTIONS
  // ================================

  const getDocumentIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <Image className="h-4 w-4 text-blue-500" aria-hidden="true" />;
    }
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const getStatusBadge = (status: DocumentStatus) => {
    const variants = {
      PENDING: "secondary",
      APPROVED: "default",
      REJECTED: "destructive",
      EXPIRED: "outline",
      ARCHIVED: "secondary",
    } as const;

    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      EXPIRED: "bg-gray-100 text-gray-800",
      ARCHIVED: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge 
        variant={variants[status]} 
        className={colors[status]}
      >
        {status.toLowerCase().replace('_', ' ')}
      </Badge>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getDocumentTypeLabel = (type: DocumentType) => {
    const labels: Record<DocumentType, string> = {
      MEDICAL_CERTIFICATE: "Medical Certificate",
      LICENSE_COPY: "License Copy",
      INSURANCE_DOCUMENT: "Insurance Document",
      IDENTIFICATION: "Identification",
      MEDICAL_RECORD: "Medical Record",
      TRAINING_CERTIFICATE: "Training Certificate",
      AIRCRAFT_CERTIFICATION: "Aircraft Certification",
      OTHER: "Other",
    };
    return labels[type];
  };

  const getCategoryLabel = (category: DocumentCategory) => {
    const labels: Record<DocumentCategory, string> = {
      REGISTRATION: "Registration",
      MEDICAL: "Medical",
      LICENSING: "Licensing",
      INSURANCE: "Insurance",
      TRAINING: "Training",
      AIRCRAFT: "Aircraft",
      ADMINISTRATIVE: "Administrative",
      OTHER: "Other",
    };
    return labels[category];
  };

  // ================================
  // RENDER
  // ================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">
            Manage your documents with MEGA cloud storage and database tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            Database
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Cloud className="h-3 w-3" />
            MEGA Cloud
          </Badge>
        </div>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MegaConnectionStatus showDetails={true} />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Connected to PostgreSQL</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              User documents: {documentManagement.documents.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Document Statistics */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documentManagement.stats?.total || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documentManagement.stats?.pending || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documentManagement.stats?.approved || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully verified
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {documentManagement.documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Start by uploading some documents</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documentManagement.documents.slice(0, 5).map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(doc.mimeType)}
                        <div>
                          <p className="font-medium text-sm">{doc.displayName}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{getDocumentTypeLabel(doc.type)}</span>
                            <span>•</span>
                            <span>{getCategoryLabel(doc.category)}</span>
                            <span>•</span>
                            <span>{formatFileSize(doc.fileSize)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.status)}
                        <span className="text-xs text-muted-foreground">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentUpload
                userId={userId}
                maxFiles={10}
                maxFileSize={50}
                onUploadComplete={(files) => {
                  console.log("Documents uploaded:", files);
                  // Refresh document list
                  documentManagement.refetch();
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Documents</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => documentManagement.refetch()}
                  disabled={documentManagement.isLoading}
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {documentManagement.isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                  <p>Loading documents...</p>
                </div>
              ) : documentManagement.error ? (
                <div className="text-center py-8 text-destructive">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                  <p>Error loading documents</p>
                  <p className="text-sm">{documentManagement.error.message}</p>
                </div>
              ) : documentManagement.documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documentManagement.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(doc.mimeType)}
                        <div>
                          <p className="font-medium">{doc.displayName}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{getDocumentTypeLabel(doc.type)}</span>
                            <span>•</span>
                            <span>{getCategoryLabel(doc.category)}</span>
                            <span>•</span>
                            <span>{formatFileSize(doc.fileSize)}</span>
                            {doc.notes && (
                              <>
                                <span>•</span>
                                <span className="italic">&quot;{doc.notes}&quot;</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.status)}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Download functionality would go here
                              console.log("Download document:", doc.id);
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Delete functionality would go here
                              console.log("Delete document:", doc.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Tab */}
        <TabsContent value="storage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MEGA Storage Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  MEGA Cloud Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                {megaStorage.storageLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2" />
                    <p className="text-sm">Loading storage info...</p>
                  </div>
                ) : megaStorage.storageUsage ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Used Space</span>
                      <span>{formatFileSize(megaStorage.storageUsage.used)}</span>
                    </div>
                    {/* <Progress 
                      value={megaStorage.storageUsage.percentage} 
                      className="h-2"
                    /> */}
                    {/* <div className="text-xs text-muted-foreground">
                      {megaStorage.storageUsage.percentage.toFixed(1)}% of total storage used
                    </div> */}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Storage information not available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Database Storage Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Document Records</span>
                    <span>{documentManagement.documents.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total File Size</span>
                    <span>
                      {formatFileSize(
                        documentManagement.documents.reduce((sum, doc) => sum + doc.fileSize, 0)
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Metadata and tracking information stored locally
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
