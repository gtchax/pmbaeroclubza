"use server";

import { megaStorage } from "../mega-config";
import { MegaFile } from "../mega-config";
import {
  createMultipleUserDocuments,
  createUserDocument,
} from "./user-document-actions";
import { DocumentType, DocumentCategory } from "../types";

// ================================
// MEGA CONNECTION ACTIONS
// ================================

export async function connectToMega(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await megaStorage.connect();
    return { success: true, message: "Successfully connected to MEGA" };
  } catch (error) {
    console.error("Error connecting to MEGA:", error);
    return { success: false, message: "Failed to connect to MEGA" };
  }
}

export async function disconnectFromMega(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await megaStorage.disconnect();
    return { success: true, message: "Successfully disconnected from MEGA" };
  } catch (error) {
    console.error("Error disconnecting from MEGA:", error);
    return { success: false, message: "Failed to disconnect from MEGA" };
  }
}

export async function getMegaConnectionStatus(): Promise<{
  connected: boolean;
  baseFolderId: string | null;
}> {
  try {
    return {
      connected: megaStorage.getConnectionStatus(),
      baseFolderId: megaStorage.getBaseFolderId(),
    };
  } catch (error) {
    console.error("Error getting MEGA connection status:", error);
    return { connected: false, baseFolderId: null };
  }
}

// ================================
// REGISTRATION DOCUMENT UPLOAD (FOR REGISTRATION FLOW)
// ================================

export async function uploadRegistrationDocumentsToMega(
  documents: {
    name: string;
    data: Buffer;
    type: string;
    mimeType?: string;
    documentType?: DocumentType;
    category?: DocumentCategory;
    notes?: string;
  }[]
): Promise<{ success: boolean; files?: MegaFile[]; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    // Create registration documents folder
    const baseFolderId = megaStorage.getBaseFolderId();
    if (!baseFolderId) {
      throw new Error("Base folder not found");
    }

    const registrationFolderName = `registration_documents_${Date.now()}`;
    const registrationFolderId = await megaStorage.createFolder(
      baseFolderId,
      registrationFolderName
    );

    // Upload all documents
    const uploadedFiles: MegaFile[] = [];

    for (const document of documents) {
      const uploadedFile = await megaStorage.uploadFile(
        registrationFolderId,
        document.name,
        document.data,
        document.mimeType
      );

      uploadedFiles.push(uploadedFile);
    }

    return {
      success: true,
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} documents to MEGA`,
    };
  } catch (error) {
    console.error("Error uploading registration documents to MEGA:", error);
    return {
      success: false,
      message: `Failed to upload documents to MEGA: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// DOCUMENT UPLOAD ACTIONS WITH DATABASE INTEGRATION
// ================================

export async function uploadRegistrationDocuments(
  userId: string,
  documents: {
    name: string;
    data: Buffer;
    type: string;
    mimeType?: string;
    documentType?: DocumentType;
    category?: DocumentCategory;
    notes?: string;
  }[]
): Promise<{ success: boolean; files?: MegaFile[]; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    const uploadedFiles = await megaStorage.uploadRegistrationDocuments(
      userId,
      documents
    );

    if (uploadedFiles && uploadedFiles.length > 0) {
      // Create database records for uploaded files
      const documentRecords = uploadedFiles.map((file, index) => {
        const doc = documents[index];
        return {
          name: file.name,
          displayName: doc.name,
          type: (doc.documentType || "OTHER") as DocumentType,
          category: doc.category || "REGISTRATION",
          megaFileId: file.id,
          megaFolderId: "user_documents_folder", // This would be the actual folder ID
          fileSize: file.size,
          mimeType: file.type,
          notes: doc.notes,
        };
      });

      const dbResult = await createMultipleUserDocuments(
        userId,
        documentRecords
      );

      if (!dbResult.success) {
        console.warn(
          "Files uploaded to MEGA but database records failed:",
          dbResult.message
        );
      }
    }

    return {
      success: true,
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} documents`,
    };
  } catch (error) {
    console.error("Error uploading registration documents:", error);
    return {
      success: false,
      message: `Failed to upload documents: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function uploadSingleDocument(
  userId: string,
  document: {
    name: string;
    data: Buffer;
    type: string;
    mimeType?: string;
    documentType?: DocumentType;
    category?: DocumentCategory;
    notes?: string;
  }
): Promise<{ success: boolean; file?: MegaFile; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    // Create user folder if it doesn't exist
    const baseFolderId = megaStorage.getBaseFolderId();
    if (!baseFolderId) {
      throw new Error("Base folder not found");
    }

    const userFolderName = `user_${userId}`;
    const userFolderId = await megaStorage.createFolder(
      baseFolderId,
      userFolderName
    );

    // Create documents subfolder
    const documentsFolderId = await megaStorage.createFolder(
      userFolderId,
      "documents"
    );

    // Upload document
    const uploadedFile = await megaStorage.uploadFile(
      documentsFolderId,
      document.name,
      document.data,
      document.mimeType
    );

    // Create database record
    const documentRecord = {
      name: uploadedFile.name,
      displayName: document.name,
      type: (document.documentType || "OTHER") as DocumentType,
      category: document.category || "REGISTRATION",
      megaFileId: uploadedFile.id,
      megaFolderId: documentsFolderId,
      fileSize: uploadedFile.size,
      mimeType: uploadedFile.type,
      notes: document.notes,
    };

    const dbResult = await createUserDocument(userId, documentRecord);

    if (!dbResult.success) {
      console.warn(
        "File uploaded to MEGA but database record failed:",
        dbResult.message
      );
    }

    return {
      success: true,
      file: uploadedFile,
      message: "Document uploaded successfully",
    };
  } catch (error) {
    console.error("Error uploading single document:", error);
    return {
      success: false,
      message: `Failed to upload document: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// DOCUMENT RETRIEVAL ACTIONS
// ================================

export async function getRegistrationDocuments(
  _userId: string
): Promise<{ success: boolean; files?: MegaFile[]; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    // This would require implementing folder listing functionality
    // For now, we'll return a placeholder
    // TODO: Implement actual document listing using _userId
    return {
      success: true,
      message: "Document listing functionality to be implemented",
    };
  } catch (error) {
    console.error("Error getting registration documents:", error);
    return {
      success: false,
      message: `Failed to get documents: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function downloadDocument(fileId: string): Promise<{
  success: boolean;
  data?: Buffer;
  name?: string;
  type?: string;
  message: string;
}> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    const fileData = await megaStorage.downloadFile(fileId);

    return {
      success: true,
      data: fileData.data,
      name: fileData.name,
      type: fileData.type,
      message: "Document downloaded successfully",
    };
  } catch (error) {
    console.error("Error downloading document:", error);
    return {
      success: false,
      message: `Failed to download document: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function getDocumentInfo(
  fileId: string
): Promise<{ success: boolean; file?: MegaFile; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    const fileInfo = await megaStorage.getFileInfo(fileId);

    if (!fileInfo) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    return {
      success: true,
      file: fileInfo,
      message: "Document info retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting document info:", error);
    return {
      success: false,
      message: `Failed to get document info: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// DOCUMENT MANAGEMENT ACTIONS
// ================================

export async function deleteDocument(
  fileId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    await megaStorage.deleteFile(fileId);

    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting document:", error);
    return {
      success: false,
      message: `Failed to delete document: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function deleteUserDocuments(
  _userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    // This would require implementing folder deletion functionality
    // For now, we'll return a placeholder
    // TODO: Implement actual user document deletion using _userId
    return {
      success: true,
      message: "User documents deletion functionality to be implemented",
    };
  } catch (error) {
    console.error("Error deleting user documents:", error);
    return {
      success: false,
      message: `Failed to delete user documents: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// STORAGE MANAGEMENT ACTIONS
// ================================

export async function getStorageUsage(): Promise<{
  success: boolean;
  usage?: { used: number; total: number };
  message: string;
}> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    const usage = await megaStorage.getStorageUsage();

    return {
      success: true,
      usage,
      message: "Storage usage retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting storage usage:", error);
    return {
      success: false,
      message: `Failed to get storage usage: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// UTILITY ACTIONS
// ================================

export async function createUserFolder(
  userId: string
): Promise<{ success: boolean; folderId?: string; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    const baseFolderId = megaStorage.getBaseFolderId();
    if (!baseFolderId) {
      throw new Error("Base folder not found");
    }

    const userFolderName = `user_${userId}`;
    const userFolderId = await megaStorage.createFolder(
      baseFolderId,
      userFolderName
    );

    return {
      success: true,
      folderId: userFolderId,
      message: "User folder created successfully",
    };
  } catch (error) {
    console.error("Error creating user folder:", error);
    return {
      success: false,
      message: `Failed to create user folder: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function createDocumentsSubfolder(
  userId: string
): Promise<{ success: boolean; folderId?: string; message: string }> {
  try {
    // Ensure connection
    if (!megaStorage.getConnectionStatus()) {
      await megaStorage.connect();
    }

    const baseFolderId = megaStorage.getBaseFolderId();
    if (!baseFolderId) {
      throw new Error("Base folder not found");
    }

    // Create user folder if it doesn't exist
    const userFolderName = `user_${userId}`;
    const userFolderId = await megaStorage.createFolder(
      baseFolderId,
      userFolderName
    );

    // Create documents subfolder
    const documentsFolderId = await megaStorage.createFolder(
      userFolderId,
      "documents"
    );

    return {
      success: true,
      folderId: documentsFolderId,
      message: "Documents subfolder created successfully",
    };
  } catch (error) {
    console.error("Error creating documents subfolder:", error);
    return {
      success: false,
      message: `Failed to create documents subfolder: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
