"use client";
import React, { useEffect, useState } from "react";
import { Users, PenBox} from "lucide-react";
import Card, { CardContent } from "@/components/Card";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import LineChartComponent from "@/components/LineChart";
import AreaChartComponent from "@/components/AreaChartComponent";
import { checkIfAdmin, getAllUsers } from "@/lib/api-calls/admin";
import { getUserProfile } from "@/lib/api-calls/auth-server";
import { getAllBlogs } from "@/lib/api-calls/blog";
import { getAllTransactions } from "@/lib/api-calls/transaction";
import { FaMoneyBill } from "react-icons/fa";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionData, setTransactionData] = useState<{ name: string; cashIn: number; cashOut: number; total: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const isAdmin = await checkIfAdmin();
      setIsAdmin(isAdmin);

      if (isAdmin) {
        const user = await getUserProfile();
        setUserData(user);

        const users = await getAllUsers();
        setTotalUsers(users.length);

        const blogs = await getAllBlogs();
        setTotalBlogs(blogs.length);

        const transactions = await getAllTransactions();
        setTotalTransactions(transactions.length);

        const aggregatedData = aggregateTransactionsByMonth(transactions);
        setTransactionData(aggregatedData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full pr-2 md:pr-10">
      <h2>Dashboard</h2>
      {isAdmin && (
        <>
          <p className="my-4">
            {userData?.name}, here is how your application is going
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
            <div className="border p-4 shadow-lg flex gap-6">
              <Users className="text-main" />
              <div className="flex flex-col gap-4">
                <h4>Total Users</h4>
                <p>{totalUsers}</p>
              </div>
            </div>
            <div className="border p-4 shadow-lg flex gap-6">
              <FaMoneyBill className="text-main" />
              <div className="flex flex-col gap-4">
                <h4>Total Transactions</h4>
                <p>{totalTransactions}</p>
              </div>
            </div>
            <div className="border p-4 shadow-lg flex gap-6">
              <PenBox className="text-main" />
              <div className="flex flex-col gap-4">
                <h4>Total Blogs</h4>
                <p>{totalBlogs}</p>
              </div>
            </div>
          </div>
        </>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardContent>
          <p className="p-4 font-semibold">Transaction Rate</p>
          <BarChart data={transactionData} />
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
