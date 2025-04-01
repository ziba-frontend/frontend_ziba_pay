import React from "react";
import { CreditCard, Building } from "lucide-react";

const CheckoutSidebar = () => {
  return (
    <div className="bg-gray-50 hidden sm:block w-[100px] md:w-[280px] border-r border-gray-200 p-6 transition-all duration-300 space-y-8">
      <h2 className="text-sm md:text-lg text-gray-700 font-semibold tracking-wide uppercase">
        Payment Methods
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="bg-blue-50 p-2 rounded-md">
            <CreditCard size={20} className="text-main" />
          </div>
          <h3 className="text-gray-800 font-medium">Card Payment</h3>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="bg-blue-50 p-2 rounded-md">
            <Building size={20} className="text-main" />
          </div>
          <h3 className="text-gray-800 font-medium">Bank Transfer</h3>
        </div>
      </div>
      
      <div className="mt-auto pt-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-600">
            All transactions are secure and encrypted for your protection
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;