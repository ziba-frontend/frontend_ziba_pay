//@ts-nocheck
"use client";
import React, { useState } from "react";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TransactionVolumeChart = ({ timeRange, orders }) => {
  const [displayRange, setDisplayRange] = useState("all");

  // Function to process orders data into chart format
  const processChartData = () => {
    if (!orders || orders.length === 0) {
      return Array(12).fill(0).map((_, i) => ({
        name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        count: 0
      }));
    }

    // Group orders by month
    const monthlyData = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt || order.date);
      const month = date.getMonth();
      const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
      
      if (!acc[month]) {
        acc[month] = { name: monthName, count: 0, monthIndex: month };
      }
      acc[month].count += 1;
      return acc;
    }, {});

    // Fill in missing months with zero values
    const allMonths = Array(12).fill(0).map((_, i) => {
      const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i];
      return monthlyData[i] || { name: monthName, count: 0, monthIndex: i };
    });

    // Sort by month index
    allMonths.sort((a, b) => a.monthIndex - b.monthIndex);

    // Apply the selected filter
    switch (displayRange) {
      case "first6":
        return allMonths.slice(0, 6);
      case "last6":
        return allMonths.slice(-6);
      case "all":
      default:
        return allMonths;
    }
  };

  const chartData = processChartData();

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="w-5 h-5 text-[#3BD64A] mr-2" />
          <h3 className="font-semibold text-lg text-[#030A11]">Transaction Volume</h3>
        </div>
        <select 
          className="text-sm border border-gray-300 rounded-md px-2 py-1"
          value={displayRange}
          onChange={(e) => setDisplayRange(e.target.value)}
        >
          <option value="last6">Last 6 Months</option>
          <option value="first6">First 6 Months</option>
          <option value="all">All Months</option>
        </select>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0f0',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              formatter={(value) => [`${value} transactions`, 'Count']}
            />
            <Bar dataKey="count" fill="#3BD64A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionVolumeChart;