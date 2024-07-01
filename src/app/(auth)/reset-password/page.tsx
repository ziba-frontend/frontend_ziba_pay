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
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z
   .object({
      password: z
         .string()
         .min(6, { message: "Password must be at least 6 characters." }),
      passwordConfirm: z.string().min(6, {
         message: "Password confirmation must be at least 6 characters.",
      }),
   })
   .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
   });

interface FormData {
   password: string;
   passwordConfirm: string;
}

const resetPassword = async (token: string, password: string) => {
   const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
   });

   if (!response.ok) {
      throw new Error("Failed to reset password");
   }

   return response.json();
};

const ResetPasswordPage: React.FC = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const token = searchParams.get("token");

   if (!token) {
      return <div>Token is missing</div>;
   }

   const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
   });

   const onSubmit = async (data: FormData) => {
      await resetPassword(token, data.password);
      alert("Password has been reset.");
      router.push("/login");
   };

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
         <div className="bg-white p-8 shadow-md w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-4 text-main">
               Reset Password
            </h1>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
               >
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>New Password *</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-white p-4 outline-none border"
                                 type="password"
                                 placeholder="******"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="passwordConfirm"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Confirm New Password *</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-white p-4 outline-none border"
                                 type="password"
                                 placeholder="******"
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
                     Reset Password
                  </Button>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default ResetPasswordPage;
