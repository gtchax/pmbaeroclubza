"use server";

import { sageApi } from "../sage-api";
import {
  SageAccount,
  SageTransaction,
  SageJournal,
  SageCustomer,
  SageSupplier,
  SageFinancialSummary,
  SageDashboardData,
} from "../types";

// ================================
// ACCOUNT MANAGEMENT ACTIONS
// ================================

export async function getSageAccounts(): Promise<SageAccount[]> {
  try {
    return await sageApi.getAccounts();
  } catch (error) {
    console.error("Error in getSageAccounts action:", error);
    throw new Error("Failed to fetch SAGE accounts");
  }
}

export async function getSageAccount(
  accountId: string
): Promise<SageAccount | null> {
  try {
    return await sageApi.getAccount(accountId);
  } catch (error) {
    console.error("Error in getSageAccount action:", error);
    throw new Error("Failed to fetch SAGE account");
  }
}

export async function getSageAccountBalance(
  accountId: string
): Promise<number> {
  try {
    return await sageApi.getAccountBalance(accountId);
  } catch (error) {
    console.error("Error in getSageAccountBalance action:", error);
    throw new Error("Failed to fetch SAGE account balance");
  }
}

// ================================
// TRANSACTION MANAGEMENT ACTIONS
// ================================

export async function getSageTransactions(
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
  limit: number = 100
): Promise<SageTransaction[]> {
  try {
    return await sageApi.getTransactions(accountId, startDate, endDate, limit);
  } catch (error) {
    console.error("Error in getSageTransactions action:", error);
    throw new Error("Failed to fetch SAGE transactions");
  }
}

export async function getSageTransaction(
  transactionId: string
): Promise<SageTransaction | null> {
  try {
    return await sageApi.getTransaction(transactionId);
  } catch (error) {
    console.error("Error in getSageTransaction action:", error);
    throw new Error("Failed to fetch SAGE transaction");
  }
}

// ================================
// JOURNAL MANAGEMENT ACTIONS
// ================================

export async function getSageJournals(
  startDate?: Date,
  endDate?: Date,
  limit: number = 50
): Promise<SageJournal[]> {
  try {
    return await sageApi.getJournals(startDate, endDate, limit);
  } catch (error) {
    console.error("Error in getSageJournals action:", error);
    throw new Error("Failed to fetch SAGE journals");
  }
}

// ================================
// CUSTOMER & SUPPLIER MANAGEMENT ACTIONS
// ================================

export async function getSageCustomers(): Promise<SageCustomer[]> {
  try {
    return await sageApi.getCustomers();
  } catch (error) {
    console.error("Error in getSageCustomers action:", error);
    throw new Error("Failed to fetch SAGE customers");
  }
}

export async function getSageSuppliers(): Promise<SageSupplier[]> {
  try {
    return await sageApi.getSuppliers();
  } catch (error) {
    console.error("Error in getSageSuppliers action:", error);
    throw new Error("Failed to fetch SAGE suppliers");
  }
}

// ================================
// FINANCIAL SUMMARIES ACTIONS
// ================================

export async function getSageFinancialSummary(): Promise<SageFinancialSummary> {
  try {
    return await sageApi.getFinancialSummary();
  } catch (error) {
    console.error("Error in getSageFinancialSummary action:", error);
    throw new Error("Failed to fetch SAGE financial summary");
  }
}

export async function getSageDashboardData(): Promise<SageDashboardData> {
  try {
    return await sageApi.getDashboardData();
  } catch (error) {
    console.error("Error in getSageDashboardData action:", error);
    throw new Error("Failed to fetch SAGE dashboard data");
  }
}

// ================================
// STUDENT-SPECIFIC FINANCIAL ACTIONS
// ================================

export async function getStudentFinancialSummary(studentId: string): Promise<{
  outstandingBalance: number;
  recentTransactions: SageTransaction[];
  paymentHistory: SageTransaction[];
}> {
  try {
    // Get student's customer record from SAGE
    const customers = await sageApi.getCustomers();
    const studentCustomer = customers.find(
      (c) => c.id === studentId || c.code === studentId
    );

    if (!studentCustomer) {
      return {
        outstandingBalance: 0,
        recentTransactions: [],
        paymentHistory: [],
      };
    }

    // Get student's transactions
    const allTransactions = await sageApi.getTransactions(
      undefined,
      undefined,
      undefined,
      1000
    );
    const studentTransactions = allTransactions.filter(
      (t) =>
        t.customerId === studentCustomer.id ||
        t.customerName === studentCustomer.name
    );

    // Calculate outstanding balance
    const outstandingBalance = studentCustomer.balance;

    // Get recent transactions (last 10)
    const recentTransactions = studentTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    // Get payment history (income transactions)
    const paymentHistory = studentTransactions
      .filter((t) => t.type === "credit" && t.status === "posted")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      outstandingBalance,
      recentTransactions,
      paymentHistory,
    };
  } catch (error) {
    console.error("Error in getStudentFinancialSummary action:", error);
    throw new Error("Failed to fetch student financial summary");
  }
}

export async function getStudentOutstandingInvoices(studentId: string): Promise<
  {
    customerName: string;
    amount: number;
    dueDate: Date;
    daysOverdue: number;
  }[]
> {
  try {
    const customers = await sageApi.getCustomers();
    const studentCustomer = customers.find(
      (c) => c.id === studentId || c.code === studentId
    );

    if (!studentCustomer) {
      return [];
    }

    // Get student's outstanding invoices (accounts receivable)
    const accounts = await sageApi.getAccounts();
    const accountsReceivable = accounts.find((a) =>
      a.name.toLowerCase().includes("receivable")
    );

    if (!accountsReceivable) {
      return [];
    }

    const transactions = await sageApi.getTransactions(accountsReceivable.id);
    const studentInvoices = transactions.filter(
      (t) =>
        (t.customerId === studentCustomer.id ||
          t.customerName === studentCustomer.name) &&
        t.type === "debit" &&
        t.status === "posted"
    );

    const today = new Date();
    return studentInvoices.map((invoice) => {
      const dueDate = new Date(invoice.date);
      const daysOverdue = Math.max(
        0,
        Math.floor(
          (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      );

      return {
        customerName: studentCustomer.name,
        amount: invoice.amount,
        dueDate,
        daysOverdue,
      };
    });
  } catch (error) {
    console.error("Error in getStudentOutstandingInvoices action:", error);
    throw new Error("Failed to fetch student outstanding invoices");
  }
}

// ================================
// INSTRUCTOR-SPECIFIC FINANCIAL ACTIONS
// ================================

export async function getInstructorFinancialSummary(
  instructorId: string
): Promise<{
  totalEarnings: number;
  recentPayments: SageTransaction[];
  paymentHistory: SageTransaction[];
}> {
  try {
    // Get instructor's supplier record from SAGE (for payments)
    const suppliers = await sageApi.getSuppliers();
    const instructorSupplier = suppliers.find(
      (s) => s.id === instructorId || s.code === instructorId
    );

    if (!instructorSupplier) {
      return {
        totalEarnings: 0,
        recentPayments: [],
        paymentHistory: [],
      };
    }

    // Get instructor's payment transactions
    const allTransactions = await sageApi.getTransactions(
      undefined,
      undefined,
      undefined,
      1000
    );
    const instructorTransactions = allTransactions.filter(
      (t) =>
        t.supplierId === instructorSupplier.id ||
        t.supplierName === instructorSupplier.name
    );

    // Calculate total earnings
    const totalEarnings = instructorTransactions
      .filter((t) => t.type === "credit" && t.status === "posted")
      .reduce((sum, t) => sum + t.amount, 0);

    // Get recent payments (last 10)
    const recentPayments = instructorTransactions
      .filter((t) => t.type === "credit" && t.status === "posted")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    // Get payment history
    const paymentHistory = instructorTransactions
      .filter((t) => t.type === "credit" && t.status === "posted")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      totalEarnings,
      recentPayments,
      paymentHistory,
    };
  } catch (error) {
    console.error("Error in getInstructorFinancialSummary action:", error);
    throw new Error("Failed to fetch instructor financial summary");
  }
}

// ================================
// ADMIN FINANCIAL OVERVIEW ACTIONS
// ================================

export async function getAdminFinancialOverview(): Promise<{
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  cashPosition: number;
  accountsReceivable: number;
  accountsPayable: number;
  recentTransactions: SageTransaction[];
  topCustomers: { name: string; balance: number }[];
  topSuppliers: { name: string; balance: number }[];
}> {
  try {
    const [
      financialSummary,
      recentTransactions,
      customers,
      suppliers,
    ] = await Promise.all([
      sageApi.getFinancialSummary(),
      sageApi.getTransactions(undefined, undefined, undefined, 20),
      sageApi.getCustomers(),
      sageApi.getSuppliers(),
    ]);

    // Calculate totals
    const totalRevenue = financialSummary.totalIncome;
    const totalExpenses = financialSummary.totalExpenses;
    const netProfit = financialSummary.netIncome;
    const cashPosition = financialSummary.cashBalance;
    const accountsReceivable = financialSummary.accountsReceivable;
    const accountsPayable = financialSummary.accountsPayable;

    // Get top customers by balance
    const topCustomers = customers
      .filter((c) => c.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 5)
      .map((c) => ({ name: c.name, balance: c.balance }));

    // Get top suppliers by balance
    const topSuppliers = suppliers
      .filter((s) => s.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 5)
      .map((s) => ({ name: s.name, balance: s.balance }));

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      cashPosition,
      accountsReceivable,
      accountsPayable,
      recentTransactions,
      topCustomers,
      topSuppliers,
    };
  } catch (error) {
    console.error("Error in getAdminFinancialOverview action:", error);
    throw new Error("Failed to fetch admin financial overview");
  }
}
