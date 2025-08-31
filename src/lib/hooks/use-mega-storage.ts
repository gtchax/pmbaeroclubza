import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  connectToMega,
  disconnectFromMega,
  getMegaConnectionStatus,
  uploadRegistrationDocuments,
  uploadSingleDocument,
  getRegistrationDocuments,
  downloadDocument,
  getDocumentInfo,
  deleteDocument,
  getStorageUsage,
  createUserFolder,
  createDocumentsSubfolder,
} from "../actions/mega-actions";

// ================================
// MEGA CONNECTION HOOKS
// ================================

export function useMegaConnection() {
  const queryClient = useQueryClient();

  const connectMutation = useMutation({
    mutationFn: connectToMega,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mega", "status"] });
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectFromMega,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mega", "status"] });
    },
  });

  return {
    connect: connectMutation.mutate,
    disconnect: disconnectMutation.mutate,
    isConnecting: connectMutation.isPending,
    isDisconnecting: disconnectMutation.isPending,
    connectError: connectMutation.error,
    disconnectError: disconnectMutation.error,
  };
}

export function useMegaConnectionStatus() {
  return useQuery({
    queryKey: ["mega", "status"],
    queryFn: getMegaConnectionStatus,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}

// ================================
// DOCUMENT UPLOAD HOOKS
// ================================

export function useUploadRegistrationDocuments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      documents,
    }: {
      userId: string;
      documents: {
        name: string;
        data: Buffer;
        type: string;
        mimeType?: string;
      }[];
    }) => uploadRegistrationDocuments(userId, documents),
    onSuccess: (data, variables) => {
      // Invalidate user documents query
      queryClient.invalidateQueries({
        queryKey: ["mega", "documents", variables.userId],
      });
      // Invalidate storage usage
      queryClient.invalidateQueries({ queryKey: ["mega", "storage"] });
    },
  });
}

export function useUploadSingleDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      document,
    }: {
      userId: string;
      document: {
        name: string;
        data: Buffer;
        type: string;
        mimeType?: string;
      };
    }) => uploadSingleDocument(userId, document),
    onSuccess: (data, variables) => {
      // Invalidate user documents query
      queryClient.invalidateQueries({
        queryKey: ["mega", "documents", variables.userId],
      });
      // Invalidate storage usage
      queryClient.invalidateQueries({ queryKey: ["mega", "storage"] });
    },
  });
}

// ================================
// DOCUMENT RETRIEVAL HOOKS
// ================================

export function useRegistrationDocuments(userId: string) {
  return useQuery({
    queryKey: ["mega", "documents", userId],
    queryFn: () => getRegistrationDocuments(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: downloadDocument,
  });
}

export function useDocumentInfo(fileId: string) {
  return useQuery({
    queryKey: ["mega", "document", fileId],
    queryFn: () => getDocumentInfo(fileId),
    enabled: !!fileId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
}

// ================================
// DOCUMENT MANAGEMENT HOOKS
// ================================

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      // Invalidate all document queries
      queryClient.invalidateQueries({ queryKey: ["mega", "documents"] });
      // Invalidate storage usage
      queryClient.invalidateQueries({ queryKey: ["mega", "storage"] });
    },
  });
}

// ================================
// STORAGE MANAGEMENT HOOKS
// ================================

export function useStorageUsage() {
  return useQuery({
    queryKey: ["mega", "storage"],
    queryFn: getStorageUsage,
    refetchInterval: 60 * 1000, // Refresh every minute
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
  });
}

// ================================
// FOLDER MANAGEMENT HOOKS
// ================================

export function useCreateUserFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserFolder,
    onSuccess: () => {
      // Invalidate connection status
      queryClient.invalidateQueries({ queryKey: ["mega", "status"] });
    },
  });
}

export function useCreateDocumentsSubfolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocumentsSubfolder,
    onSuccess: () => {
      // Invalidate connection status
      queryClient.invalidateQueries({ queryKey: ["mega", "status"] });
    },
  });
}

// ================================
// UTILITY HOOKS
// ================================

export function useMegaStorage() {
  const connectionStatus = useMegaConnectionStatus();
  const storageUsage = useStorageUsage();
  const { connect, disconnect, isConnecting, isDisconnecting } =
    useMegaConnection();

  return {
    // Connection
    isConnected: connectionStatus.data?.connected || false,
    baseFolderId: connectionStatus.data?.baseFolderId,
    isLoading: connectionStatus.isLoading,
    error: connectionStatus.error,

    // Storage
    storageUsage: storageUsage.data?.usage,
    storageLoading: storageUsage.isLoading,
    storageError: storageUsage.error,

    // Actions
    connect,
    disconnect,
    isConnecting,
    isDisconnecting,

    // Refresh
    refetch: () => {
      connectionStatus.refetch();
      storageUsage.refetch();
    },
  };
}

// ================================
// DOCUMENT UPLOAD UTILITY HOOK
// ================================

export function useDocumentUpload(userId: string) {
  const uploadDocuments = useUploadRegistrationDocuments();
  const uploadSingle = useUploadSingleDocument();
  const { isConnected } = useMegaStorage();

  const uploadFiles = async (files: File[]) => {
    if (!isConnected) {
      throw new Error("Not connected to MEGA");
    }

    const documents = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          name: file.name,
          data: Buffer.from(arrayBuffer),
          type: "registration_document",
          mimeType: file.type,
        };
      })
    );

    return uploadDocuments.mutateAsync({ userId, documents });
  };

  const uploadFile = async (file: File) => {
    if (!isConnected) {
      throw new Error("Not connected to MEGA");
    }

    const arrayBuffer = await file.arrayBuffer();
    const document = {
      name: file.name,
      data: Buffer.from(arrayBuffer),
      type: "registration_document",
      mimeType: file.type,
    };

    return uploadSingle.mutateAsync({ userId, document });
  };

  return {
    uploadFiles,
    uploadFile,
    isUploading: uploadDocuments.isPending || uploadSingle.isPending,
    uploadError: uploadDocuments.error || uploadSingle.error,
    uploadProgress: uploadDocuments.data || uploadSingle.data,
  };
}
