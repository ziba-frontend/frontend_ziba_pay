//@ts-nocheck
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
  CardFooter,
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
  Wallet,
  Download,
  Filter,
  RefreshCw,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  Eye,
  ArrowDownUp,
  DollarSign,
  Landmark,
  Coins,
  Bitcoin,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Type definitions
type Wallet = {
  id: string;
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
  lastUsed: string;
};

type Transaction = {
  id: string;
  walletId: string;
  amount: number;
  type: "deposit" | "withdrawal";
  status: string;
  date: string;
  destination?: string;
  source?: string;
};

type WalletDetailsProps = {
  wallet: Wallet | null;
  transactions: Transaction[];
  isOpen: boolean;
  onClose: () => void;
};

// Dummy data generator
const generateDummyWallets = () => {
  const walletTypes = ["Fiat", "Crypto", "Card"];
  const statuses = ["active", "inactive", "pending", "locked"];
  const currencies = ["USD", "EUR", "GBP", "BTC", "ETH"];
  
  return Array.from({ length: 6 }, (_, i) => {
    const type = walletTypes[Math.floor(Math.random() * walletTypes.length)];
    const currency = type === "Crypto" 
      ? currencies.slice(3)[Math.floor(Math.random() * 2)]
      : currencies.slice(0, 3)[Math.floor(Math.random() * 3)];
    
    return {
      id: `w-${100 + i}`,
      userId: "user-123",
      name: `${type} Wallet ${i + 1}`,
      type: type,
      balance: Math.random() * 10000,
      currency: currency,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      lastUsed: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
    };
  });
};

const generateDummyTransactions = (walletId: string) => {
  const types = ["deposit", "withdrawal"];
  const statuses = ["completed", "pending", "failed"];
  
  return Array.from({ length: 10 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)] as "deposit" | "withdrawal";
    
    return {
      id: `tx-${200 + i}`,
      walletId: walletId,
      amount: Math.random() * 1000,
      type: type,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      destination: type === "withdrawal" ? "Bank Account ****1234" : undefined,
      source: type === "deposit" ? "Bank Account ****5678" : undefined,
    };
  });
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-gray-100 text-gray-800 border-gray-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    locked: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    failed: "bg-red-100 text-red-800 border-red-200",
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

// Wallet type icon component
const WalletTypeIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "fiat":
      return <DollarSign className="h-4 w-4 text-slate-500" />;
    case "crypto":
      return <Bitcoin className="h-4 w-4 text-slate-500" />;
    case "card":
      return <CreditCard className="h-4 w-4 text-slate-500" />;
    default:
      return <Wallet className="h-4 w-4 text-slate-500" />;
  }
};

// Transaction type icon component
const TransactionTypeIcon = ({ type }: { type: "deposit" | "withdrawal" }) => {
  return type === "deposit" ? (
    <ArrowDownLeft className="h-4 w-4 text-green-500" />
  ) : (
    <ArrowUpRight className="h-4 w-4 text-red-500" />
  );
};

// Format currency helper function
const formatCurrency = (amount: number, currency: string = "USD") => {
  if (currency === "BTC" || currency === "ETH") {
    return `${amount.toFixed(8)} ${currency}`;
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Format date helper function
const formatDate = (dateString: string, format: "full" | "short" = "full") => {
  const date = new Date(dateString);
  
  if (format === "short") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }
  
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Format relative time helper function
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

// Wallet details dialog component
const WalletDetails = ({
  wallet,
  transactions,
  isOpen,
  onClose,
}: WalletDetailsProps) => {
  if (!wallet) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Wallet Details</AlertDialogTitle>
          <AlertDialogDescription>
            Wallet ID: {wallet.id}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold">{wallet.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Balance</p>
              <p className="text-lg font-semibold">
                {formatCurrency(wallet.balance, wallet.currency)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Status</p>
              <StatusBadge status={wallet.status} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Type</p>
              <div className="flex items-center gap-2">
                <WalletTypeIcon type={wallet.type} />
                <span>{wallet.type}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p>{formatDate(wallet.createdAt)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Last Used</p>
              <p>{formatDate(wallet.lastUsed)}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-xs">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TransactionTypeIcon type={transaction.type} />
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-semibold ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "deposit" ? "+" : "-"}
                        {formatCurrency(transaction.amount, wallet.currency)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(transaction.date, "short")}</span>
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(transaction.date)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status} />
                      </TableCell>
                      <TableCell>
                        {transaction.type === "deposit" 
                          ? `From: ${transaction.source}`
                          : `To: ${transaction.destination}`}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <AlertDialogFooter>
          <div className="flex gap-2 mr-auto">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Transactions
            </Button>
            {wallet.status !== "locked" && (
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                Lock Wallet
              </Button>
            )}
          </div>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Add Funds dialog component
const AddFundsDialog = ({ 
  isOpen, 
  onClose, 
  walletId 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  walletId: string;
}) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("bank");

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Funds</AlertDialogTitle>
          <AlertDialogDescription>
            Add funds to wallet {walletId}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="number"
                placeholder="0.00"
                className="pl-9"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Source</label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="card">Credit Card</SelectItem>
                <SelectItem value="wallet">Another Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {source === "bank" && (
            <div className="p-3 bg-gray-50 rounded border">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Bank Account ****5678</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Funds will be available in 1-3 business days</p>
            </div>
          )}

          {source === "card" && (
            <div className="p-3 bg-gray-50 rounded border">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Visa ending in 4242</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Funds will be available immediately</p>
            </div>
          )}

          {source === "wallet" && (
            <div className="p-3 bg-gray-50 rounded border">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Main USD Wallet</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Instant transfer between wallets</p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!amount || parseFloat(amount) <= 0}>
            Add Funds
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Skeleton loader for wallets
const WalletsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="p-6">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-8 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-6" />
            <div className="flex justify-between">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="h-10 w-16" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Main wallets component
const Wallets = () => {
  // State management
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [walletTransactions, setWalletTransactions] = useState<Transaction[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState<boolean>(false);
  const [addFundsWalletId, setAddFundsWalletId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Generate dummy data
  const [wallets, setWallets] = useState<Wallet[]>([]);

  // Simulate API call
  React.useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setWallets(generateDummyWallets());
        setIsLoading(false);
      }, 1500);
    };

    loadData();
  }, []);

  // Filter wallets
  const filteredWallets = wallets.filter((wallet) => {
    // Apply search query filter
    const matchesSearch =
      searchQuery === "" ||
      wallet.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "fiat" && wallet.type.toLowerCase() === "fiat") ||
      (activeTab === "crypto" && wallet.type.toLowerCase() === "crypto") ||
      (activeTab === "card" && wallet.type.toLowerCase() === "card");

    // Apply status filter
    const matchesStatus =
      selectedStatus === "" || wallet.status === selectedStatus;

    // Apply type filter
    const matchesType = 
      selectedType === "" || wallet.type === selectedType;

    return matchesSearch && matchesTab && matchesStatus && matchesType;
  });

  // Sort wallets
  const sortedWallets = [...filteredWallets].sort((a, b) => {
    const balanceA = a.balance;
    const balanceB = b.balance;
    return sortOrder === "asc" ? balanceA - balanceB : balanceB - balanceA;
  });

  // Calculate totals
  const totalBalance = wallets.reduce(
    (sum, wallet) => sum + (wallet.currency === "USD" ? wallet.balance : 0),
    0
  );
  
  const totalEUR = wallets.reduce(
    (sum, wallet) => sum + (wallet.currency === "EUR" ? wallet.balance : 0),
    0
  );
  
  const totalGBP = wallets.reduce(
    (sum, wallet) => sum + (wallet.currency === "GBP" ? wallet.balance : 0),
    0
  );

  const cryptoWallets = wallets.filter(w => w.type === "Crypto").length;
  const fiatWallets = wallets.filter(w => w.type === "Fiat").length;
  const cardWallets = wallets.filter(w => w.type === "Card").length;

  // Event handlers
  const handleViewDetails = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setWalletTransactions(generateDummyTransactions(wallet.id));
    setIsDetailsOpen(true);
  };

  const handleAddFunds = (walletId: string) => {
    setAddFundsWalletId(walletId);
    setIsAddFundsOpen(true);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatus("");
    setSelectedType("");
    setSortOrder("desc");
  };

  // Helper functions
  const getUniqueStatuses = () => {
    const statuses = wallets.map((w) => w.status);
    return Array.from(new Set(statuses));
  };

  const getUniqueTypes = () => {
    const types = wallets.map((w) => w.type);
    return Array.from(new Set(types));
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Balance (USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalBalance, "USD")}
                </p>
                <p className="text-sm text-gray-500">
                  {wallets.filter(w => w.currency === "USD").length} wallets
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EUR Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Balance (EUR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalEUR, "EUR")}
                </p>
                <p className="text-sm text-gray-500">
                  {wallets.filter(w => w.currency === "EUR").length} wallets
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Landmark className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GBP Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Balance (GBP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalGBP, "GBP")}
                </p>
                <p className="text-sm text-gray-500">
                  {wallets.filter(w => w.currency === "GBP").length} wallets
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Landmark className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crypto Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Wallet Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fiat</span>
                  <span className="text-sm font-medium">{fiatWallets}</span>
                </div>
                <Progress value={(fiatWallets / wallets.length) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Crypto</span>
                  <span className="text-sm font-medium">{cryptoWallets}</span>
                </div>
                <Progress value={(cryptoWallets / wallets.length) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Card</span>
                  <span className="text-sm font-medium">{cardWallets}</span>
                </div>
                <Progress value={(cardWallets / wallets.length) * 100} className="h-2" />
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
              <TabsTrigger value="all">All Wallets</TabsTrigger>
              <TabsTrigger value="fiat">Fiat</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name or ID..."
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
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedType || "all"}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {getUniqueTypes().map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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

        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Your Wallets</h2>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Wallet
          </Button>
        </div>
      </div>

      {/* Wallets Grid */}
      {isLoading ? (
        <WalletsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWallets.length > 0 ? (
            sortedWallets.map((wallet) => (
              <Card key={wallet.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {wallet.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {wallet.id}
                      </CardDescription>
                    </div>
                    <WalletTypeIcon type={wallet.type} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">
                      {formatCurrency(wallet.balance, wallet.currency)}
                    </p>
                    <StatusBadge status={wallet.status} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500">
                      Created: {formatDate(wallet.createdAt, "short")}
                    </p>
                    <p className="text-gray-500">
                      Last used: {formatRelativeTime(wallet.lastUsed)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 border-t p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleViewDetails(wallet)}
                  >
                    <Eye className="h-4 w-4" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleAddFunds(wallet.id)}
                    disabled={wallet.status !== "active"}
                  >
                    <Plus className="h-4 w-4" />
                    Add Funds
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <Wallet className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No wallets found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleReset}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Wallet Details Dialog */}
      <WalletDetails
        wallet={selectedWallet}
        transactions={walletTransactions}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Add Funds Dialog */}
      <AddFundsDialog
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        walletId={addFundsWalletId}
      />
    </div>
  );
};

export default Wallets;