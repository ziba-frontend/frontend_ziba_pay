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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Building,
  Wallet,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import {
  useGetOrdersByUserId,
  useGetTransactionStatus,
  useGetOrderFee,
  useInitiateMtnPayment,
  useCreateOrder,
} from "@/hooks/usePayment";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import { formatCurrency, formatDate, formatRelativeTime } from "@/utils/transaction";

// Payment Method Component
const PaymentMethodIcon = ({ method }) => {
  if (!method) return <Wallet className="h-4 w-4 text-slate-500" />;
  
  const methodLower = method.toLowerCase();
  
  if (methodLower.includes("card")) {
    return <CreditCard className="h-4 w-4 text-slate-500" />;
  } else if (methodLower.includes("bank") || methodLower.includes("transfer")) {
    return <Building className="h-4 w-4 text-slate-500" />;
  } else if (methodLower.includes("mtn") || methodLower.includes("momo")) {
    return <Wallet className="h-4 w-4 text-slate-500" />;
  } else {
    return <Wallet className="h-4 w-4 text-slate-500" />;
  }
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    successful: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    refunded: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const style =
    statusStyles[status?.toLowerCase()] ||
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Badge className={`${style} font-medium border px-2 py-1`}>
      {status || "Unknown"}
    </Badge>
  );
};

// Payment Gateway Summary Component
const PaymentGatewaySummary = () => {
  // State for filters and selections
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("7days");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("all");

  // Fetch payment data
  const { 
    data: ordersResponse, 
    isLoading: isLoadingOrders,
    refetch: refetchOrders
  } = useGetOrdersByUserId();
  
  const { mutate: getOrderFee } = useGetOrderFee();

  const orders = ordersResponse || [];

  // Calculate metrics
  const calculateMetrics = () => {
    if (!orders.length) return {
      totalAmount: 0,
      successAmount: 0,
      pendingAmount: 0,
      failedAmount: 0,
      totalCount: 0,
      successCount: 0,
      pendingCount: 0,
      failedCount: 0,
      recentOrders: [],
      paymentMethods: {},
      currencies: {}
    };

    // Filter orders based on date range
    const now = new Date();
    const filteredByDate = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
      
      if (dateRange === "7days") return diffDays <= 7;
      if (dateRange === "30days") return diffDays <= 30;
      if (dateRange === "90days") return diffDays <= 90;
      return true; // All time
    });

    // Calculate totals
    const totalAmount = filteredByDate.reduce((sum, order) => sum + (order.amount || 0), 0);
    const successAmount = filteredByDate
      .filter(o => o.status?.toLowerCase() === "successful")
      .reduce((sum, order) => sum + (order.amount || 0), 0);
    const pendingAmount = filteredByDate
      .filter(o => o.status?.toLowerCase() === "pending")
      .reduce((sum, order) => sum + (order.amount || 0), 0);
    const failedAmount = filteredByDate
      .filter(o => o.status?.toLowerCase() === "failed")
      .reduce((sum, order) => sum + (order.amount || 0), 0);

    // Count transactions
    const totalCount = filteredByDate.length;
    const successCount = filteredByDate.filter(o => o.status?.toLowerCase() === "successful").length;
    const pendingCount = filteredByDate.filter(o => o.status?.toLowerCase() === "pending").length;
    const failedCount = filteredByDate.filter(o => o.status?.toLowerCase() === "failed").length;

    // Get recent orders
    const recentOrders = [...filteredByDate]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Calculate payment method distribution
    const paymentMethods = filteredByDate.reduce((acc, order) => {
      const method = order.paymentMethod || "Unknown";
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    // Calculate currency distribution
    const currencies = filteredByDate.reduce((acc, order) => {
      const currency = order.currency || "Unknown";
      acc[currency] = (acc[currency] || 0) + (order.amount || 0);
      return acc;
    }, {});

    return {
      totalAmount,
      successAmount,
      pendingAmount,
      failedAmount,
      totalCount,
      successCount,
      pendingCount,
      failedCount,
      recentOrders,
      paymentMethods,
      currencies
    };
  };

  const metrics = calculateMetrics();

  // Filter transactions for the transactions tab
  const filteredTransactions = orders.filter(order => {
    // Filter by search query
    const searchMatch = !searchQuery || 
      order.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customer?.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by payment method
    const methodMatch = paymentMethod === "all" || 
      (order.paymentMethod || "").toLowerCase() === paymentMethod.toLowerCase();
    
    return searchMatch && methodMatch;
  });
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calculate success rate
  const successRate = metrics.totalCount > 0 
    ? ((metrics.successCount / metrics.totalCount) * 100).toFixed(1) 
    : "0.0";

  // Get payment methods for filter dropdown
  const getUniqueMethods = () => {
    const methods = orders
      .filter(o => o?.payment?.method)
      .map(o => o?.payment?.method);
    return Array.from(new Set(methods));
  };

  // Transaction list skeleton
  const TransactionsSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex justify-between items-center p-4 border-b">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );

  // Handle refresh
  const handleRefresh = () => {
    refetchOrders();
    toast.success("Payment data refreshed");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment Gateway</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Date Range Filter */}
          <div className="flex justify-end">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Volume */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.totalAmount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {metrics.totalCount} transactions
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Successful */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Successful
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.successAmount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="text-green-600">{successRate}%</span> success rate
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <ArrowUpRight className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.pendingAmount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {metrics.pendingCount} transactions
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Failed */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Failed
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(metrics.failedAmount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {metrics.failedCount} transactions
                      </p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Distribution of payment methods used
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : Object.keys(metrics.paymentMethods).length === 0 ? (
                  <p className="text-center py-6 text-gray-500">No payment methods data available</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(metrics.paymentMethods).map(([method, count]) => (
                      <div key={method} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PaymentMethodIcon method={method} />
                          <span>{method}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{
                                width: `${(count / metrics.totalCount) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {((count / metrics.totalCount) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your most recent payment activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <TransactionsSkeleton />
                ) : metrics.recentOrders.length === 0 ? (
                  <p className="text-center py-6 text-gray-500">No recent transactions</p>
                ) : (
                  <div className="space-y-4">
                    {metrics.recentOrders.map((order) => (
                      <div
                        key={order.reference}
                        className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-medium">{order.description || "Payment"}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <PaymentMethodIcon method={order.paymentMethod} />
                            <span>{formatRelativeTime(order.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="font-medium">
                            {formatCurrency(order.amount, order.currency)}
                          </p>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by reference, description or email..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                {getUniqueMethods().map((method) => (
                  <SelectItem key={method} value={method.toLowerCase()}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                Showing {sortedTransactions.length} of {orders.length} transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex justify-between items-center p-4 border-b">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-20" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedTransactions.length > 0 ? (
                        sortedTransactions.map((transaction) => (
                          <TableRow key={transaction.reference}>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {transaction.description || "Payment"}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                  {transaction.reference}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(
                                transaction.amount,
                                transaction.currency
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{formatDate(transaction.createdAt)}</span>
                                <span className="text-xs text-gray-500">
                                  {formatRelativeTime(transaction.createdAt)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <PaymentMethodIcon method={transaction.paymentMethod} />
                                <span>{transaction.paymentMethod || "Unknown"}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={transaction.status} />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No transactions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentGatewaySummary;