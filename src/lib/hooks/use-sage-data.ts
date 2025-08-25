import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSageAccounts,
  getSageAccount,
  getSageAccountBalance,
  getSageTransactions,
  getSageTransaction,
  getSageJournals,
  getSageCustomers,
  getSageSuppliers,
  getSageFinancialSummary,
  getSageDashboardData,
  getStudentFinancialSummary,
  getStudentOutstandingInvoices,
  getInstructorFinancialSummary,
  getAdminFinancialOverview,
} from "../actions/sage-actions";

// ================================
// ACCOUNT MANAGEMENT HOOKS
// ================================

export function useSageAccounts() {
  return useQuery({
    queryKey: ["sage", "accounts"],
    queryFn: getSageAccounts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSageAccount(accountId: string) {
  return useQuery({
    queryKey: ["sage", "accounts", accountId],
    queryFn: () => getSageAccount(accountId),
    enabled: !!accountId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useSageAccountBalance(accountId: string) {
  return useQuery({
    queryKey: ["sage", "accounts", accountId, "balance"],
    queryFn: () => getSageAccountBalance(accountId),
    enabled: !!accountId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,
  });
}

// ================================
// TRANSACTION MANAGEMENT HOOKS
// ================================

export function useSageTransactions(
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
  limit: number = 100
) {
  return useQuery({
    queryKey: ["sage", "transactions", accountId, startDate, endDate, limit],
    queryFn: () => getSageTransactions(accountId, startDate, endDate, limit),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export function useSageTransaction(transactionId: string) {
  return useQuery({
    queryKey: ["sage", "transactions", transactionId],
    queryFn: () => getSageTransaction(transactionId),
    enabled: !!transactionId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// ================================
// JOURNAL MANAGEMENT HOOKS
// ================================

export function useSageJournals(
  startDate?: Date,
  endDate?: Date,
  limit: number = 50
) {
  return useQuery({
    queryKey: ["sage", "journals", startDate, endDate, limit],
    queryFn: () => getSageJournals(startDate, endDate, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// ================================
// CUSTOMER & SUPPLIER MANAGEMENT HOOKS
// ================================

export function useSageCustomers() {
  return useQuery({
    queryKey: ["sage", "customers"],
    queryFn: getSageCustomers,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000,
  });
}

export function useSageSuppliers() {
  return useQuery({
    queryKey: ["sage", "suppliers"],
    queryFn: getSageSuppliers,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}

// ================================
// FINANCIAL SUMMARIES HOOKS
// ================================

export function useSageFinancialSummary() {
  return useQuery({
    queryKey: ["sage", "financial-summary"],
    queryFn: getSageFinancialSummary,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,
  });
}

export function useSageDashboardData() {
  return useQuery({
    queryKey: ["sage", "dashboard-data"],
    queryFn: getSageDashboardData,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// ================================
// STUDENT-SPECIFIC FINANCIAL HOOKS
// ================================

export function useStudentFinancialSummary(studentId: string) {
  return useQuery({
    queryKey: ["sage", "student", studentId, "financial-summary"],
    queryFn: () => getStudentFinancialSummary(studentId),
    enabled: !!studentId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export function useStudentOutstandingInvoices(studentId: string) {
  return useQuery({
    queryKey: ["sage", "student", studentId, "outstanding-invoices"],
    queryFn: () => getStudentOutstandingInvoices(studentId),
    enabled: !!studentId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// ================================
// INSTRUCTOR-SPECIFIC FINANCIAL HOOKS
// ================================

export function useInstructorFinancialSummary(instructorId: string) {
  return useQuery({
    queryKey: ["sage", "instructor", instructorId, "financial-summary"],
    queryFn: () => getInstructorFinancialSummary(instructorId),
    enabled: !!instructorId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// ================================
// ADMIN FINANCIAL OVERVIEW HOOKS
// ================================

export function useAdminFinancialOverview() {
  return useQuery({
    queryKey: ["sage", "admin", "financial-overview"],
    queryFn: getAdminFinancialOverview,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// ================================
// REFRESH MUTATIONS
// ================================

export function useRefreshSageData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Invalidate all SAGE-related queries
      await queryClient.invalidateQueries({ queryKey: ["sage"] });
    },
  });
}

export function useRefreshStudentFinancialData(studentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Invalidate student-specific financial queries
      await queryClient.invalidateQueries({
        queryKey: ["sage", "student", studentId],
      });
    },
  });
}

export function useRefreshInstructorFinancialData(instructorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Invalidate instructor-specific financial queries
      await queryClient.invalidateQueries({
        queryKey: ["sage", "instructor", instructorId],
      });
    },
  });
}

export function useRefreshAdminFinancialData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Invalidate admin financial queries
      await queryClient.invalidateQueries({
        queryKey: ["sage", "admin"],
      });
    },
  });
}
