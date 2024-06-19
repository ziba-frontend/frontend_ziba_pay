"use client";
import React from "react";
import Image from "next/image";
import im1 from "../../../../../public/images/mobile_checkout.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

// Define the schema
const formSchema = z.object({
   username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
   }),
   issue: z.string().min(1, { message: "Issue is required." }),
   email: z.string().email({ message: "Invalid email address." }),
   subject: z.string().min(1, { message: "Subject is required." }),
});

const Page = () => {
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

   // Define the onSubmit handler
   const onSubmit = (data: any) => {
      console.log(data);
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
                     name="issue"
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
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Select>
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
