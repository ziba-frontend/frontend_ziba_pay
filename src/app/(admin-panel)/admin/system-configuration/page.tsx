"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CloudUpload, Settings } from "lucide-react";
import intuit from "../../../../../public/images/intuit.png";
import bigcommerce from "../../../../../public/images/bigcommerce.png";
import netsuite from "../../../../../public/images/netsuite.png";
import mailchimp from "../../../../../public/images/mailchimp.png";
import excel from "../../../../../public/images/excel.png";
import salesforce from "../../../../../public/images/salesforce.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const paymentSchema = z.object({
   apiKey: z.string().min(1, { message: "API Key is required." }),
   callbackUrl: z.string().url({ message: "Invalid URL." }),
   environment: z.string().min(1, { message: "Environment is required." }),
   enableGateway: z.boolean(),
});

const transactionSchema = z.object({
   minAmount: z
      .number()
      .positive({ message: "Minimum amount must be positive." }),
   maxAmount: z
      .number()
      .positive({ message: "Maximum amount must be positive." }),
   fixedFee: z
      .number()
      .nonnegative({ message: "Fixed fee cannot be negative." }),
   percentageFee: z
      .number()
      .min(0, { message: "Percentage fee must be at least 0%." }),
   enableLimits: z.boolean(),
});

const Page = () => {
   const paymentForm = useForm({
      resolver: zodResolver(paymentSchema),
      defaultValues: {
         apiKey: "",
         callbackUrl: "",
         environment: "",
         enableGateway: false,
      },
   });

   const transactionForm = useForm({
      resolver: zodResolver(transactionSchema),
      defaultValues: {
         minAmount: 0,
         maxAmount: 0,
         fixedFee: 0,
         percentageFee: 0,
         enableLimits: false,
      },
   });

   const handlePaymentSubmit = (data: any) => {
      console.log("Payment Data:", data);
      // Handle payment form submission
   };

   const handleTransactionSubmit = (data: any) => {
      console.log("Transaction Data:", data);
      // Handle transaction form submission
   };

   return (
      <div className="p-4">
         <h2 className="mb-6">System Configuration</h2>

         <Tabs
            defaultValue="payment"
            className="w-full"
         >
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full bg-transparent sm:pb-10 border-b pb-[120px]">
               <TabsTrigger
                  value="payment"
                  className="flex-1 p-2 text-left justify-start relative data-[state=active]:after:w-1/2 data-[state=active]:after:left-0 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-main"
               >
                  1. Payment Gateway Settings
               </TabsTrigger>
               <TabsTrigger
                  value="transaction"
                  className="flex-1 p-2 text-left justify-start relative data-[state=active]:after:w-1/2 data-[state=active]:after:left-0 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-main"
               >
                  2. Transaction Limit
               </TabsTrigger>
               <TabsTrigger
                  value="integration"
                  className="flex-1 p-2 text-left justify-start relative data-[state=active]:after:w-1/2 data-[state=active]:after:left-0 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-main"
               >
                  3. Third Party Integration
               </TabsTrigger>
            </TabsList>

            <TabsContent
               value="payment"
               className="w-full mt-4 pt-10"
            >
               <h4>Payment Gateway</h4>

               <Form {...paymentForm}>
                  <form
                     onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)}
                     className="flex flex-col gap-2 lg:w-3/4"
                  >
                     <FormField
                        control={paymentForm.control}
                        name="apiKey"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>API Key</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="Enter your API Key"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {paymentForm.formState.errors.apiKey?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={paymentForm.control}
                        name="callbackUrl"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Callback URL</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Enter your Callback URL"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    paymentForm.formState.errors.callbackUrl
                                       ?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={paymentForm.control}
                        name="environment"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Environment</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Enter Environment"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    paymentForm.formState.errors.environment
                                       ?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={paymentForm.control}
                        name="enableGateway"
                        render={({ field }) => (
                           <FormItem className="flex items-start gap-2 my-2 flex-col">
                              <FormLabel>Enable Gateway</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    paymentForm.formState.errors.enableGateway
                                       ?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <Button
                        type="submit"
                        className="bg-main w-full p-6 mt-4"
                     >
                        Save
                     </Button>
                  </form>
               </Form>
            </TabsContent>

            <TabsContent
               value="transaction"
               className="w-full mt-4 pt-10"
            >
               <h4>Transaction Limit</h4>

               <Form {...transactionForm}>
                  <form
                     onSubmit={transactionForm.handleSubmit(
                        handleTransactionSubmit
                     )}
                     className="flex flex-col gap-2 lg:w-3/4"
                  >
                     <FormField
                        control={transactionForm.control}
                        name="minAmount"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Minimum Transaction Amount</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    className="bg-white p-6 border"
                                    placeholder="Enter Minimum Amount"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    transactionForm.formState.errors.minAmount
                                       ?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={transactionForm.control}
                        name="maxAmount"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Maximum Transaction Amount</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    className="bg-white p-6 border"
                                    placeholder="Enter Maximum Amount"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    transactionForm.formState.errors.maxAmount
                                       ?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={transactionForm.control}
                        name="fixedFee"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Fixed Transaction Fee</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    className="bg-white p-6 border"
                                    placeholder="Enter Fixed Fee"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    transactionForm.formState.errors.fixedFee
                                       ?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={transactionForm.control}
                        name="percentageFee"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Fixed Percentage Fee</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    className="bg-white p-6 border"
                                    placeholder="Enter Percentage Fee"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    transactionForm.formState.errors
                                       .percentageFee?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={transactionForm.control}
                        name="enableLimits"
                        render={({ field }) => (
                           <FormItem className="flex items-start gap-2 my-2 flex-col">
                              <FormLabel>Enable Limits</FormLabel>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {
                                    transactionForm.formState.errors
                                       .enableLimits?.message
                                 }
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <Button
                        type="submit"
                        className="bg-main w-full p-6 mt-4"
                     >
                        Save
                     </Button>
                  </form>
               </Form>
            </TabsContent>

            <TabsContent
               value="integration"
               className="w-full mt-4 pt-10"
            >
               <h2>Integrations</h2>
               <p className="my-2">
                  Select and connect tools you use to integrate with your
                  workflow
               </p>
               <Button className="bg-main my-4">
                  All Integrations
                  <span className="text-xl font-bold bg-white rounded-[12px] px-3 text-main ml-2">
                     6
                  </span>
               </Button>

               <div className="border rounded-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 shadow-lg">
                  <div className="border p-4 flex flex-col gap-4 border-t-transparent border-l-transparent">
                     <Image
                        src={intuit}
                        alt="integ"
                     />
                     <h3>Intuit Quickbooks</h3>
                     <p>
                        QuickBooks is an accounting software package developed
                        and marketed by Intuit
                     </p>
                     <div className="flex gap-4 items-end">
                        <Button className="bg-transparent shadow-md border text-black">
                           Connect
                           <CloudUpload className="ml-2" />
                        </Button>
                        <small className="text-destructive">Disconnect</small>
                     </div>
                  </div>
                  <div className="border p-4 flex flex-col gap-4">
                     <Image
                        src={bigcommerce}
                        alt="integ"
                     />
                     <h3>BigCommerce</h3>
                     <p>
                        BigCommerce is a leading e-commerce software platform
                        that provides startups and established companies
                     </p>
                     <div className="flex gap-4 items-end">
                        <Button className="bg-transparent shadow-md border text-black">
                           Connect
                           <CloudUpload className="ml-2" />
                        </Button>
                        <small className="text-destructive">Disconnect</small>
                     </div>
                  </div>
                  <div className="border p-4 flex flex-col gap-4">
                     <Image
                        src={netsuite}
                        alt="integ"
                     />
                     <h3>NetSuite</h3>
                     <p>
                        Make smarter, faster decisions using the world's most
                        deployed cloud ERP solution.
                     </p>
                     <div className="flex gap-4 items-end">
                        <Button className="bg-main shadow-md  white">
                           Connected
                           <Settings className="ml-2" />
                        </Button>
                        <small className="text-destructive">Disconnect</small>
                     </div>
                  </div>
                  <div className="border p-4 flex flex-col gap-4">
                     <Image
                        src={mailchimp}
                        alt="integ"
                     />
                     <h3>Mailchimp</h3>
                     <p>
                        Mailchimp makes it easy to sell stuff online, even if
                        you don't have an e-commerce store.
                     </p>
                     <div className="flex gap-4 items-end">
                        <Button className="bg-transparent shadow-md border text-black">
                           Connect
                           <CloudUpload className="ml-2" />
                        </Button>
                        <small className="text-destructive">Disconnect</small>
                     </div>
                  </div>
                  <div className="border p-4 flex flex-col gap-4">
                     <Image
                        src={excel}
                        alt="integ"
                     />
                     <h3>Microsoft Excel</h3>
                     <p>
                        Excel learns your patterns, organizing your data to save
                        you time.
                     </p>
                     <div className="flex gap-4 items-end">
                        <Button className="bg-transparent shadow-md border text-black">
                           Connect
                           <CloudUpload className="ml-2" />
                        </Button>
                        <small className="text-destructive">Disconnect</small>
                     </div>
                  </div>
                  <div className="border p-4 flex flex-col gap-4 border-b-transparent border-r-transparent">
                     <Image
                        src={salesforce}
                        alt="integ"
                     />
                     <h3>Salesforce</h3>
                     <p>
                        Salesforce offers a wide variety of CRM categories and
                        systems to meet your needs, including Sales Cloud,
                     </p>
                     <div className="flex gap-4 items-end">
                        <Button className="bg-transparent shadow-md border text-black">
                           Connect
                           <CloudUpload className="ml-2" />
                        </Button>
                        <small className="text-destructive">Disconnect</small>
                     </div>
                  </div>
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default Page;
