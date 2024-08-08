"use client";
import React, { useState } from "react";
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
import { createFeedback } from "@/lib/api-calls/feedback";
import SubmitButton from "@/components/SubmitButton";

const formSchema = z.object({
   issue: z.string().min(1, { message: "Issue is required." }),
   email: z.string().email({ message: "Invalid email address." }),
   subject: z.string().min(1, { message: "Subject is required." }),
});

const Request = () => {
   const [isLoading, setIsLoading] = useState(false);
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         issue: "",
         email: "",
         subject: "",
      },
   });


   const onSubmit = async (data: any) => {
      setIsLoading(true);
      try {
         const feedback = await createFeedback(data.issue, data.email, data.subject);
         console.log("Here is the feedback: ", feedback);
         form.reset(); 
         return feedback;
      } catch (error) {
         console.error("Error while creating the feedback: ", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="container mt-20 flex items-center justify-center">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 md:w-3/4 p-6"
            >
               <h2>Submit a request</h2>
               <FormField
                  control={form.control}
                  name="issue"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Write your issue below</FormLabel>
                        <FormControl>
                           <Input
                              className="bg-white p-6 md:p-8 outline-none border"
                              placeholder="issue"
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
                        <FormLabel>Your email</FormLabel>
                        <FormControl>
                           <Input
                              className="bg-white p-6 outline-none border md:p-8"
                              placeholder="email"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                           <Input
                              className="bg-white p-6 border md:p-8"
                              placeholder="subject"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="my-4">
                  <p className="text-[#3498DB]">
                     Before you submit the tickets, check out the FAQ article
                     with related issues. You might see the solution of the
                     issue you’re about to report.
                  </p>
               </div>
               <SubmitButton
                isLoading={isLoading}
               >
                  Submit
               </SubmitButton>
            </form>
         </Form>
      </div>
   );
};

export default Request;
