import React from "react";
import { InfoIcon } from "lucide-react";

function CheckoutFooter() {
  return (
    <div className="mt-8 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg py-3 px-4">
        <InfoIcon size={16} className="text-blue-500" />
        <p className="text-gray-600 text-sm">
          An additional E-levy fee of 1% may apply to this payment.{" "}
          <span className="text-blue-600 font-medium underline cursor-pointer hover:text-blue-700 transition-colors">
            Learn more
          </span>
        </p>
      </div>
    </div>
  );
}

export default CheckoutFooter;