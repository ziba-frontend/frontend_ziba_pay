//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DownloadCloud,
  Search,
  RefreshCw,
  ArrowDownUp,
  Eye,
  PieChart,
  BarChart,
  Calendar,
  Filter,
  CreditCard,
  BanknoteIcon,
  TrendingDown,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { 
  useGetOrdersByUserId, 
  useGetOrderByReference,
  useTrackEvent,
  useRefundOrder
} from "@/hooks/usePayment";
import { formatCurrency, formatDate, formatRelativeTime } from "@/utils/transaction";

type Transaction = {
  id: string;
  userId: string;
  transactionId: string;
  paymentMethodId: string | null;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  payment: {
    id: number;
    userId: string;
    amount: number;
    method: string;
    status: string;
    orderId: string;
    createdAt: string;
  } | null;
};

type TransactionDetailsProps = {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
};

type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
type ReportType = "all" | "revenue" | "refunds" | "payment-methods" | "currency";

// Status badge component
const TransactionStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    successful: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
    refunded: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const normalizedStatus = status.toLowerCase();
  const style =
    statusStyles[normalizedStatus as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Badge className={`${style} font-medium border px-2 py-1`}>
      {status}
    </Badge>
  );
};

// Payment Method badge component
const PaymentMethodBadge = ({ method }: { method: string }) => {
  const methodStyles = {
    card: "bg-purple-100 text-purple-800 border-purple-200",
    banktransfer: "bg-blue-100 text-blue-800 border-blue-200",
    mtnmomo: "bg-amber-100 text-amber-800 border-amber-200",
    crypto: "bg-teal-100 text-teal-800 border-teal-200",
  };

  const normalizedMethod = method.toLowerCase().replace(/\s+/g, '');
  const style =
    methodStyles[normalizedMethod as keyof typeof methodStyles] ||
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Badge className={`${style} font-medium border px-2 py-1`}>
      {method}
    </Badge>
  );
};

// Transaction details dialog component
const TransactionDetails = ({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailsProps) => {
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  
  const { mutate: refundTransaction, isLoading: isRefunding } = useRefundOrder();
  
  if (!transaction) return null;

  const handleRefund = () => {
    if (!refundReason || !refundAmount) {
      toast.error("Please provide both reason and amount for refund");
      return;
    }

    refundTransaction({
      reference: transaction.transactionId,
      Reason: refundReason,
      Amount: refundAmount
    }, {
      onSuccess: () => {
        toast.success("Refund initiated successfully");
        setShowRefundDialog(false);
        onClose();
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction Details</AlertDialogTitle>
          <AlertDialogDescription>
            Reference: {transaction.transactionId}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Amount</p>
            <p className="text-lg font-semibold">{formatCurrency(transaction.amount, transaction.currency)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <TransactionStatusBadge status={transaction.status} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Payment Method</p>
            <PaymentMethodBadge method={transaction.payment?.method || "Unknown"} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p>{formatDate(transaction.createdAt)}</p>
            <p className="text-xs text-gray-500">{formatRelativeTime(transaction.createdAt)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <p className="text-xs font-mono">{transaction.userId}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p>{transaction.description || "No description provided"}</p>
          </div>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          {transaction.status.toLowerCase() !== "refunded" && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowRefundDialog(true)}
            >
              <TrendingDown className="h-4 w-4" />
              Refund Transaction
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              toast.success("Transaction receipt downloaded");
            }}
          >
            <DownloadCloud className="h-4 w-4" />
            Download Receipt
          </Button>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
      
      {/* Refund Dialog */}
      <AlertDialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Refund Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide details for the refund.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Refund Amount</label>
              <Input
                type="text"
                placeholder={`Max: ${formatCurrency(transaction.amount, transaction.currency)}`}
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Refund</label>
              <Input
                type="text"
                placeholder="Customer request, product unavailable, etc."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleRefund();
              }}
              disabled={isRefunding}
            >
              {isRefunding ? "Processing..." : "Proceed with Refund"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
};

// Skeleton loader for reports table
const ReportsTableSkeleton = () => {
  return (
    <div className="w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center space-x-4 py-4 border-b"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Reports component
const Reports = () => {
  // State management
  const [activeTab, setActiveTab] = useState<ReportType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("all");
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>("monthly");
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  
  // Fetch orders data
  const {
    data: ordersResponse,
    isLoading,
    refetch,
  } = useGetOrdersByUserId();

  const transactions: Transaction[] = ordersResponse || [];
  
  // Filter transactions based on date range
  const filterTransactionsByDate = () => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Include the entire end day
      
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  // Filter transactions
  const filterTransactions = () => {
    const dateRangeFiltered = filterTransactionsByDate();
    
    return dateRangeFiltered.filter((transaction) => {
      // Apply search query filter
      const matchesSearch =
        searchQuery === "" ||
        transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.userId.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply tab filter
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "revenue" && transaction.status.toLowerCase() === "completed") ||
        (activeTab === "refunds" && transaction.status.toLowerCase() === "refunded") ||
        (activeTab === "payment-methods" && true) ||
        (activeTab === "currency" && true);

      // Apply payment method filter
      const matchesMethod =
        selectedMethod === "all" || 
        (transaction.payment?.method?.toLowerCase() === selectedMethod.toLowerCase());

      // Apply status filter
      const matchesStatus =
        selectedStatus === "all" || transaction.status.toLowerCase() === selectedStatus.toLowerCase();
        
      // Apply currency filter
      const matchesCurrency =
        selectedCurrency === "all" || transaction.currency.toLowerCase() === selectedCurrency.toLowerCase();

      return matchesSearch && matchesTab && matchesMethod && matchesStatus && matchesCurrency;
    });
  };

  const filteredTransactions = filterTransactions();

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Calculate summary statistics
  const calculateSummary = () => {
    const dateRangeFiltered = filterTransactionsByDate();
    
    // Total revenue (successful transactions)
    const successfulTransactions = dateRangeFiltered.filter(t => t.status.toLowerCase() === "completed");
    const totalRevenue = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Total refunds
    const refundedTransactions = dateRangeFiltered.filter(t => t.status.toLowerCase() === "refunded");
    const totalRefunds = refundedTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Transaction count by payment method
    const paymentMethodCounts: Record<string, number> = {};
    dateRangeFiltered.forEach(t => {
      const method = t.payment?.method?.toLowerCase() || "unknown";
      paymentMethodCounts[method] = (paymentMethodCounts[method] || 0) + 1;
    });
    
    // Transaction count by currency
    const currencyCounts: Record<string, number> = {};
    dateRangeFiltered.forEach(t => {
      const currency = t.currency;
      currencyCounts[currency] = (currencyCounts[currency] || 0) + 1;
    });
    
    // Transaction success rate
    const totalTransactions = dateRangeFiltered.length;
    const successRate = totalTransactions > 0 
      ? (successfulTransactions.length / totalTransactions) * 100 
      : 0;
    
    return {
      totalRevenue,
      totalRefunds,
      netRevenue: totalRevenue - totalRefunds,
      totalTransactions,
      successfulTransactions: successfulTransactions.length,
      refundedTransactions: refundedTransactions.length,
      successRate,
      paymentMethodCounts,
      currencyCounts,
      mainCurrency: Object.entries(currencyCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "USD"
    };
  };

  const summary = calculateSummary();

  // Event handlers
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedMethod("all");
    setSelectedStatus("all");
    setSelectedCurrency("all");
    setSortOrder("desc");
    setDateRange({
      start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    });
  };

  // Helper functions
  const getUniquePaymentMethods = () => {
    const methods = transactions
      .map((t) => t?.payment?.method)
      .filter(Boolean); // Remove undefined/null values
    return Array.from(new Set(methods));
  };

  const getUniqueStatuses = () => {
    const statuses = transactions.map((t) => t.status);
    return Array.from(new Set(statuses));
  };
  
  const getUniqueCurrencies = () => {
    const currencies = transactions.map((t) => t.currency);
    return Array.from(new Set(currencies));
  };

  // Function to generate period label based on selected report period
  const getReportPeriodLabel = () => {
    switch (reportPeriod) {
      case "daily":
        return "Daily Report";
      case "weekly":
        return "Weekly Report";
      case "monthly":
        return "Monthly Report";
      case "quarterly":
        return "Quarterly Report";
      case "yearly":
        return "Annual Report";
      default:
        return "Custom Period";
    }
  };

  // Handle export reports
  const handleExportReport = () => {
    toast.success(`${getReportPeriodLabel()} exported successfully`);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(summary.totalRevenue, summary.mainCurrency)}
                </p>
                <p className="text-xs text-gray-500">
                  {summary.successfulTransactions} successful transactions
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Refunds Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Refunds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(summary.totalRefunds, summary.mainCurrency)}
                </p>
                <p className="text-xs text-gray-500">
                  {summary.refundedTransactions} refunded transactions
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Revenue Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Net Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(summary.netRevenue, summary.mainCurrency)}
                </p>
                <p className="text-xs text-gray-500">
                  {summary.totalTransactions} total transactions
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Rate Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {summary.successRate.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">
                  {summary.successfulTransactions} of {summary.totalTransactions} transactions
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Period and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ReportType)}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap md:flex-row gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              <Select 
                value={reportPeriod} 
                onValueChange={(value) => setReportPeriod(value as ReportPeriod)}
              >
                <SelectTrigger className="w-full md:w-36">
                  <SelectValue placeholder="Report Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full md:w-auto"
                />
                <span>to</span>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full md:w-auto"
                />
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleExportReport}
            >
              <DownloadCloud className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-9 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select
              value={selectedMethod}
              onValueChange={setSelectedMethod}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                {getUniquePaymentMethods().map((method) => (
                  <SelectItem
                    key={method}
                    value={method.toLowerCase()}
                  >
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {getUniqueStatuses().map((status) => (
                  <SelectItem
                    key={status}
                    value={status.toLowerCase()}
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                {getUniqueCurrencies().map((currency) => (
                  <SelectItem
                    key={currency}
                    value={currency.toLowerCase()}
                  >
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSortToggle}
              title="Toggle sort order"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              title="Reset filters"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="pb-1">
          <CardTitle>{getReportPeriodLabel()}</CardTitle>
          <CardDescription>
            Showing {sortedTransactions.length} of {transactions.length} transactions
            from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <ReportsTableSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-xs">
                          {transaction.transactionId}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {transaction.userId.substring(0, 12)}...
                        </TableCell>
                        <TableCell>
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </TableCell>
                        <TableCell>
                          <TransactionStatusBadge status={transaction.status} />
                        </TableCell>
                        <TableCell>
                          <PaymentMethodBadge method={transaction.payment?.method || "Unknown"} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>
                              {formatDate(transaction.createdAt, "short")}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(transaction.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(transaction)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">View details</span>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        No transactions found for the selected period
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Transaction Details Dialog */}
      <TransactionDetails
        transaction={selectedTransaction}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Reports;