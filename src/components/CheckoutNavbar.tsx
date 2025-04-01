"use client"
import React from "react";
import Image from "next/image";
import logo from "../../public/svg/logo.svg";
import { DollarSign, CreditCard } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";


interface CheckoutNavbarProps {
  amount: number;
  currency: string;
}

const CheckoutNavbar: React.FC<CheckoutNavbarProps> = ({ amount, currency }) => {
  // Get user email from auth store
  const { user } = useAuthStore();
  const email = user?.email || "Guest User";

  // Format currency display
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "NGN":
        return "₦";
      case "USD":
        return "$";
      case "GHS":
        return "₵";
      case "KES":
        return "KSh";
      case "RWF":
        return "FRw";
      default:
        return currency;
    }
  };

  // Format amount with commas for thousands
  const formatAmount = (amount: number) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="sticky top-0 z-10 bg-white flex justify-between items-center py-4 px-4 md:px-6 mb-6 border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="ZibaPay"
          className="h-10 w-auto"
        />
        <span className="hidden md:inline-block text-gray-700 font-medium">ZibaPay</span>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg px-4 py-2.5 flex items-center gap-3 border border-gray-100">
        <div className="text-right">
          <p className="text-gray-500 text-sm truncate max-w-[200px]">{email}</p>
          <p className="font-medium">
            Pay <span className="text-main font-semibold">
              {getCurrencySymbol(currency)} {formatAmount(amount || 0)}
            </span>
          </p>
        </div>
        <div className="bg-blue-100 p-2 rounded-full">
          <CreditCard size={18} className="text-main" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutNavbar;