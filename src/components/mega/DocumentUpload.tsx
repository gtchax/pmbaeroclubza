"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  X,
  FileText,
  Image,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useDocumentUpload } from "@/lib/hooks/use-mega-storage";
import { DocumentType, DocumentCategory } from "@/lib/types";

interface DocumentUploadProps {
  userId: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  onUploadComplete?: (
    files: { id: string; name: string; size: number; type: string }[]
  ) => void;
}

const allowedTypes = [
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const documentTypeOptions: { value: DocumentType; label: string }[] = [
  { value: "MEDICAL_CERTIFICATE", label: "Medical Certificate" },
  { value: "LICENSE_COPY", label: "License Copy" },
  { value: "INSURANCE_DOCUMENT", label: "Insurance Document" },
  { value: "IDENTIFICATION", label: "Identification" },
  { value: "MEDICAL_RECORD", label: "Medical Record" },
  { value: "TRAINING_CERTIFICATE", label: "Training Certificate" },
  { value: "AIRCRAFT_CERTIFICATION", label: "Aircraft Certification" },
  { value: "OTHER", label: "Other" },
];

const documentCategoryOptions: { value: DocumentCategory; label: string }[] = [
  { value: "REGISTRATION", label: "Registration" },
  { value: "MEDICAL", label: "Medical" },
  { value: "LICENSING", label: "Licensing" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "TRAINING", label: "Training" },
  { value: "AIRCRAFT", label: "Aircraft" },
  { value: "ADMINISTRATIVE", label: "Administrative" },
  { value: "OTHER", label: "Other" },
];

export function DocumentUpload({
  userId,
  maxFiles = 10,
  maxFileSize = 50,
  onUploadComplete,
}: DocumentUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; name: string; size: number; type: string }[]
  >([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { uploadFile, isUploading } = useDocumentUpload(userId);

  // ================================
  // FILE VALIDATION
  // ================================

  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        return {
          valid: false,
          error: `File size must be less than ${maxFileSize}MB`,
        };
      }

      // Check file type
      const isValidType = allowedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });

      if (!isValidType) {
        return {
          valid: false,
          error: `File type ${file.type} is not allowed`,
        };
      }

      return { valid: true };
    },
    [maxFileSize]
  );

  const validateFiles = useCallback(
    (files: File[]): { valid: boolean; errors: string[] } => {
      const errors: string[] = [];

      if (files.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
      }

      files.forEach((file) => {
        const validation = validateFile(file);
        if (!validation.valid && validation.error) {
          errors.push(`${file.name}: ${validation.error}`);
        }
      });

      return { valid: errors.length === 0, errors };
    },
    [maxFiles, validateFile]
  );

  // ================================
  // FILE HANDLING
  // ================================

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const validation = validateFiles(fileArray);

      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }

      setErrors([]);
      setSelectedFiles((prev) => [...prev, ...fileArray].slice(0, maxFiles));
    },
    [maxFiles, validateFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[selectedFiles[index]?.name];
        return newProgress;
      });
    },
    [selectedFiles]
  );

  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
    setUploadProgress({});
    setErrors([]);
  }, []);

  // ================================
  // UPLOAD HANDLING
  // ================================

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: i,
          }));
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Upload to MEGA
        const result = await uploadFile(file);

        if (result.success && result.file) {
          const uploadedFile = {
            id: result.file.id,
            name: result.file.name,
            size: result.file.size,
            type: result.file.type,
          };

          setUploadedFiles((prev) => [...prev, uploadedFile]);

          // Call completion callback
          if (onUploadComplete) {
            onUploadComplete([uploadedFile]);
          }

          return uploadedFile;
        } else {
          throw new Error(result.message || "Upload failed");
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        setErrors((prev) => [...prev, `Failed to upload ${file.name}`]);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(Boolean);

    if (successfulUploads.length > 0) {
      setSelectedFiles([]);
      setUploadProgress({});
    }
  }, [selectedFiles, onUploadComplete, uploadFile]);

  // ================================
  // DRAG & DROP HANDLING
  // ================================

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files);
      }
    },
    [handleFileSelect]
  );

  // ================================
  // RENDER
  // ================================

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supported formats: Images, PDFs, Word documents, Text files
          </p>
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={isUploading}
          >
            Choose Files
          </Button>
          <input
            id="file-input"
            type="file"
            multiple
            accept={allowedTypes.join(",")}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {/* File Type and Category Selection */}
        {selectedFiles.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document-type">Document Type</Label>
                <Select defaultValue="OTHER">
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="document-category">Category</Label>
                <Select defaultValue="REGISTRATION">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about these documents..."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                Selected Files ({selectedFiles.length})
              </h4>
              <Button variant="outline" size="sm" onClick={clearFiles}>
                Clear All
              </Button>
            </div>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {file.type.startsWith("image/") ? (
                      <Image
                        className="h-5 w-5 text-blue-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <FileText
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadProgress[file.name] !== undefined && (
                      <Progress
                        value={uploadProgress[file.name]}
                        className="w-20"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {selectedFiles.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload {selectedFiles.length} File
                {selectedFiles.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="space-y-2">
            {errors.map((error, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            ))}
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Files</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Uploaded
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
