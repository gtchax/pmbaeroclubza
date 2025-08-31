"use server";

import { prisma } from "../prisma";
import { 
  UserDocument, 
  DocumentType, 
  DocumentCategory, 
  DocumentStatus,
  UserWithDocuments 
} from "../types";

// ================================
// CREATE DOCUMENT RECORDS
// ================================

export async function createUserDocument(
  userId: string,
  documentData: {
    name: string;
    displayName: string;
    type: DocumentType;
    category: DocumentCategory;
    megaFileId: string;
    megaFolderId: string;
    fileSize: number;
    mimeType: string;
    notes?: string;
  }
): Promise<{ success: boolean; document?: UserDocument; message: string }> {
  try {
    const document = await prisma.userDocument.create({
      data: {
        userId,
        ...documentData,
        status: "PENDING",
      },
    });

    return {
      success: true,
      document,
      message: "Document record created successfully",
    };
  } catch (error) {
    console.error("Error creating user document record:", error);
    return {
      success: false,
      message: `Failed to create document record: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function createMultipleUserDocuments(
  userId: string,
  documents: Array<{
    name: string;
    displayName: string;
    type: DocumentType;
    category: DocumentCategory;
    megaFileId: string;
    megaFolderId: string;
    fileSize: number;
    mimeType: string;
    notes?: string;
  }>
): Promise<{ success: boolean; documents?: UserDocument[]; message: string }> {
  try {
    const createdDocuments = await Promise.all(
      documents.map(doc => 
        prisma.userDocument.create({
          data: {
            userId,
            ...doc,
            status: "PENDING",
          },
        })
      )
    );

    return {
      success: true,
      documents: createdDocuments,
      message: `Created ${createdDocuments.length} document records successfully`,
    };
  } catch (error) {
    console.error("Error creating multiple user document records:", error);
    return {
      success: false,
      message: `Failed to create document records: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// RETRIEVE DOCUMENT RECORDS
// ================================

export async function getUserDocuments(
  userId: string
): Promise<{ success: boolean; documents?: UserDocument[]; message: string }> {
  try {
    const documents = await prisma.userDocument.findMany({
      where: { userId },
      orderBy: { uploadedAt: "desc" },
    });

    return {
      success: true,
      documents,
      message: `Found ${documents.length} documents`,
    };
  } catch (error) {
    console.error("Error fetching user documents:", error);
    return {
      success: false,
      message: `Failed to fetch documents: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function getUserDocument(
  documentId: string
): Promise<{ success: boolean; document?: UserDocument; message: string }> {
  try {
    const document = await prisma.userDocument.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    return {
      success: true,
      document,
      message: "Document retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching user document:", error);
    return {
      success: false,
      message: `Failed to fetch document: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function getUserWithDocuments(
  userId: string
): Promise<{ success: boolean; user?: UserWithDocuments; message: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        documents: {
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      user: user as UserWithDocuments,
      message: "User with documents retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching user with documents:", error);
    return {
      success: false,
      message: `Failed to fetch user with documents: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// UPDATE DOCUMENT RECORDS
// ================================

export async function updateUserDocument(
  documentId: string,
  updates: Partial<{
    displayName: string;
    type: DocumentType;
    category: DocumentCategory;
    status: DocumentStatus;
    notes: string;
    reviewNotes: string;
  }>
): Promise<{ success: boolean; document?: UserDocument; message: string }> {
  try {
    const document = await prisma.userDocument.update({
      where: { id: documentId },
      data: {
        ...updates,
        updatedAt: new Date(),
        ...(updates.status === "APPROVED" || updates.status === "REJECTED" ? {
          reviewedAt: new Date(),
        } : {}),
      },
    });

    return {
      success: true,
      document,
      message: "Document updated successfully",
    };
  } catch (error) {
    console.error("Error updating user document:", error);
    return {
      success: false,
      message: `Failed to update document: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function approveDocument(
  documentId: string,
  reviewedBy: string,
  reviewNotes?: string
): Promise<{ success: boolean; document?: UserDocument; message: string }> {
  return updateUserDocument(documentId, {
    status: "APPROVED",
    reviewNotes,
  });
}

export async function rejectDocument(
  documentId: string,
  reviewedBy: string,
  reviewNotes: string
): Promise<{ success: boolean; document?: UserDocument; message: string }> {
  return updateUserDocument(documentId, {
    status: "REJECTED",
    reviewNotes,
  });
}

// ================================
// DELETE DOCUMENT RECORDS
// ================================

export async function deleteUserDocument(
  documentId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.userDocument.delete({
      where: { id: documentId },
    });

    return {
      success: true,
      message: "Document record deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user document record:", error);
    return {
      success: false,
      message: `Failed to delete document record: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function deleteUserDocuments(
  userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.userDocument.deleteMany({
      where: { userId },
    });

    return {
      success: true,
      message: "All user document records deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user document records:", error);
    return {
      success: false,
      message: `Failed to delete document records: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// DOCUMENT SEARCH & FILTERING
// ================================

export async function searchUserDocuments(
  userId: string,
  filters: {
    type?: DocumentType;
    category?: DocumentCategory;
    status?: DocumentStatus;
    searchTerm?: string;
  }
): Promise<{ success: boolean; documents?: UserDocument[]; message: string }> {
  try {
    const whereClause: Record<string, unknown> = { userId };

    if (filters.type) whereClause.type = filters.type;
    if (filters.category) whereClause.category = filters.category;
    if (filters.status) whereClause.status = filters.status;
    if (filters.searchTerm) {
      whereClause.OR = [
        { name: { contains: filters.searchTerm, mode: "insensitive" } },
        { displayName: { contains: filters.searchTerm, mode: "insensitive" } },
        { notes: { contains: filters.searchTerm, mode: "insensitive" } },
      ];
    }

    const documents = await prisma.userDocument.findMany({
      where: whereClause,
      orderBy: { uploadedAt: "desc" },
    });

    return {
      success: true,
      documents,
      message: `Found ${documents.length} documents matching criteria`,
    };
  } catch (error) {
    console.error("Error searching user documents:", error);
    return {
      success: false,
      message: `Failed to search documents: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ================================
// DOCUMENT STATISTICS
// ================================

export async function getUserDocumentStats(
  userId: string
): Promise<{ success: boolean; stats?: { total: number; pending: number; approved: number; rejected: number }; message: string }> {
  try {
    const [totalDocuments, pendingDocuments, approvedDocuments, rejectedDocuments] = await Promise.all([
      prisma.userDocument.count({ where: { userId } }),
      prisma.userDocument.count({ where: { userId, status: "PENDING" } }),
      prisma.userDocument.count({ where: { userId, status: "APPROVED" } }),
      prisma.userDocument.count({ where: { userId, status: "REJECTED" } }),
    ]);

    const stats = {
      total: totalDocuments,
      pending: pendingDocuments,
      approved: approvedDocuments,
      rejected: rejectedDocuments,
    };

    return {
      success: true,
      stats,
      message: "Document statistics retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching user document statistics:", error);
    return {
      success: false,
      message: `Failed to fetch document statistics: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
