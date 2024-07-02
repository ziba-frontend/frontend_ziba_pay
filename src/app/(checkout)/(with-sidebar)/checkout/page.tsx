"use client"
import axios from "axios";
import React from "react";
import Image from "next/image";
import im1 from "../../../../../public/images/mobile_checkout.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

interface PaymentData {
    amount: number | null;
    currency: string;
    phoneNumber: string | null;
    description: string | null;
}

const BASE_URL = 'http://localhost:8080/api/v1/payment';

const initiateMtnPayment = async (paymentData: PaymentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/mtn-momo-pay`, paymentData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error during Mtn momo payment");
        throw error;
    }
};

// Define the schema
const formSchema = z.object({
   phoneNumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
   }),
   provider: z.string().min(1, { message: "Provider is required." }),
   amount: z.preprocess((val) => Number(val), z.number().positive({ message: "Amount must be positive." })),
   currency: z.string().min(1, { message: "Currency is required." }),
   description: z.string().optional(),
});

const Page = () => {
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         provider: "",
      },
   });

   // Define the onSubmit handler
   const onSubmit = async (data: any) => {
      try {
         const paymentData: PaymentData = {
            amount: data.amount,
            currency: data.currency,
            phoneNumber: data.phoneNumber,
            description: data.description || null,
         };
         const result = await initiateMtnPayment(paymentData);
         console.log("Payment successful:", result);
      } catch (error) {
         console.error("Payment failed:", error);
      }
   };

   return (
      <div>
         <div className="flex justify-center items-center">
            <Image
               src={im1}
               alt="mobile checkout"
               width={100}
               height={100}
            />
         </div>
         <h4 className="text-center text-[#535353]">
            Enter your mobile money number <br /> and provider to start the
            payment
         </h4>

         <div className="flex justify-center items-center">
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-5/6 md:w-3/4 p-6"
               >
                  <FormField
                     control={form.control}
                     name="phoneNumber"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="bg-white p-6 outline-none border"
                                 placeholder="Enter your Momo Number"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="provider"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Controller
                                 control={form.control}
                                 name="provider"
                                 render={({ field }) => (
                                    <Select
                                       onValueChange={(value) => field.onChange(value)}
                                       value={field.value}
                                    >
                                       <SelectTrigger className="">
                                          <SelectValue placeholder="Select Momo" />
                                       </SelectTrigger>
                                       <SelectContent className="bg-white">
                                          <SelectItem value="Airtel">
                                             Airtel
                                          </SelectItem>
                                          <SelectItem value="MTN">MTN</SelectItem>
                                       </SelectContent>
                                    </Select>
                                 )}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="amount"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 type="number"
                                 className="bg-white p-6 outline-none border"
                                 placeholder="Enter amount"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="currency"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="bg-white p-6 outline-none border"
                                 placeholder="Enter currency"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 className="bg-white p-6 outline-none border"
                                 placeholder="Enter description (optional)"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button
                     type="submit"
                     className="w-full"
                  >
                     Confirm
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default Page;
