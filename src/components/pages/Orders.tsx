"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  CreditCard,
  Building,
  Download,
  Search,
  RefreshCw,
  ShoppingBag,
  ArrowDownUp,
  Eye,
  ReceiptText,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";
import { formatCurrency, formatDate, formatRelativeTime } from "@/utils/transaction";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useGetOrdersByUserId, 
  useVerifyOrder, 
  useRefundOrder,
  useGetOrderByReference
} from "@/hooks/usePayment";
import { toast } from "react-hot-toast";

// Type definitions
type Order = {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  customer: {
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    country: string;
  };
  items?: any[];
};

type OrderDetailsProps = {
  orderReference: string | null;
  isOpen: boolean;
  onClose: () => void;
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    successful: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    refunded: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const style =
    statusStyles[status.toLowerCase() as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Badge className={`${style} font-medium border px-2 py-1`}>
      {status}
    </Badge>
  );
};

// Payment method icon component
const PaymentMethodIcon = ({ method }: { method: string }) => {
  return method.toLowerCase().includes("card") ? (
    <CreditCard className="h-4 w-4 text-slate-500" />
  ) : (
    <Building className="h-4 w-4 text-slate-500" />
  );
};

// Order details dialog component
const OrderDetails = ({
  orderReference,
  isOpen,
  onClose,
}: OrderDetailsProps) => {
  const { data: orderData, isLoading, error } = useGetOrderByReference(orderReference || "");
  const { mutate: verifyOrder, isLoading: isVerifying } = useVerifyOrder();
  const { mutate: refundOrder, isLoading: isRefunding } = useRefundOrder();
  const [refundReason, setRefundReason] = useState<string>("");
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState<boolean>(false);

  if (!orderReference) return null;
  
  const order = orderData?.data;

  const handleVerify = () => {
    verifyOrder(orderReference, {
      onSuccess: (data) => {
        toast.success("Order verified successfully");
      }
    });
  };

  const handleRefund = () => {
    if (!refundReason) {
      toast.error("Please provide a reason for refund");
      return;
    }

    refundOrder({
      reference: orderReference,
      Reason: refundReason,
      Amount: order?.amount.toString() || "0"
    }, {
      onSuccess: (data) => {
        toast.success("Order refunded successfully");
        setIsRefundDialogOpen(false);
      }
    });
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Order Details</AlertDialogTitle>
          <AlertDialogDescription>
            Reference: {orderReference}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        ) : error ? (
          <div className="py-4 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p>Failed to load order details</p>
            </div>
          </div>
        ) : order ? (
          <>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(order.amount, order.currency)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p>{formatDate(order.createdAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <StatusBadge status={order.status} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Payment Method
                </p>
                <div className="flex items-center gap-2">
                  <PaymentMethodIcon method={order.paymentMethod || "Unknown"} />
                  <span>{order.paymentMethod || "Unknown"}</span>
                </div>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p>{order.description || "No description provided"}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Customer
                </p>
                <p>{`${order.customer?.firstname || ""} ${order.customer?.lastname || ""}`}</p>
                <p className="text-sm text-gray-500">
                  {order.customer?.email || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {order.customer?.mobile || "N/A"}
                </p>
              </div>
            </div>

            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsRefundDialogOpen(true)}
                disabled={order.status.toLowerCase() === "refunded" || isVerifying}
              >
                <RefreshCcw className="h-4 w-4" />
                Refund Order
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <ReceiptText className="h-4 w-4" />
                )}
                Verify Order
              </Button>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        ) : (
          <div className="py-4 flex items-center justify-center">
            <p>No order information available</p>
          </div>
        )}
      </AlertDialogContent>

      {/* Refund Dialog */}
      <AlertDialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Refund Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to refund this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Reason for refund</label>
            <Input
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Enter reason for refund"
            />
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
              {isRefunding ? "Processing..." : "Confirm Refund"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
};

// Skeleton loader for orders table
const OrdersTableSkeleton = () => {
  return (
    <div className="w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center space-x-4 py-4 border-b"
        >
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Main orders component
const Orders = () => {
  // State management
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all"); // Changed from empty string to "all"
  const [selectedMethod, setSelectedMethod] = useState<string>("all"); // Changed from empty string to "all"
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedOrderReference, setSelectedOrderReference] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  // Fetch orders data
  const {
    data: ordersResponse,
    isLoading,
    refetch,
  } = useGetOrdersByUserId();

  const orders = ordersResponse?.data || [];

  // Filter orders
  const filteredOrders = orders.filter((order: Order) => {
    // First apply search query filter
    const matchesSearch =
      searchQuery === "" ||
      order.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customer?.firstname &&
        `${order.customer.firstname} ${order.customer.lastname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (order.customer?.email &&
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()));

    // Then apply tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "successful" && order.status.toLowerCase() === "successful") ||
      (activeTab === "pending" && order.status.toLowerCase() === "pending");

    // Then apply status filter (modified to check for "all" instead of empty string)
    const matchesStatus =
      selectedStatus === "all" || order.status.toLowerCase() === selectedStatus.toLowerCase();

    // Then apply method filter (modified to check for "all" instead of empty string)
    const matchesMethod =
      selectedMethod === "all" || 
      (order.paymentMethod && order.paymentMethod.toLowerCase() === selectedMethod.toLowerCase());

    return matchesSearch && matchesTab && matchesStatus && matchesMethod;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Calculate totals
  const totalAmount = orders.reduce(
    (sum: number, order: Order) => sum + order.amount,
    0
  );
  
  const successfulOrdersAmount = orders
    .filter((o: Order) => o.status.toLowerCase() === "successful")
    .reduce(
      (sum: number, order: Order) => sum + order.amount,
      0
    );
  
  const pendingOrdersAmount = orders
    .filter((o: Order) => o.status.toLowerCase() === "pending")
    .reduce(
      (sum: number, order: Order) => sum + order.amount,
      0
    );

  // Event handlers
  const handleViewDetails = (reference: string) => {
    setSelectedOrderReference(reference);
    setIsDetailsOpen(true);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatus("all"); // Reset to "all" instead of empty string
    setSelectedMethod("all"); // Reset to "all" instead of empty string
    setSortOrder("desc");
  };

  // Helper functions
  const getUniqueStatuses = () => {
    const statuses = orders.map((o: Order) => o.status);
    return Array.from(new Set(statuses));
  };

  const getUniqueMethods = () => {
    const methods = orders
      .filter((o: Order) => o.paymentMethod)
      .map((o: Order) => o.paymentMethod);
    return Array.from(new Set(methods));
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Orders */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalAmount)}
                </p>
                <p className="text-sm text-gray-500">
                  {orders.length} orders
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Successful Orders */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Successful Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(successfulOrdersAmount)}
                </p>
                <p className="text-sm text-gray-500">
                  {
                    orders.filter((o: Order) =>
                      o.status.toLowerCase() === "successful"
                    ).length
                  }{" "}
                  orders
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ReceiptText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(pendingOrdersAmount)}
                </p>
                <p className="text-sm text-gray-500">
                  {
                    orders.filter((o: Order) =>
                      o.status.toLowerCase() === "pending"
                    ).length
                  }{" "}
                  orders
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <RefreshCw className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="successful">Successful</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by reference, description, or customer..."
                className="pl-9 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
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
                value={selectedMethod}
                onValueChange={setSelectedMethod}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  {getUniqueMethods().map((method) => (
                    <SelectItem
                      key={method}
                      value={method.toLowerCase()}
                    >
                      {method}
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
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-1">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Showing {sortedOrders.length} of {orders.length}{" "}
            orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <OrdersTableSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order: Order) => (
                      <TableRow key={order.reference}>
                        <TableCell className="font-mono text-xs">
                          {order.reference}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(order.amount, order.currency)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>
                              {formatDate(
                                order.createdAt,
                                "short"
                              )}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(
                                order.createdAt
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PaymentMethodIcon
                              method={order.paymentMethod || "Unknown"}
                            />
                            <span>{order.paymentMethod || "Unknown"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            status={order.status}
                          />
                        </TableCell>
                        <TableCell>
                          {order.customer ? (
                            <div>
                              <div className="font-medium">
                                {`${order.customer.firstname} ${order.customer.lastname}`}
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.customer.email}
                              </div>
                            </div>
                          ) : (
                            "Unknown customer"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleViewDetails(order.reference)
                            }
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">
                              View details
                            </span>
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
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <OrderDetails
        orderReference={selectedOrderReference}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Orders;