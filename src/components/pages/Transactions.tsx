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
   Filter,
   ChevronsUpDown,
   Eye,
   Search,
   RefreshCw,
   Wallet,
   ArrowDownUp,
} from "lucide-react";
import {
   useUserTransactions,
   usePaymentStatuses,
} from "@/hooks/useTransaction";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   formatCurrency,
   formatDate,
   formatRelativeTime,
} from "@/utils/transaction";

// Type definitions
type Payment = {
   id: number;
   userId: string;
   amount: number;
   method: string;
   status: string;
   orderId: string;
   paymentDate: string;
   user: {
      name: string;
      email: string;
   };
   order: {
      id: string;
      items: any[];
   };
};

type TransactionDetailsProps = {
   transaction: Payment | null;
   isOpen: boolean;
   onClose: () => void;
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
   const statusStyles = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      refunded: "bg-purple-100 text-purple-800 border-purple-200",
   };

   const style =
      statusStyles[status as keyof typeof statusStyles] ||
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

// Transaction details dialog component
const TransactionDetails = ({
   transaction,
   isOpen,
   onClose,
}: TransactionDetailsProps) => {
   if (!transaction) return null;

   return (
      <AlertDialog
         open={isOpen}
         onOpenChange={onClose}
      >
         <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
               <AlertDialogTitle>Transaction Details</AlertDialogTitle>
               <AlertDialogDescription>
                  Transaction ID: #{transaction.id}
               </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
               <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="text-lg font-semibold">
                     {formatCurrency(transaction.amount)}
                  </p>
               </div>
               <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{formatDate(transaction.paymentDate)}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <StatusBadge status={transaction.status} />
               </div>
               <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                     Payment Method
                  </p>
                  <div className="flex items-center gap-2">
                     <PaymentMethodIcon method={transaction.method} />
                     <span>{transaction.method}</span>
                  </div>
               </div>
               <div className="space-y-1 col-span-2">
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <p className="font-mono text-sm">{transaction.orderId}</p>
               </div>
               {transaction.user && (
                  <div className="space-y-1 col-span-2">
                     <p className="text-sm font-medium text-gray-500">
                        Customer
                     </p>
                     <p>{transaction.user.name || "N/A"}</p>
                     <p className="text-sm text-gray-500">
                        {transaction.user.email || "N/A"}
                     </p>
                  </div>
               )}
            </div>

            <AlertDialogFooter>
               <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
               >
                  <Download className="h-4 w-4" />
                  Download Receipt
               </Button>
               <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

// Skeleton loader for transactions table
const TransactionsTableSkeleton = () => {
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

// Main transactions component
const Transactions = () => {
   // State management
   const [activeTab, setActiveTab] = useState<string>("all");
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [selectedStatus, setSelectedStatus] = useState<string>("");
   const [selectedMethod, setSelectedMethod] = useState<string>("");
   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
   const [selectedTransaction, setSelectedTransaction] =
      useState<Payment | null>(null);
   const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

   // Fetch transactions data
   const {
      data: transactions = [],
      isLoading,
      refetch,
   } = useUserTransactions();

   // Filter transactions
   const filteredTransactions = transactions.filter((transaction: Payment) => {
      // First apply search query filter
      const matchesSearch =
         searchQuery === "" ||
         transaction.id.toString().includes(searchQuery) ||
         transaction.orderId
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
         (transaction.user?.name &&
            transaction.user.name
               .toLowerCase()
               .includes(searchQuery.toLowerCase()));

      // Then apply tab filter
      const matchesTab =
         activeTab === "all" ||
         (activeTab === "card" &&
            transaction.method.toLowerCase().includes("card")) ||
         (activeTab === "bank" &&
            transaction.method.toLowerCase().includes("bank"));

      // Then apply status filter
      const matchesStatus =
         selectedStatus === "" || transaction.status === selectedStatus;

      // Then apply method filter
      const matchesMethod =
         selectedMethod === "" || transaction.method === selectedMethod;

      return matchesSearch && matchesTab && matchesStatus && matchesMethod;
   });

   // Sort transactions
   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const dateA = new Date(a.paymentDate).getTime();
      const dateB = new Date(b.paymentDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
   });

   // Calculate totals
   const totalAmount = transactions.reduce(
      (sum: number, transaction: Payment) => sum + transaction.amount,
      0
   );
   const cardPaymentsAmount = transactions
      .filter((t: Payment) => t.method.toLowerCase().includes("card"))
      .reduce(
         (sum: number, transaction: Payment) => sum + transaction.amount,
         0
      );
   const bankPaymentsAmount = transactions
      .filter((t: Payment) => t.method.toLowerCase().includes("bank"))
      .reduce(
         (sum: number, transaction: Payment) => sum + transaction.amount,
         0
      );

   // Event handlers
   const handleViewDetails = (transaction: Payment) => {
      setSelectedTransaction(transaction);
      setIsDetailsOpen(true);
   };

   const handleSortToggle = () => {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
   };

   const handleReset = () => {
      setSearchQuery("");
      setSelectedStatus("");
      setSelectedMethod("");
      setSortOrder("desc");
   };

   // Helper functions
   const getUniqueStatuses = () => {
      const statuses = transactions.map((t: Payment) => t.status);
      return Array.from(new Set(statuses));
   };

   const getUniqueMethods = () => {
      const methods = transactions.map((t: Payment) => t.method);
      return Array.from(new Set(methods));
   };

   return (
      <div className="container mx-auto py-6 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Transactions */}
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                     Total Transactions
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-2xl font-bold">
                           {formatCurrency(totalAmount)}
                        </p>
                        <p className="text-sm text-gray-500">
                           {transactions.length} transactions
                        </p>
                     </div>
                     <div className="bg-primary/10 p-3 rounded-full">
                        <Wallet className="h-6 w-6 text-primary" />
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Card Payments */}
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                     Card Payments
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-2xl font-bold">
                           {formatCurrency(cardPaymentsAmount)}
                        </p>
                        <p className="text-sm text-gray-500">
                           {
                              transactions.filter((t: Payment) =>
                                 t.method.toLowerCase().includes("card")
                              ).length
                           }{" "}
                           transactions
                        </p>
                     </div>
                     <div className="bg-blue-100 p-3 rounded-full">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Bank Payments */}
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                     Bank Payments
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-2xl font-bold">
                           {formatCurrency(bankPaymentsAmount)}
                        </p>
                        <p className="text-sm text-gray-500">
                           {
                              transactions.filter((t: Payment) =>
                                 t.method.toLowerCase().includes("bank")
                              ).length
                           }{" "}
                           transactions
                        </p>
                     </div>
                     <div className="bg-green-100 p-3 rounded-full">
                        <Building className="h-6 w-6 text-green-600" />
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
                     <TabsTrigger value="all">All Transactions</TabsTrigger>
                     <TabsTrigger value="card">Card Payments</TabsTrigger>
                     <TabsTrigger value="bank">Bank Payments</TabsTrigger>
                  </TabsList>
               </Tabs>

               <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                     <Input
                        type="text"
                        placeholder="Search by ID, order ID, or name..."
                        className="pl-9 w-full md:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                  </div>

                  <div className="flex gap-2">
                     <Select
                        value={selectedStatus || "all"}
                        onValueChange={setSelectedStatus}
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All</SelectItem>
                           {getUniqueStatuses().map((status) => (
                              <SelectItem
                                 key={status}
                                 value={status}
                              >
                                 {status}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>

                     <Select
                        value={selectedMethod || "all"}
                        onValueChange={setSelectedMethod}
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Filter by method" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All</SelectItem>
                           {getUniqueMethods().map((method) => (
                              <SelectItem
                                 key={method}
                                 value={method}
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

         {/* Transactions Table */}
         <Card>
            <CardHeader className="pb-1">
               <CardTitle>Transactions</CardTitle>
               <CardDescription>
                  Showing {sortedTransactions.length} of {transactions.length}{" "}
                  transactions
               </CardDescription>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <TransactionsTableSkeleton />
               ) : (
                  <div className="overflow-x-auto">
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Order ID</TableHead>
                              <TableHead className="text-right">
                                 Actions
                              </TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {sortedTransactions.length > 0 ? (
                              sortedTransactions.map((transaction: Payment) => (
                                 <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                       #{transaction.id}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                       {formatCurrency(transaction.amount)}
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex flex-col">
                                          <span>
                                             {formatDate(
                                                transaction.paymentDate,
                                                "short"
                                             )}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                             {formatRelativeTime(
                                                transaction.paymentDate
                                             )}
                                          </span>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex items-center gap-2">
                                          <PaymentMethodIcon
                                             method={transaction.method}
                                          />
                                          <span>{transaction.method}</span>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <StatusBadge
                                          status={transaction.status}
                                       />
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                       {transaction.orderId}
                                    </TableCell>
                                    <TableCell className="text-right">
                                       <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                             handleViewDetails(transaction)
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

         {/* Transaction Details Dialog */}
         <TransactionDetails
            transaction={selectedTransaction}
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
         />
      </div>
   );
};

export default Transactions;
