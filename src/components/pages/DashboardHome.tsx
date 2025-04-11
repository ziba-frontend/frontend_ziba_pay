//@ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid,
  TrendingUp,
  CreditCard,
  BarChart3,
  PieChartIcon,
  Activity,
  Wallet,
  ArrowUpRight,
  Banknote,
  Calendar,
  Download,
  Filter,
  RefreshCcw,
  Search,
  ShoppingBag,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload
} from "lucide-react";
import { 
  useGetTransactionStats, 
  useGetOrdersByUserId 
} from "@/hooks/usePayment";
import { useUploadKycDocument } from "@/hooks/useKyc";
import { TbCurrencyNaira } from "react-icons/tb";
import { formatCurrency } from "@/utils/transaction";
import { cn } from "@/lib/utils";
import TransactionVolumeChart from "./TransactionVolumeChart";
import PaymentMethodsChart from "./PaymentMethodsChart";
import { DataTable } from "../DataTable";
import { toast } from "react-hot-toast";
import KYCVerificationCard from "../dashboard/KycVerificationCard";

// Status badge component
const StatusBadge = ({ status }) => {
  const getColor = () => {
    switch(status.toUpperCase()) {
      case "SUCCEEDED":
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "CANCELLED": 
      case "FAILED": return "bg-red-100 text-red-800";
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      {status}
    </span>
  );
};

const PaymentMethodBadge = ({ method }) => {
  const getColor = () => {
    switch(method) {
      case "CARD": return "bg-purple-100 text-purple-800";
      case "BANK": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      {method}
    </span>
  );
};



export default function ModernDashboard() {
  const { 
    data: stats, 
    isLoading: statsLoading, 
    refetch: refetchStats 
  } = useGetTransactionStats();
  
  const { 
    data: orders, 
    isLoading: ordersLoading 
  } = useGetOrdersByUserId();
  
  const [timeRange, setTimeRange] = useState("monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  // Process stats data
  const totalRevenue = stats?.totalRevenue || 0;
  const totalTransactions = stats?.totalTransactions || 0;
  const bankTransactions = stats?.transactionsByBank || 0;
  const cardTransactions = stats?.transactionsByCard || 0;
  
  // Calculate growth percentages based on real data
  const growthStats = {
    revenue: stats?.revenueGrowth ? `+${stats.revenueGrowth}%` : "+0.0%",
    transactions: stats?.transactionsGrowth ? `+${stats.transactionsGrowth}%` : "+0.0%",
    bank: stats?.bankGrowth ? `+${stats.bankGrowth}%` : "+0.0%",
    card: stats?.cardGrowth ? `+${stats.cardGrowth}%` : "+0.0%"
  };

  // Define DataTable columns for payments
  const paymentColumns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span className="font-medium">${parseFloat(row.getValue("amount")).toFixed(2)}</span>,
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];

  // Define DataTable columns for orders
  const orderColumns = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment",
      cell: ({ row }) => <PaymentMethodBadge method={row.getValue("paymentMethod")} />,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span className="font-medium">${parseFloat(row.getValue("amount")).toFixed(2)}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];

  // Filter and transform orders for tables
  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      // Create payments data from orders
      const payments = orders
        .filter(order => order.status)
        .map(order => ({
          id: order.id || order._id,
          status: order.status,
          description: order.paymentOption || (order.cardPayment ? "Credit Card" : "Bank Transfer"),
          amount: parseFloat(order.amount || 0),
          date: new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }));

      // Format orders for the orders table
      const formattedOrders = orders.map(order => ({
        id: order.reference || order.id || order._id,
        customer: order.customer?.firstname ? `${order.customer.firstname} ${order.customer.lastname}` : "Customer",
        product: order.description || "Product Purchase",
        paymentMethod: order.cardPayment ? "CARD" : "BANK",
        amount: parseFloat(order.amount || 0),
        status: order.status || "PENDING",
        date: new Date(order.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }));

      // Apply search filter if any
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        setFilteredPayments(payments.filter(payment => 
          payment.description.toLowerCase().includes(query) || 
          payment.status.toLowerCase().includes(query)
        ));
        setFilteredOrders(formattedOrders.filter(order => 
          order.customer.toLowerCase().includes(query) || 
          order.product.toLowerCase().includes(query) || 
          order.status.toLowerCase().includes(query)
        ));
      } else {
        setFilteredPayments(payments);
        setFilteredOrders(formattedOrders);
      }
    }
  }, [orders, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between mt-4">
            <p className="text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="flex items-center mt-4 sm:mt-0">
              <div className="relative mr-4">
                {/* Search functionality would go here */}
              </div>
              <button 
                onClick={() => refetchStats()}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="bg-white rounded-lg p-4 mb-8 shadow-sm">
          <div className="grid grid-cols-4 sm:w-96">
            {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
              <button
                key={range}
                className={`py-2 text-sm font-medium ${
                  timeRange === range 
                    ? 'text-[#3BD64A] border-b-2 border-[#3BD64A]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TbCurrencyNaira className="w-6 h-6 text-[#3BD64A]" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {growthStats.revenue}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-[#030A11]">
                  ${formatCurrency ? formatCurrency(totalRevenue) : totalRevenue.toFixed(2)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">vs last {timeRange}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Daily Avg: ${formatCurrency ? 
                    formatCurrency(totalRevenue / (stats?.days || 30)) : 
                    (totalRevenue / (stats?.days || 30)).toFixed(2)}
                </span>
                <span className="font-medium text-[#3BD64A]">
                  {stats?.dailyAvgGrowth ? `↑ ${stats.dailyAvgGrowth}%` : "↑ 0.0%"}
                </span>
              </div>
            </div>
          </div>

          {/* Total Transactions Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-blue-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {growthStats.transactions}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Transactions</p>
                <h3 className="text-2xl font-bold text-[#030A11]">{totalTransactions}</h3>
                <p className="text-xs text-gray-500 mt-1">vs last {timeRange}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Completion Rate: {stats?.completionRate ? `${stats.completionRate}%` : "0%"}
                </span>
                <span className="font-medium text-blue-600">
                  {stats?.completionRateGrowth ? `↑ ${stats.completionRateGrowth}%` : "↑ 0.0%"}
                </span>
              </div>
            </div>
          </div>

          {/* Bank Payments Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Banknote className="w-6 h-6 text-purple-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-purple-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {growthStats.bank}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Bank Payments</p>
                <h3 className="text-2xl font-bold text-[#030A11]">{bankTransactions}</h3>
                <p className="text-xs text-gray-500 mt-1">vs last {timeRange}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Avg. Bank Value: ${stats?.avgBankValue ? 
                    formatCurrency(stats.avgBankValue) : 
                    "0.00"}
                </span>
                <span className="font-medium text-purple-600">
                  {stats?.avgBankValueGrowth ? `↑ ${stats.avgBankValueGrowth}%` : "↑ 0.0%"}
                </span>
              </div>
            </div>
          </div>

          {/* Card Payments Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-orange-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {growthStats.card}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Card Payments</p>
                <h3 className="text-2xl font-bold text-[#030A11]">{cardTransactions}</h3>
                <p className="text-xs text-gray-500 mt-1">vs last {timeRange}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Avg. Card Value: ${stats?.avgCardValue ? 
                    formatCurrency(stats.avgCardValue) : 
                    "0.00"}
                </span>
                <span className="font-medium text-orange-600">
                  {stats?.avgCardValueGrowth ? `↑ ${stats.avgCardValueGrowth}%` : "↑ 0.0%"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Transaction Volume */}
          <TransactionVolumeChart 
            timeRange={timeRange} 
            orders={orders} 
          />

          {/* Payment Methods */}
          <PaymentMethodsChart 
            bankTransactions={bankTransactions} 
            cardTransactions={cardTransactions} 
            totalTransactions={totalTransactions} 
          />
        </div>

        {/* Transaction Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Payments Table - Using DataTable component */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#030A11]">Recent Payments</h3>
                <span className="text-sm font-medium text-[#3BD64A] cursor-pointer">View All</span>
              </div>
            </div>
            <div>
              {statsLoading || ordersLoading ? (
                <div className="text-center py-8 text-gray-500">Loading payment data...</div>
              ) : filteredPayments && filteredPayments.length > 0 ? (
                <DataTable 
                  columns={paymentColumns} 
                  data={filteredPayments} 
                />
              ) : (
                <div className="text-center py-8 text-gray-500">No payment data available</div>
              )}
            </div>
          </div>

          {/* Orders Table - Using DataTable component */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingBag className="w-5 h-5 text-[#3BD64A] mr-2" />
                  <h3 className="text-lg font-semibold text-[#030A11]">Recent Orders</h3>
                </div>
                <span className="text-sm font-medium text-[#3BD64A] cursor-pointer">View All</span>
              </div>
            </div>
            <div>
              {ordersLoading ? (
                <div className="text-center py-8 text-gray-500">Loading order data...</div>
              ) : filteredOrders && filteredOrders.length > 0 ? (
                <DataTable 
                  columns={orderColumns} 
                  data={filteredOrders} 
                />
              ) : (
                <div className="text-center py-8 text-gray-500">No order data available</div>
              )}
            </div>
          </div>
        </div>

        {/* KYC Verification - Full Width */}
        <div className="mb-8">
          <KYCVerificationCard />
        </div>
      </div>
    </div>
  );
}