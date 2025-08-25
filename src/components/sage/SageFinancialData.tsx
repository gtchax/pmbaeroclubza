"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Building2,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  useSageFinancialSummary,
  useSageTransactions,
  useSageAccounts,
} from "@/lib/hooks/use-sage-data";
import { useSageAuth } from "@/lib/sage-auth";
import { formatCurrency } from "@/lib/utils";

interface SageFinancialDataProps {
  className?: string;
}

export function SageFinancialData({ className = "" }: SageFinancialDataProps) {
  const { isAuthenticated } = useSageAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: financialSummary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useSageFinancialSummary();
  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useSageTransactions();
  const {
    data: accounts,
    isLoading: accountsLoading,
    error: accountsError,
  } = useSageAccounts();

  if (!isAuthenticated) {
    return (
      <Card className={`border-0 bg-white shadow-lg ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-gray-500" />
            <span>Financial Data</span>
          </CardTitle>
          <CardDescription>
            Connect to SAGE to view financial information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>
              Connect to SAGE Business Cloud Accounting to view financial data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (summaryLoading || transactionsLoading || accountsLoading) {
    return (
      <Card className={`border-0 bg-white shadow-lg ${className}`}>
        <CardHeader>
          <CardTitle>Financial Data</CardTitle>
          <CardDescription>Loading financial information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#f6d57f]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (summaryError || transactionsError || accountsError) {
    return (
      <Card className={`border-0 bg-white shadow-lg ${className}`}>
        <CardHeader>
          <CardTitle>Financial Data</CardTitle>
          <CardDescription>Error loading financial information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p>Failed to load financial data. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatAmount = (amount: number) => {
    return formatCurrency(amount, "ZAR");
  };

  const getNetIncomeColor = (netIncome: number) => {
    return netIncome >= 0 ? "text-green-600" : "text-red-600";
  };

  const getNetIncomeIcon = (netIncome: number) => {
    return netIncome >= 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  return (
    <Card className={`border-0 bg-white shadow-lg ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-[#f6d57f]" />
              <span>Financial Overview</span>
            </CardTitle>
            <CardDescription>
              Real-time financial data from SAGE Business Cloud Accounting
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f]">
            Live Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Cash Balance
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-700 mt-2">
                  {formatAmount(financialSummary?.cashBalance || 0)}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Total Assets
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-700 mt-2">
                  {formatAmount(financialSummary?.totalAssets || 0)}
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Accounts Receivable
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-700 mt-2">
                  {formatAmount(financialSummary?.accountsReceivable || 0)}
                </p>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  (financialSummary?.netIncome || 0) >= 0
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getNetIncomeIcon(financialSummary?.netIncome || 0)}
                  <span className="text-sm font-medium text-gray-800">
                    Net Income
                  </span>
                </div>
                <p
                  className={`text-2xl font-bold mt-2 ${getNetIncomeColor(financialSummary?.netIncome || 0)}`}
                >
                  {formatAmount(financialSummary?.netIncome || 0)}
                </p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Income & Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Income</span>
                    <span className="font-semibold text-green-600">
                      {formatAmount(financialSummary?.totalIncome || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Expenses</span>
                    <span className="font-semibold text-red-600">
                      {formatAmount(financialSummary?.totalExpenses || 0)}
                    </span>
                  </div>
                  <Progress
                    value={
                      financialSummary?.totalIncome
                        ? (financialSummary.totalExpenses /
                            financialSummary.totalIncome) *
                          100
                        : 0
                    }
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Balance Sheet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Assets</span>
                    <span className="font-semibold text-blue-600">
                      {formatAmount(financialSummary?.totalAssets || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Liabilities</span>
                    <span className="font-semibold text-orange-600">
                      {formatAmount(financialSummary?.totalLiabilities || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Equity</span>
                    <span className="font-semibold text-green-600">
                      {formatAmount(financialSummary?.totalEquity || 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4">
            <div className="space-y-3">
              {accounts?.slice(0, 10).map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-500">
                      {account.code} • {account.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        account.type === "asset" || account.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatAmount(account.balance)}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {account.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="space-y-3">
              {transactions?.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.reference} •{" "}
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatAmount(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.accountName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
