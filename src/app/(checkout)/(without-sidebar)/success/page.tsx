"use client";
import { LockKeyhole } from "lucide-react";
import successIm from "../../../../../public/images/success.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
   const searchParams = useSearchParams();
   const [amount, setAmount] = useState<string>("350");
   const [currency, setCurrency] = useState<string>("RWF");
   const [merchant, setMerchant] = useState<string>("Kigali Mart");
   
   useEffect(() => {
      // Get transaction details from URL if available
      const amountParam = searchParams.get("amount");
      const currencyParam = searchParams.get("currency");
      const merchantParam = searchParams.get("merchant");
      
      if (amountParam) setAmount(amountParam);
      if (currencyParam) setCurrency(currencyParam);
      if (merchantParam) setMerchant(merchantParam);
   }, [searchParams]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <div className="mx-auto w-full md:w-5/6 lg:w-[50%]">
            <div className="flex flex-col gap-4 items-center justify-center">
               <Image
                  src={successIm}
                  alt="success"
               />
               <p className="text-2xl">Payment Successful</p>
               <small className="text-gray-500">
                  You paid {currency} {amount} to {merchant}
               </small>
               <Link href="/" className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Go Back to Homepage
               </Link>
            </div>
         </div>
         <div className="flex gap-2 mt-12">
            <LockKeyhole />{" "}
            <p>
               Secured by{" "}
               <Link
                  href="/"
                  className="font-bold"
               >
                  ZibaPay
               </Link>
            </p>
         </div>
      </div>
   );
}