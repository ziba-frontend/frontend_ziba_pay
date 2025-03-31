"use client";
import React, { useEffect, useState } from "react";
import { 
  LayoutGrid, 
  TrendingUp, 
  CreditCard, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Wallet,
  DollarSign,
  Users,
  ArrowUpRight
} from "lucide-react";
import BarChart from "../BarChart";
import PieChart from "../PieChart";
import LineChartComponent from "../LineChart";
import AreaChartComponent from "../AreaChartComponent";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

type Transaction = {
    createdAt: string | number | Date;
    amount: number;
    type: "cash-in" | "cash-out";
};

const aggregateTransactionsByMonth = (transactions: Transaction[]) => {
    const monthlyData = Array(12).fill(0).map((_, idx) => ({
        name: months[idx],
        cashIn: 0,
        cashOut: 0,
        total: 0,
    }));
    transactions.forEach((transaction) => {
        const date = new Date(transaction.createdAt);
        const month = date.getMonth();
        if (transaction.type === "cash-in") {
            monthlyData[month].cashIn += transaction.amount;
        } else {
            monthlyData[month].cashOut += transaction.amount;
        }
        monthlyData[month].total += transaction.amount;
    });
    return monthlyData;
};

export default function DashboardHome() {
    const [transactionData, setTransactionData] = useState<
        { name: string; cashIn: number; cashOut: number; total: number }[]
    >([]);
    
    // Simulated data fetch (replace with actual hook)
    useEffect(() => {
        const mockTransactions: Transaction[] = [
            { createdAt: new Date(2024, 0, 1), amount: 1000, type: "cash-in" },
            { createdAt: new Date(2024, 0, 15), amount: 500, type: "cash-out" },
            // Add more mock transactions
        ];
        const aggregatedData = aggregateTransactionsByMonth(mockTransactions);
        setTransactionData(aggregatedData);
    }, []);

    return (
        <div className="bg-neutral-50 min-h-screen p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
                            <LayoutGrid className="w-8 h-8 text-blue-600" />
                            ZibaPay Dashboard
                        </h1>
                        <p className="text-neutral-500 mt-2">
                            Comprehensive payment gateway insights
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2">
                            <ArrowUpRight className="w-5 h-5" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                        {
                            title: "Total Volume",
                            value: "$124,567",
                            icon: <DollarSign className="text-green-600" />,
                            change: "+12.5%"
                        },
                        {
                            title: "Transactions",
                            value: "3,245",
                            icon: <CreditCard className="text-blue-600" />,
                            change: "+8.2%"
                        },
                        {
                            title: "Active Merchants",
                            value: "124",
                            icon: <Users className="text-purple-600" />,
                            change: "+5.1%"
                        },
                        {
                            title: "Payout Volume",
                            value: "$89,234",
                            icon: <Wallet className="text-orange-600" />,
                            change: "+9.7%"
                        }
                    ].map((stat) => (
                        <div key={stat.title} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-neutral-500 text-sm">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-neutral-800">{stat.value}</h3>
                                    <p className="text-green-600 text-xs">{stat.change}</p>
                                </div>
                                <div className="bg-neutral-100 p-2 rounded-full">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[
                        {
                            title: "Transaction Rate",
                            icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
                            content: <BarChart data={transactionData} />
                        },
                        {
                            title: "Total Fees",
                            icon: <PieChartIcon className="w-6 h-6 text-green-600" />,
                            content: <PieChart />
                        },
                        {
                            title: "Cash Flow",
                            icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
                            content: <LineChartComponent data={transactionData} />
                        },
                        {
                            title: "Account Activity",
                            icon: <Activity className="w-6 h-6 text-orange-600" />,
                            content: <AreaChartComponent />
                        }
                    ].map((card, index) => (
                        <div 
                            key={card.title}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        {card.icon}
                                        <h3 className="text-xl font-semibold text-neutral-800">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <CreditCard className="w-5 h-5 text-neutral-400" />
                                </div>
                                {/* Added padding top to separate title from chart */}
                                <div className="h-64 flex items-center justify-center pt-20">
                                    {card.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}