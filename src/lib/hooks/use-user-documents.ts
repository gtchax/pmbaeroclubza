import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserDocuments,
  getUserDocument,
  getUserWithDocuments,
  createUserDocument,
  createMultipleUserDocuments,
  updateUserDocument,
  approveDocument,
  rejectDocument,
  deleteUserDocument,
  getUserDocumentStats,
} from "../actions/user-document-actions";
import { DocumentType, DocumentCategory } from "../types";

// ================================
// DOCUMENT RETRIEVAL HOOKS
// ================================

export function useUserDocuments(userId: string) {
  return useQuery({
    queryKey: ["user-documents", userId],
    queryFn: () => getUserDocuments(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUserDocument(documentId: string) {
  return useQuery({
    queryKey: ["user-document", documentId],
    queryFn: () => getUserDocument(documentId),
    enabled: !!documentId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
}

export function useUserWithDocuments(userId: string) {
  return useQuery({
    queryKey: ["user-with-documents", userId],
    queryFn: () => getUserWithDocuments(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ================================
// DOCUMENT CREATION HOOKS
// ================================

export function useCreateUserDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      documentData,
    }: {
      userId: string;
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
      };
    }) => createUserDocument(userId, documentData),
    onSuccess: (data, variables) => {
      // Invalidate user documents queries
      queryClient.invalidateQueries({
        queryKey: ["user-documents", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-with-documents", variables.userId],
      });
    },
  });
}

export function useCreateMultipleUserDocuments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      documents,
    }: {
      userId: string;
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
      }>;
    }) => createMultipleUserDocuments(userId, documents),
    onSuccess: (data, variables) => {
      // Invalidate user documents queries
      queryClient.invalidateQueries({
        queryKey: ["user-documents", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-with-documents", variables.userId],
      });
    },
  });
}

// ================================
// DOCUMENT UPDATE HOOKS
// ================================

export function useUpdateUserDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      documentId,
      updates,
    }: {
      documentId: string;
      updates: Partial<{
        displayName: string;
        type: DocumentType;
        category: DocumentCategory;
        status: DocumentStatus;
        notes: string;
        reviewNotes: string;
      }>;
    }) => updateUserDocument(documentId, updates),
    onSuccess: (data, variables) => {
      // Invalidate document queries
      queryClient.invalidateQueries({
        queryKey: ["user-document", variables.documentId],
      });
      // Invalidate all user documents queries
      queryClient.invalidateQueries({
        queryKey: ["user-documents"],
      });
    },
  });
}

export function useApproveDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      documentId,
      reviewedBy,
      reviewNotes,
    }: {
      documentId: string;
      reviewedBy: string;
      reviewNotes?: string;
    }) => approveDocument(documentId, reviewedBy, reviewNotes),
    onSuccess: (data, variables) => {
      // Invalidate document queries
      queryClient.invalidateQueries({
        queryKey: ["user-document", variables.documentId],
      });
      // Invalidate all user documents queries
      queryClient.invalidateQueries({
        queryKey: ["user-documents"],
      });
    },
  });
}

export function useRejectDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      documentId,
      reviewedBy,
      reviewNotes,
    }: {
      documentId: string;
      reviewedBy: string;
      reviewNotes: string;
    }) => rejectDocument(documentId, reviewedBy, reviewNotes),
    onSuccess: (data, variables) => {
      // Invalidate document queries
      queryClient.invalidateQueries({
        queryKey: ["user-document", variables.documentId],
      });
      // Invalidate all user documents queries
      queryClient.invalidateQueries({
        queryKey: ["user-documents"],
      });
    },
  });
}

// ================================
// DOCUMENT DELETION HOOKS
// ================================

export function useDeleteUserDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserDocument,
    onSuccess: (data, documentId) => {
      // Invalidate document queries
      queryClient.invalidateQueries({
        queryKey: ["user-document", documentId],
      });
      // Invalidate all user documents queries
      queryClient.invalidateQueries({
        queryKey: ["user-documents"],
      });
    },
  });
}

// ================================
// DOCUMENT SEARCH & STATISTICS HOOKS
// ================================

export function useSearchUserDocuments(userId: string) {
  return useQuery({
    queryKey: ["user-documents-search", userId],
    queryFn: () => getUserDocuments(userId), // Default to all documents
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUserDocumentStats(userId: string) {
  return useQuery({
    queryKey: ["user-document-stats", userId],
    queryFn: () => getUserDocumentStats(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ================================
// UTILITY HOOKS
// ================================

export function useUserDocumentManagement(userId: string) {
  const documents = useUserDocuments(userId);
  const stats = useUserDocumentStats(userId);
  const createDocument = useCreateUserDocument();
  const createMultipleDocuments = useCreateMultipleUserDocuments();
  const updateDocument = useUpdateUserDocument();
  const approveDoc = useApproveDocument();
  const rejectDoc = useRejectDocument();
  const deleteDocument = useDeleteUserDocument();

  return {
    // Data
    documents: documents.data?.documents || [],
    stats: stats.data?.stats,
    isLoading: documents.isLoading || stats.isLoading,
    error: documents.error || stats.error,
    
    // Actions
    createDocument: createDocument.mutate,
    createMultipleDocuments: createMultipleDocuments.mutate,
    updateDocument: updateDocument.mutate,
    approveDocument: approveDoc.mutate,
    rejectDocument: rejectDoc.mutate,
    deleteDocument: deleteDocument.mutate,
    
    // Loading states
    isCreating: createDocument.isPending,
    isCreatingMultiple: createMultipleDocuments.isPending,
    isUpdating: updateDocument.isPending,
    isApproving: approveDoc.isPending,
    isRejecting: rejectDoc.isPending,
    isDeleting: deleteDocument.isPending,
    
    // Error states
    createError: createDocument.error,
    createMultipleError: createMultipleDocuments.error,
    updateError: updateDocument.error,
    approveError: approveDoc.error,
    rejectError: rejectDoc.error,
    deleteError: deleteDocument.error,
    
    // Refresh
    refetch: () => {
      documents.refetch();
      stats.refetch();
    },
  };
}
