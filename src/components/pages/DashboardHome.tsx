"use client";
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PieChart from "@/components/PieChart";
import LineChartComponent from "@/components/LineChart";
import AreaChartComponent from "@/components/AreaChartComponent";
import { getAllTransactions } from "@/lib/api-calls/transaction";
import BarChartComponent from "../BarChart";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all transactions
                const transactions = await getAllTransactions();

                // Aggregate the transactions by month
                const aggregatedData = aggregateTransactionsByMonth(transactions);

                // Update the state with the aggregated data
                setTransactionData(aggregatedData);
            } catch (error) {
                console.error("Error while fetching transactions:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-5 w-full pr-2 md:pr-10">
            <h2>Dashboard</h2>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CardContent>
                    <p className="p-4 font-semibold">Transaction Rate</p>
                    <BarChartComponent data={transactionData} />
                </CardContent>
                <CardContent>
                    <p className="p-4 font-semibold">Total fees</p>
                    <PieChart />
                </CardContent>
                <CardContent>
                    <p className="p-4 font-semibold">Cash-in and Cash-out</p>
                    <LineChartComponent data={transactionData} />
                </CardContent>
                <CardContent>
                    <p className="p-4 font-semibold">Cash-out Account</p>
                    <AreaChartComponent />
                </CardContent>
            </section>
        </div>
    );
}
