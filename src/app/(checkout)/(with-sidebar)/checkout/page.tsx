//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import im1 from "../../../../../public/images/mobile_checkout.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import toast from "react-hot-toast";
import { useCreateOrder, useGetAllBanks } from "@/hooks/usePayment";
import { CreditCard, Building } from "lucide-react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CheckoutNavbar from "@/components/CheckoutNavbar";

interface PaymentData {
   amount: number;
   currency: string;
   paymentMethod: "card" | "bank";
   cardNumber?: string;
   expiryMonth?: string;
   expiryYear?: string;
   cvv?: string;
   bankCode?: string;
}

const formSchema = z
   .object({
      amount: z.coerce
         .number()
         .positive({ message: "Amount must be positive." }),
      currency: z.string().min(1, { message: "Currency is required." }),
      paymentMethod: z.enum(["card", "bank"]),
      cardNumber: z.string().optional().nullable(),
      expiryMonth: z.string().optional().nullable(),
      expiryYear: z.string().optional().nullable(),
      cvv: z.string().optional().nullable(),
      bankCode: z.string().optional().nullable(),
   })
   .refine(
      (data) => {
         if (data.paymentMethod === "card") {
            return (
               !!data.cardNumber &&
               !!data.expiryMonth &&
               !!data.expiryYear &&
               !!data.cvv
            );
         }
         if (data.paymentMethod === "bank") {
            return !!data.bankCode;
         }
         return true;
      },
      {
         message:
            "Please fill in all required fields for the selected payment method",
         path: ["paymentMethod"],
      }
   );

export default function Checkout() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [shouldFetchBanks, setShouldFetchBanks] = useState(false);
   const [activeTab, setActiveTab] = useState("card");
   const [cardBrand, setCardBrand] = useState("");

   const form = useForm<PaymentData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         amount: 0,
         currency: "NGN",
         paymentMethod: "card",
         cardNumber: "",
         expiryMonth: "",
         expiryYear: "",
         cvv: "",
         bankCode: "",
      },
   });

   // Watch amount and currency for navbar
   const amount = form.watch("amount");
   const currency = form.watch("currency");

   const router = useRouter();
   const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder();

   // Only fetch banks when bank payment method is selected
   const { data: banksData, isLoading: isLoadingBanks } = useGetAllBanks({
      enabled: shouldFetchBanks,
   });

   const banks = banksData?.data || [];

   const onSubmit = async (data: PaymentData) => {
      setIsSubmitting(true);

      try {
         // Store card details in localStorage for payment confirmation if payment method is card
         if (
            data.paymentMethod === "card" &&
            data.cardNumber &&
            data.expiryMonth &&
            data.expiryYear &&
            data.cvv
         ) {
            localStorage.setItem(
               "cardDetails",
               JSON.stringify({
                  cardNumber: data.cardNumber,
                  expiryMonth: data.expiryMonth,
                  expiryYear: data.expiryYear,
                  cvv: data.cvv,
                  cardBrand: cardBrand,
               })
            );
         }

         // If bank method, store bank code
         if (data.paymentMethod === "bank" && data.bankCode) {
            localStorage.setItem(
               "bankDetails",
               JSON.stringify({
                  bankCode: data.bankCode,
               })
            );
         }

         // Prepare customer data
         const customerData = {
            firstname: "transact",
            lastname: "pay",
            mobile: "+2348134543421",
            country: "NG",
            email: "email@transactpay.ai",
         };

         // Prepare order payload
         const createOrderPayload = {
            customer: customerData,
            order: {
               amount: data.amount,
               currency: data.currency,
               description: "Payment",
            },
            payment: {
               RedirectUrl: `${window.location.origin}/checkout/confirm`,
            },
         };

         // Create the order
         createOrder(createOrderPayload, {
            onSuccess: (response) => {
               setIsSubmitting(false);
               const orderReference = response.data?.transactionId;
               if (!orderReference) {
                  toast.error("Order reference not found in response");
                  return;
               }
               router.push(
                  `/checkout/confirm?reference=${orderReference}&paymentMethod=${data.paymentMethod}&amount=${data.amount}&currency=${data.currency}`
               );
            },
            onError: (error) => {
               setIsSubmitting(false);
               toast.error("Order creation failed. Please try again.");
            },
         });
      } catch (error) {
         setIsSubmitting(false);
         toast.error("An unexpected error occurred. Please try again.");
      }
   };

   // Detect card type based on card number prefix
   const detectCardBrand = (cardNumber: string) => {
      const cleanedNumber = cardNumber.replace(/\s+/g, "");

      if (/^4/.test(cleanedNumber)) {
         return "visa";
      } else if (/^5[1-5]/.test(cleanedNumber)) {
         return "mastercard";
      } else if (/^3[47]/.test(cleanedNumber)) {
         return "amex";
      } else if (/^6(?:011|5)/.test(cleanedNumber)) {
         return "discover";
      } else {
         return "";
      }
   };

   // Format card number with spaces
   const formatCardNumber = (value: string) => {
      if (!value) return value;

      const cleanedValue = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      const brand = detectCardBrand(cleanedValue);
      setCardBrand(brand);

      if (brand === "amex") {
         // Format: XXXX XXXXXX XXXXX (4-6-5)
         const parts = [
            cleanedValue.substring(0, 4),
            cleanedValue.substring(4, 10),
            cleanedValue.substring(10, 15),
         ];
         return parts.filter((part) => part !== "").join(" ");
      } else {
         // Format: XXXX XXXX XXXX XXXX (4-4-4-4)
         const parts = [
            cleanedValue.substring(0, 4),
            cleanedValue.substring(4, 8),
            cleanedValue.substring(8, 12),
            cleanedValue.substring(12, 16),
         ];
         return parts.filter((part) => part !== "").join(" ");
      }
   };

   // Watch payment method to conditionally fetch banks
   const paymentMethod = form.watch("paymentMethod");

   // Handle tab changes
   const handleTabChange = (value: string) => {
      setActiveTab(value);
      form.setValue("paymentMethod", value as "card" | "bank");

      if (value === "bank") {
         setShouldFetchBanks(true);
      }
   };

   // Enable bank fetching only when bank payment is selected
   useEffect(() => {
      if (paymentMethod === "bank") {
         setShouldFetchBanks(true);
      }
   }, [paymentMethod]);

   // Watch card number for formatting and brand detection
   const cardNumber = form.watch("cardNumber");

   useEffect(() => {
      if (cardNumber) {
         const formattedValue = formatCardNumber(cardNumber);
         if (formattedValue !== cardNumber) {
            form.setValue("cardNumber", formattedValue);
         }
      }
   }, [cardNumber, form]);

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         {/* Add the Checkout Navbar with real-time amount and currency */}
         <CheckoutNavbar amount={amount} currency={currency} />
         
         <div className="flex-1 flex items-center justify-center py-8 px-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
               <div className="flex justify-center items-center mb-6">
                  <Image
                     src={im1}
                     alt="ZibaPay checkout"
                     width={80}
                     height={80}
                     className="mb-2"
                  />
               </div>
               <h3 className="text-center text-xl font-semibold mb-2 text-gray-800">
                  Complete Your Payment
               </h3>
               <p className="text-center text-gray-500 mb-6">
                  Enter your payment details to start the order
               </p>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-6"
                  >
                     {/* Amount Field */}
                     <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type="number"
                                       className="bg-white p-6 rounded-md border border-gray-300 transition-all"
                                       placeholder="Enter amount"
                                       {...field}
                                       onChange={(e) => {
                                          const value = e.target.value;
                                          field.onChange(
                                             value === ""
                                                ? undefined
                                                : parseFloat(value)
                                          );
                                       }}
                                       value={field.value || ""}
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     {/* Currency Field */}
                     <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                 >
                                    <SelectTrigger className="bg-white p-6 border border-gray-300 rounded-md focus:ring-1 transition-all">
                                       <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="NGN">
                                          NGN (Nigerian Naira)
                                       </SelectItem>
                                       <SelectItem value="USD">
                                          USD (US Dollar)
                                       </SelectItem>
                                       <SelectItem value="GHS">
                                          GHS (Ghanaian Cedi)
                                       </SelectItem>
                                       <SelectItem value="KES">
                                          KES (Kenyan Shilling)
                                       </SelectItem>
                                       <SelectItem value="RWF">
                                          RWF (Rwandan Franc)
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     {/* Rest of the form remains the same... */}
                     {/* Payment Method Tabs */}
                     <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Tabs
                                    defaultValue="card"
                                    value={activeTab}
                                    onValueChange={handleTabChange}
                                    className="w-full"
                                 >
                                    <TabsList className="grid grid-cols-2 mb-6">
                                       <TabsTrigger
                                          value="card"
                                          className="flex items-center justify-center gap-2"
                                       >
                                          <CreditCard size={16} />
                                          Card
                                       </TabsTrigger>
                                       <TabsTrigger
                                          value="bank"
                                          className="flex items-center justify-center gap-2"
                                       >
                                          <Building size={16} />
                                          Bank
                                       </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                       value="card"
                                       className="mt-4 space-y-4"
                                    >
                                       {/* Card Number */}
                                       <FormField
                                          control={form.control}
                                          name="cardNumber"
                                          render={({ field }) => (
                                             <FormItem>
                                                <FormControl>
                                                   <div className="relative">
                                                      <Input
                                                         className="bg-white p-6 border border-gray-300 rounded-md transition-all pl-12"
                                                         placeholder="Card Number"
                                                         maxLength={19}
                                                         {...field}
                                                         value={field.value || ""}
                                                      />
                                                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                         {cardBrand === "visa" && (
                                                            <span className="text-blue-600 text-xl font-bold">
                                                               Visa
                                                            </span>
                                                         )}
                                                         {cardBrand ===
                                                            "mastercard" && (
                                                            <span className="text-red-600 text-xl font-bold">
                                                               MC
                                                            </span>
                                                         )}
                                                         {cardBrand === "amex" && (
                                                            <span className="text-green-600 text-xl font-bold">
                                                               Amex
                                                            </span>
                                                         )}
                                                         {cardBrand ===
                                                            "discover" && (
                                                            <span className="text-orange-600 text-xl font-bold">
                                                               Disc
                                                            </span>
                                                         )}
                                                         {!cardBrand && (
                                                            <CreditCard
                                                               className="text-gray-400"
                                                               size={20}
                                                            />
                                                         )}
                                                      </div>
                                                   </div>
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                             </FormItem>
                                          )}
                                       />

                                       {/* Expiry Date and CVV */}
                                       <div className="grid grid-cols-2 gap-4">
                                          <div className="grid grid-cols-2 gap-2">
                                             {/* Expiry Month */}
                                             <FormField
                                                control={form.control}
                                                name="expiryMonth"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Select
                                                            onValueChange={
                                                               field.onChange
                                                            }
                                                            value={field.value || ""}
                                                         >
                                                            <SelectTrigger className="bg-white py-6 border border-gray-300 rounded-md focus:ring-1 transition-all">
                                                               <SelectValue placeholder="MM" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                               {Array.from(
                                                                  { length: 12 },
                                                                  (_, i) => {
                                                                     const month =
                                                                        String(
                                                                           i + 1
                                                                        ).padStart(
                                                                           2,
                                                                           "0"
                                                                        );
                                                                     return (
                                                                        <SelectItem
                                                                           key={month}
                                                                           value={
                                                                              month
                                                                           }
                                                                        >
                                                                           {month}
                                                                        </SelectItem>
                                                                     );
                                                                  }
                                                               )}
                                                            </SelectContent>
                                                         </Select>
                                                      </FormControl>
                                                      <FormMessage className="text-red-500" />
                                                   </FormItem>
                                                )}
                                             />

                                             {/* Expiry Year */}
                                             <FormField
                                                control={form.control}
                                                name="expiryYear"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Select
                                                            onValueChange={
                                                               field.onChange
                                                            }
                                                            value={field.value || ""}
                                                         >
                                                            <SelectTrigger className="bg-white py-6 border border-gray-300 rounded-md transition-all">
                                                               <SelectValue placeholder="YY" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                               {Array.from(
                                                                  { length: 10 },
                                                                  (_, i) => {
                                                                     const year =
                                                                        String(
                                                                           new Date().getFullYear() +
                                                                              i
                                                                        );
                                                                     return (
                                                                        <SelectItem
                                                                           key={year}
                                                                           value={
                                                                              year
                                                                           }
                                                                        >
                                                                           {year}
                                                                        </SelectItem>
                                                                     );
                                                                  }
                                                               )}
                                                            </SelectContent>
                                                         </Select>
                                                      </FormControl>
                                                      <FormMessage className="text-red-500" />
                                                   </FormItem>
                                                )}
                                             />
                                          </div>

                                          {/* CVV */}
                                          <FormField
                                             control={form.control}
                                             name="cvv"
                                             render={({ field }) => (
                                                <FormItem>
                                                   <FormControl>
                                                      <Input
                                                         className="bg-white p-6 border border-gray-300 rounded-md transition-all"
                                                         placeholder="CVV"
                                                         maxLength={4}
                                                         type="password"
                                                         {...field}
                                                         value={field.value || ""}
                                                      />
                                                   </FormControl>
                                                   <FormMessage className="text-red-500" />
                                                </FormItem>
                                             )}
                                          />
                                       </div>
                                    </TabsContent>

                                    <TabsContent
                                       value="bank"
                                       className="mt-4"
                                    >
                                       <FormField
                                          control={form.control}
                                          name="bankCode"
                                          render={({ field }) => (
                                             <FormItem>
                                                <FormControl>
                                                   <Select
                                                      onValueChange={field.onChange}
                                                      value={field.value || ""}
                                                      disabled={isLoadingBanks}
                                                   >
                                                      <SelectTrigger className="bg-white p-6 border border-gray-300 rounded-md transition-all">
                                                         <SelectValue
                                                            placeholder={
                                                               isLoadingBanks
                                                                  ? "Loading banks..."
                                                                  : "Select Bank"
                                                            }
                                                         />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                         {isLoadingBanks ? (
                                                            <SelectItem
                                                               value="loading"
                                                               disabled
                                                            >
                                                               Loading banks...
                                                            </SelectItem>
                                                         ) : (
                                                            banks.map((bank: any) => (
                                                               <SelectItem
                                                                  key={bank.bankCode}
                                                                  value={
                                                                     bank.bankCode
                                                                  }
                                                               >
                                                                  {bank.name}
                                                               </SelectItem>
                                                            ))
                                                         )}
                                                      </SelectContent>
                                                   </Select>
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                             </FormItem>
                                          )}
                                       />
                                    </TabsContent>
                                 </Tabs>
                              </FormControl>
                              <FormMessage className="text-red-500" />
                           </FormItem>
                        )}
                     />

                     {/* Submit Button */}
                     <SubmitButton
                        disabled={isSubmitting || isCreatingOrder}
                        className="w-full py-6 text-white rounded-md transition-colors font-medium text-lg"
                     >
                        {isSubmitting || isCreatingOrder ? (
                           <div className="flex items-center justify-center gap-2">
                              <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                              Processing...
                           </div>
                        ) : (
                           "Confirm Payment"
                        )}
                     </SubmitButton>

                     {/* Secure Payment Note */}
                     <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        >
                           <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                           ></rect>
                           <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Secure payments powered by ZibaPay
                     </div>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
}