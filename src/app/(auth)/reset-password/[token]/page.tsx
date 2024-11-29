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
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useResetPassword } from "@/hooks/useAuth";

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

const ResetPasswordPage: React.FC = () => {
   const router = useRouter();
   const { token } = useParams();

   const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
   });
   const resetPasswordMutation = useResetPassword(token);

   const onSubmit = async (data: FormData) => {
      if (!token) {
         alert("Token is missing");
         return;
      }
      try {
         await resetPasswordMutation.mutateAsync(data.password);
         toast.success("Password has been reset.");
         router.push("/login");
      } catch (error) {
         toast.error("Failed to reset password. Please try again.");
      }
   };

   if (!token) {
      return <div>Token is missing</div>;
   }

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
         <div className="bg-white p-8 shadow-md w-full max-w-xl">
            <h1 className="text-2xl font-semibold mb-4 ">
               Create New Password
            </h1>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 flex flex-col gap-6"
               >
                  <p>
                     Your new password must be different be different from any
                     of your previous passwords
                  </p>
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
                                 className="bg-white p-6 outline-none border"
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
                     className="w-full p-6"
                  >
                     Reset Password
                  </Button>
               </form>
            </Form>
            <div className="flex mt-6">
               <p>
                  Remember password?{" "}
                  <Link
                     href="/login"
                     className="text-main"
                  >
                     Login
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default ResetPasswordPage;
