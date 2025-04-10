//@ts-nocheck
import React from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const PaymentMethodsChart = ({ bankTransactions, cardTransactions, totalTransactions }) => {
  // Create pie chart data from actual transaction counts
  const pieData = [
    { name: "Card", value: cardTransactions || 0 },
    { name: "Bank", value: bankTransactions || 0 }
  ];
  
  const COLORS = ["#3BD64A", "#030A11"];

  // Calculate percentages
  const cardPercentage = totalTransactions ? Math.round((cardTransactions / totalTransactions) * 100) : 0;
  const bankPercentage = totalTransactions ? Math.round((bankTransactions / totalTransactions) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <PieChartIcon className="w-5 h-5 text-[#3BD64A] mr-2" />
          <h3 className="font-semibold text-lg text-[#030A11]">Payment Methods</h3>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center h-80">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#3BD64A] mr-2"></div>
              <div>
                <div className="text-sm font-medium">Card Payment</div>
                <div className="text-gray-500 text-xs">{cardPercentage}% of transactions</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#030A11] mr-2"></div>
              <div>
                <div className="text-sm font-medium">Bank Transfer</div>
                <div className="text-gray-500 text-xs">{bankPercentage}% of transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsChart;