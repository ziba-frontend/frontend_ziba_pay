//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
   usePayOrderWithCard,
   usePayOrderWithBank,
   useGetTransactionStatus,
} from "@/hooks/usePayment";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function ConfirmPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [isConfirming, setIsConfirming] = useState(true);
   const [processing, setProcessing] = useState(false);
   const [cardDetails, setCardDetails] = useState<any>(null);
   const [bankDetails, setBankDetails] = useState<any>(null);

   // Get params from URL
   const orderReference = searchParams.get("reference");
   const paymentMethod = searchParams.get("paymentMethod");
   const amount = searchParams.get("amount");
   const currency = searchParams.get("currency");

   // Payment hooks
   const { mutate: payWithCard } = usePayOrderWithCard();
   const { mutate: payWithBank } = usePayOrderWithBank();
   const { data: transactionStatus } = useGetTransactionStatus(
      orderReference || undefined
   );

   // Get stored payment details
   useEffect(() => {
      const storedCard = localStorage.getItem("cardDetails");
      if (storedCard) setCardDetails(JSON.parse(storedCard));

      const storedBank = localStorage.getItem("bankDetails");
      if (storedBank) setBankDetails(JSON.parse(storedBank));
   }, []);

   // Redirect when status is Pending
   useEffect(() => {
      if (transactionStatus?.data?.data?.status === "Pending") {
         const redirectUrl = transactionStatus.data.data.paymentDetail?.redirectUrl;
         if (redirectUrl) {
            window.location.href = redirectUrl;
         }
      }
   }, [transactionStatus]);

   const processPayment = () => {
      if (!orderReference) {
         toast.error("Missing reference");
         return router.push("/checkout");
      }

      setProcessing(true);

      const paymentData = {
         paymentoption: paymentMethod === "card" ? "C" : "bank-transfer",
         country: "NG",
         narration: `Payment of ${amount} ${currency}`,
         ...(paymentMethod === "card"
            ? {
                 card: {
                    cardnumber: cardDetails?.cardNumber,
                    expirymonth: cardDetails?.expiryMonth,
                    expiryyear: cardDetails?.expiryYear?.slice(-2),
                    cvv: cardDetails?.cvv,
                 },
              }
            : {
                 BankTransfer: {
                    bankcode: bankDetails?.bankCode,
                 },
              }),
      };

      const paymentFn = paymentMethod === "card" ? payWithCard : payWithBank;

      paymentFn(
         {
            reference: orderReference,
            [paymentMethod === "card" ? "cardData" : "bankData"]: paymentData,
         },
         {
            onSuccess: (response) => {
               const redirectUrl =
                  response.data?.data?.paymentDetail?.redirectUrl

               if (redirectUrl) {
                  window.location.href = redirectUrl;
               } else {
                  toast.error("No redirect URL received");
                  router.push("/checkout");
               }
            },
            onError: () => {
               toast.error("Payment failed");
               router.push("/checkout");
            },
         }
      );
   };

   const confirmPayment = () => {
      setIsConfirming(false);
      processPayment();
   };

   const cancelPayment = () => {
      router.push("/checkout");
   };

  
   
   return (
      <div className="flex flex-col justify-center items-center p-8 max-w-md mx-auto mt-10 border rounded-lg shadow-md">
         {isConfirming ? (
            <>
               <h2 className="text-2xl font-semibold mb-6 text-center">
                  Confirm Payment
               </h2>
               <div className="space-y-4 w-full">
                  <div className="flex justify-between border-b pb-2">
                     <span className="font-medium">Amount:</span>
                     <span className="font-bold">
                        {amount} {currency}
                     </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                     <span className="font-medium">Payment Method:</span>
                     <span>
                        {paymentMethod === "card"
                           ? "Credit/Debit Card"
                           : "Bank Transfer"}
                     </span>
                  </div>
                  {paymentMethod === "card" && cardDetails && (
                     <div className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                           <span className="font-medium">Card Number:</span>
                           <span>
                              •••• •••• •••• {cardDetails.cardNumber.slice(-4)}
                           </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                           <span className="font-medium">Expiry Date:</span>
                           <span>
                              {cardDetails.expiryMonth}/{cardDetails.expiryYear}
                           </span>
                        </div>
                     </div>
                  )}
                  {paymentMethod === "bank" && bankDetails && (
                     <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Bank Code:</span>
                        <span>{bankDetails.bankCode}</span>
                     </div>
                  )}
                  <div className="flex justify-between border-b pb-2">
                     <span className="font-medium">Reference:</span>
                     <span className="text-sm">{orderReference}</span>
                  </div>
               </div>
               <div className="flex gap-4 mt-8 w-full">
                  <Button
                     variant="outline"
                     className="w-1/2"
                     onClick={cancelPayment}
                  >
                     Cancel
                  </Button>
                  <Button
                     className="w-1/2 bg-green-600 hover:bg-green-700"
                     onClick={confirmPayment}
                     disabled={
                        (paymentMethod === "card" && !cardDetails) ||
                        (paymentMethod === "bank" && !bankDetails)
                     }
                  >
                     Confirm Payment
                  </Button>
               </div>
            </>
         ) : (
            <>
               <div className="p-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
               </div>
               <p className="text-center text-[#535353]">
                  {processing
                     ? "Processing your payment. Please wait..."
                     : "Preparing your payment..."}
               </p>
               {paymentMethod && (
                  <p className="text-center text-[#535353] mt-2">
                     Payment method:{" "}
                     {paymentMethod === "card"
                        ? "Credit/Debit Card"
                        : "Bank Transfer"}
                  </p>
               )}
              
            </>
         )}
      </div>
   );
}
