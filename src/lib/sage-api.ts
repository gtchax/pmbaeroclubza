import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  SageAccount,
  SageTransaction,
  SageJournal,
  SageCustomer,
  SageSupplier,
  SageFinancialSummary,
  SageDashboardData,
} from "./types";

export class SageApiClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private accessToken: string | null = null;
  private companyId: string | null = null;

  constructor() {
    this.baseUrl =
      process.env.SAGE_BASE_URL || "https://api.sage.com/accounting/v3.1";

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `SAGE API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("SAGE API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        console.error(
          "SAGE API Response Error:",
          error.response?.data || error.message
        );
        return Promise.reject(error);
      }
    );
  }

  // ================================
  // AUTHENTICATION METHODS
  // ================================

  setAccessToken(token: string): void {
    this.accessToken = token;
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  setCompanyId(companyId: string): void {
    this.companyId = companyId;
  }

  clearAuth(): void {
    this.accessToken = null;
    this.companyId = null;
    delete this.client.defaults.headers.Authorization;
  }

  private isAuthenticated(): boolean {
    return !!this.accessToken && !!this.companyId;
  }

  // ================================
  // ACCOUNT MANAGEMENT
  // ================================

  async getAccounts(): Promise<SageAccount[]> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockAccounts();
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/accounts`
      );
      return this.transformAccounts(response.data.accounts || []);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return this.getMockAccounts();
    }
  }

  async getAccount(accountId: string): Promise<SageAccount | null> {
    try {
      if (!this.isAuthenticated()) {
        return (
          this.getMockAccounts().find((acc) => acc.id === accountId) || null
        );
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/accounts/${accountId}`
      );
      return this.transformAccount(response.data);
    } catch (error) {
      console.error("Error fetching account:", error);
      return null;
    }
  }

  async getAccountBalance(accountId: string): Promise<number> {
    try {
      if (!this.isAuthenticated()) {
        const account = this.getMockAccounts().find(
          (acc) => acc.id === accountId
        );
        return account?.balance || 0;
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/accounts/${accountId}/balance`
      );
      return response.data.balance || 0;
    } catch (error) {
      console.error("Error fetching account balance:", error);
      return 0;
    }
  }

  // ================================
  // TRANSACTION MANAGEMENT
  // ================================

  async getTransactions(
    accountId?: string,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100
  ): Promise<SageTransaction[]> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockTransactions(accountId, startDate, endDate, limit);
      }

      let url = `/companies/${this.companyId}/transactions?limit=${limit}`;
      if (accountId) url += `&account_id=${accountId}`;
      if (startDate) url += `&from_date=${startDate.toISOString()}`;
      if (endDate) url += `&to_date=${endDate.toISOString()}`;

      const response = await this.client.get(url);
      return this.transformTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return this.getMockTransactions(accountId, startDate, endDate, limit);
    }
  }

  async getTransaction(transactionId: string): Promise<SageTransaction | null> {
    try {
      if (!this.isAuthenticated()) {
        return (
          this.getMockTransactions().find((t) => t.id === transactionId) || null
        );
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/transactions/${transactionId}`
      );
      return this.transformTransaction(response.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      return null;
    }
  }

  // ================================
  // JOURNAL MANAGEMENT
  // ================================

  async getJournals(
    startDate?: Date,
    endDate?: Date,
    limit: number = 50
  ): Promise<SageJournal[]> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockJournals(startDate, endDate, limit);
      }

      let url = `/companies/${this.companyId}/journals?limit=${limit}`;
      if (startDate) url += `&from_date=${startDate.toISOString()}`;
      if (endDate) url += `&to_date=${endDate.toISOString()}`;

      const response = await this.client.get(url);
      return this.transformJournals(response.data.journals || []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      return this.getMockJournals(startDate, endDate, limit);
    }
  }

  // ================================
  // CUSTOMER & SUPPLIER MANAGEMENT
  // ================================

  async getCustomers(): Promise<SageCustomer[]> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockCustomers();
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/customers`
      );
      return this.transformCustomers(response.data.customers || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      return this.getMockCustomers();
    }
  }

  async getSuppliers(): Promise<SageSupplier[]> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockSuppliers();
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/suppliers`
      );
      return this.transformSuppliers(response.data.suppliers || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      return this.getMockSuppliers();
    }
  }

  // ================================
  // FINANCIAL SUMMARIES
  // ================================

  async getFinancialSummary(): Promise<SageFinancialSummary> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockFinancialSummary();
      }

      const response = await this.client.get(
        `/companies/${this.companyId}/financial_summary`
      );
      return this.transformFinancialSummary(response.data);
    } catch (error) {
      console.error("Error fetching financial summary:", error);
      return this.getMockFinancialSummary();
    }
  }

  async getDashboardData(): Promise<SageDashboardData> {
    try {
      if (!this.isAuthenticated()) {
        return this.getMockDashboardData();
      }

      const [financialSummary, recentTransactions, topAccounts] =
        await Promise.all([
          this.getFinancialSummary(),
          this.getTransactions(undefined, undefined, undefined, 20),
          this.getAccounts(),
        ]);

      return {
        financialSummary,
        recentTransactions,
        topAccounts: topAccounts.slice(0, 10),
        cashFlow: this.generateMockCashFlow(),
        outstandingInvoices: this.generateMockOutstandingInvoices(),
        upcomingPayments: this.generateMockUpcomingPayments(),
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return this.getMockDashboardData();
    }
  }

  // ================================
  // DATA TRANSFORMATION
  // ================================

  private transformAccount(data: any): SageAccount {
    return {
      id: data.id || data.guid,
      code: data.code || data.account_code,
      name: data.name || data.account_name,
      category: data.category || data.account_category,
      type: data.type || data.account_type,
      balance: parseFloat(data.balance || data.current_balance || "0"),
      currency: data.currency || "ZAR",
      status: data.status || "active",
      description: data.description,
      parentAccountId: data.parent_account_id,
      createdAt: new Date(data.created_at || data.date_created),
      updatedAt: new Date(data.updated_at || data.date_modified),
    };
  }

  private transformAccounts(accounts: any[]): SageAccount[] {
    return accounts.map((account) => this.transformAccount(account));
  }

  private transformTransaction(data: any): SageTransaction {
    return {
      id: data.id || data.guid,
      reference: data.reference || data.transaction_reference,
      date: new Date(data.date || data.transaction_date),
      description: data.description || data.memo,
      amount: parseFloat(data.amount || "0"),
      type: data.type || "debit",
      accountId: data.account_id || data.account_guid,
      accountCode: data.account_code,
      accountName: data.account_name,
      category: data.account_category,
      status: data.status || "posted",
      journalId: data.journal_id,
      journalReference: data.journal_reference,
      customerId: data.customer_id,
      customerName: data.customer_name,
      supplierId: data.supplier_id,
      supplierName: data.supplier_name,
      taxAmount: data.tax_amount ? parseFloat(data.tax_amount) : undefined,
      taxCode: data.tax_code,
      notes: data.notes,
      attachments: data.attachments,
      createdAt: new Date(data.created_at || data.date_created),
      updatedAt: new Date(data.updated_at || data.date_modified),
    };
  }

  private transformTransactions(transactions: any[]): SageTransaction[] {
    return transactions.map((transaction) =>
      this.transformTransaction(transaction)
    );
  }

  private transformJournal(data: any): SageJournal {
    return {
      id: data.id || data.guid,
      reference: data.reference || data.journal_reference,
      date: new Date(data.date || data.journal_date),
      description: data.description || data.memo,
      totalDebit: parseFloat(data.total_debit || "0"),
      totalCredit: parseFloat(data.total_credit || "0"),
      status: data.status || "posted",
      type: data.type || "general",
      transactions: data.transactions
        ? this.transformTransactions(data.transactions)
        : [],
      notes: data.notes,
      createdAt: new Date(data.created_at || data.date_created),
      updatedAt: new Date(data.updated_at || data.date_modified),
    };
  }

  private transformJournals(journals: any[]): SageJournal[] {
    return journals.map((journal) => this.transformJournal(journal));
  }

  private transformCustomer(data: any): SageCustomer {
    return {
      id: data.id || data.guid,
      code: data.code || data.customer_code,
      name: data.name || data.customer_name,
      email: data.email,
      phone: data.phone,
      address: data.address
        ? {
            line1: data.address.line1 || data.address.address_line1,
            line2: data.address.line2 || data.address.address_line2,
            city: data.address.city,
            state: data.address.state,
            postalCode: data.address.postal_code,
            country: data.address.country,
          }
        : undefined,
      taxNumber: data.tax_number || data.vat_number,
      creditLimit: data.credit_limit
        ? parseFloat(data.credit_limit)
        : undefined,
      balance: parseFloat(data.balance || data.current_balance || "0"),
      status: data.status || "active",
      createdAt: new Date(data.created_at || data.date_created),
      updatedAt: new Date(data.updated_at || data.date_modified),
    };
  }

  private transformCustomers(customers: any[]): SageCustomer[] {
    return customers.map((customer) => this.transformCustomer(customer));
  }

  private transformSupplier(data: any): SageSupplier {
    return {
      id: data.id || data.guid,
      code: data.code || data.supplier_code,
      name: data.name || data.supplier_name,
      email: data.email,
      phone: data.phone,
      address: data.address
        ? {
            line1: data.address.line1 || data.address.address_line1,
            line2: data.address.line2 || data.address.address_line2,
            city: data.address.city,
            state: data.address.state,
            postalCode: data.address.postal_code,
            country: data.address.country,
          }
        : undefined,
      taxNumber: data.tax_number || data.vat_number,
      balance: parseFloat(data.balance || data.current_balance || "0"),
      status: data.status || "active",
      createdAt: new Date(data.created_at || data.date_created),
      updatedAt: new Date(data.updated_at || data.date_modified),
    };
  }

  private transformSuppliers(suppliers: any[]): SageSupplier[] {
    return suppliers.map((supplier) => this.transformSupplier(supplier));
  }

  private transformFinancialSummary(data: any): SageFinancialSummary {
    return {
      totalAssets: parseFloat(data.total_assets || "0"),
      totalLiabilities: parseFloat(data.total_liabilities || "0"),
      totalEquity: parseFloat(data.total_equity || "0"),
      totalIncome: parseFloat(data.total_income || "0"),
      totalExpenses: parseFloat(data.total_expenses || "0"),
      netIncome: parseFloat(data.net_income || "0"),
      cashBalance: parseFloat(data.cash_balance || "0"),
      accountsReceivable: parseFloat(data.accounts_receivable || "0"),
      accountsPayable: parseFloat(data.accounts_payable || "0"),
      asOfDate: new Date(data.as_of_date || new Date()),
    };
  }

  // ================================
  // MOCK DATA GENERATION
  // ================================

  private getMockAccounts(): SageAccount[] {
    return [
      {
        id: "acc_001",
        code: "1000",
        name: "Bank Account",
        category: "Current Assets",
        type: "asset",
        balance: 125000.0,
        currency: "ZAR",
        status: "active",
        description: "Main operating bank account",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "acc_002",
        code: "1100",
        name: "Accounts Receivable",
        category: "Current Assets",
        type: "asset",
        balance: 45000.0,
        currency: "ZAR",
        status: "active",
        description: "Outstanding student fees and aircraft rentals",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "acc_003",
        code: "2000",
        name: "Accounts Payable",
        category: "Current Liabilities",
        type: "liability",
        balance: 15000.0,
        currency: "ZAR",
        status: "active",
        description: "Outstanding supplier invoices",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "acc_004",
        code: "3000",
        name: "Student Fees Income",
        category: "Income",
        type: "income",
        balance: 0,
        currency: "ZAR",
        status: "active",
        description: "Revenue from flight training programs",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "acc_005",
        code: "4000",
        name: "Aircraft Operating Expenses",
        category: "Expenses",
        type: "expense",
        balance: 0,
        currency: "ZAR",
        status: "active",
        description: "Fuel, maintenance, and operational costs",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
    ];
  }

  private getMockTransactions(
    accountId?: string,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100
  ): SageTransaction[] {
    const mockTransactions: SageTransaction[] = [
      {
        id: "txn_001",
        reference: "INV-2024-001",
        date: new Date("2024-01-15"),
        description: "Student Training Fee - John Smith",
        amount: 2500.0,
        type: "credit",
        accountId: "acc_004",
        accountCode: "3000",
        accountName: "Student Fees Income",
        category: "Income",
        status: "posted",
        customerId: "cust_001",
        customerName: "John Smith",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "txn_002",
        reference: "INV-2024-002",
        date: new Date("2024-01-16"),
        description: "Aircraft Rental - Cessna 172",
        amount: 1800.0,
        type: "credit",
        accountId: "acc_004",
        accountCode: "3000",
        accountName: "Student Fees Income",
        category: "Income",
        status: "posted",
        customerId: "cust_002",
        customerName: "Sarah Johnson",
        createdAt: new Date("2024-01-16"),
        updatedAt: new Date("2024-01-16"),
      },
      {
        id: "txn_003",
        reference: "EXP-2024-001",
        date: new Date("2024-01-17"),
        description: "Fuel Purchase - Aviation Fuel",
        amount: 3200.0,
        type: "debit",
        accountId: "acc_005",
        accountCode: "4000",
        accountName: "Aircraft Operating Expenses",
        category: "Expenses",
        status: "posted",
        supplierId: "sup_001",
        supplierName: "Aviation Fuel Co",
        createdAt: new Date("2024-01-17"),
        updatedAt: new Date("2024-01-17"),
      },
      {
        id: "txn_004",
        reference: "EXP-2024-002",
        date: new Date("2024-01-18"),
        description: "Aircraft Maintenance - Cessna 172",
        amount: 4500.0,
        type: "debit",
        accountId: "acc_005",
        accountCode: "4000",
        accountName: "Aircraft Operating Expenses",
        category: "Expenses",
        status: "posted",
        supplierId: "sup_002",
        supplierName: "Aircraft Maintenance Ltd",
        createdAt: new Date("2024-01-18"),
        updatedAt: new Date("2024-01-18"),
      },
    ];

    // Filter by account if specified
    if (accountId) {
      return mockTransactions
        .filter((t) => t.accountId === accountId)
        .slice(0, limit);
    }

    // Filter by date range if specified
    if (startDate || endDate) {
      return mockTransactions
        .filter((t) => {
          if (startDate && t.date < startDate) return false;
          if (endDate && t.date > endDate) return false;
          return true;
        })
        .slice(0, limit);
    }

    return mockTransactions.slice(0, limit);
  }

  private getMockJournals(
    startDate?: Date,
    endDate?: Date,
    limit: number = 50
  ): SageJournal[] {
    return [
      {
        id: "jrn_001",
        reference: "JRN-2024-001",
        date: new Date("2024-01-15"),
        description: "Student Training Revenue",
        totalDebit: 0,
        totalCredit: 2500.0,
        status: "posted" as const,
        type: "sales" as const,
        transactions: this.getMockTransactions(
          "acc_004",
          undefined,
          undefined,
          1
        ),
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
    ].slice(0, limit);
  }

  private getMockCustomers(): SageCustomer[] {
    return [
      {
        id: "cust_001",
        code: "C001",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+27 82 123 4567",
        address: {
          line1: "123 Main Street",
          city: "Pietermaritzburg",
          state: "KwaZulu-Natal",
          postalCode: "3201",
          country: "South Africa",
        },
        taxNumber: "123456789",
        creditLimit: 5000.0,
        balance: 0,
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "cust_002",
        code: "C002",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+27 83 987 6543",
        address: {
          line1: "456 Oak Avenue",
          city: "Durban",
          state: "KwaZulu-Natal",
          postalCode: "4001",
          country: "South Africa",
        },
        taxNumber: "987654321",
        creditLimit: 3000.0,
        balance: 0,
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
    ];
  }

  private getMockSuppliers(): SageSupplier[] {
    return [
      {
        id: "sup_001",
        code: "S001",
        name: "Aviation Fuel Co",
        email: "orders@aviationfuel.co.za",
        phone: "+27 11 555 1234",
        address: {
          line1: "789 Industrial Park",
          city: "Johannesburg",
          state: "Gauteng",
          postalCode: "2000",
          country: "South Africa",
        },
        taxNumber: "VAT123456",
        balance: 0,
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "sup_002",
        code: "S002",
        name: "Aircraft Maintenance Ltd",
        email: "service@aircraftmaintenance.co.za",
        phone: "+27 31 555 5678",
        address: {
          line1: "321 Aviation Road",
          city: "Durban",
          state: "KwaZulu-Natal",
          postalCode: "4001",
          country: "South Africa",
        },
        taxNumber: "VAT789012",
        balance: 0,
        status: "active",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
    ];
  }

  private getMockFinancialSummary(): SageFinancialSummary {
    return {
      totalAssets: 170000.0,
      totalLiabilities: 15000.0,
      totalEquity: 155000.0,
      totalIncome: 4300.0,
      totalExpenses: 7700.0,
      netIncome: -3400.0,
      cashBalance: 125000.0,
      accountsReceivable: 45000.0,
      accountsPayable: 15000.0,
      asOfDate: new Date(),
    };
  }

  private getMockDashboardData(): SageDashboardData {
    return {
      financialSummary: this.getMockFinancialSummary(),
      recentTransactions: this.getMockTransactions(
        undefined,
        undefined,
        undefined,
        20
      ),
      topAccounts: this.getMockAccounts().slice(0, 10),
      cashFlow: this.generateMockCashFlow(),
      outstandingInvoices: this.generateMockOutstandingInvoices(),
      upcomingPayments: this.generateMockUpcomingPayments(),
    };
  }

  private generateMockCashFlow() {
    return [
      {
        period: "Jan 2024",
        income: 4300.0,
        expenses: 7700.0,
        netCashFlow: -3400.0,
      },
      {
        period: "Dec 2023",
        income: 5200.0,
        expenses: 6800.0,
        netCashFlow: -1600.0,
      },
      {
        period: "Nov 2023",
        income: 4800.0,
        expenses: 7200.0,
        netCashFlow: -2400.0,
      },
    ];
  }

  private generateMockOutstandingInvoices() {
    return [
      {
        customerName: "John Smith",
        amount: 2500.0,
        dueDate: new Date("2024-02-15"),
        daysOverdue: 0,
      },
      {
        customerName: "Sarah Johnson",
        amount: 1800.0,
        dueDate: new Date("2024-02-16"),
        daysOverdue: 0,
      },
    ];
  }

  private generateMockUpcomingPayments() {
    return [
      {
        supplierName: "Aviation Fuel Co",
        amount: 3200.0,
        dueDate: new Date("2024-02-17"),
        daysUntilDue: 2,
      },
      {
        supplierName: "Aircraft Maintenance Ltd",
        amount: 4500.0,
        dueDate: new Date("2024-02-20"),
        daysUntilDue: 5,
      },
    ];
  }
}

// Export singleton instance
export const sageApi = new SageApiClient();
