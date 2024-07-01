"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/lib/api-calls/action";

const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
});

const ForgotPassword = () => {
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

   const onSubmit = async (data: any) => {
      try {
         await forgotPassword(data.email);
         alert("Password reset link has been sent to your email.");
      } catch (error) {
         console.error("Error sending password reset link:", error);
         alert(
            "An error occurred while sending the password reset link. Please try again."
         );
      }
   };

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
         <div className="bg-white p-8 shadow-md w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-4 text-main">
               Forgot Password
            </h1>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email Address *</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-white p-4 outline-none border"
                                 placeholder="email"
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
                     Send Reset Link
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default ForgotPassword;
