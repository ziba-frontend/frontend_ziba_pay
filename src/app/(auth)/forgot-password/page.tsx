"use client";
import React, { useState } from "react";
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
import toast from "react-hot-toast";
import Image from "next/image";
import emailSent from "../../../../public/images/email-sent.png";
import { useForgotPassword } from "@/hooks/useAuth";

const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
});

const ForgotPassword = () => {
   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
   const [email, setEmail] = useState("");
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

   const forgotPasswordMutation = useForgotPassword();
   const onSubmit = async (data: any) => {
      setEmail(data.email);
      try {
         const response = await forgotPasswordMutation.mutateAsync(data);
         if (response.status == "success") {
            setStatus("success");
         } else {
            setStatus("error");
         }
      } catch (error) {
         console.error("Error sending password reset link:", error);
         setStatus("error");
      }
   };

   const handleResend = async () => {
      try {
         await forgotPasswordMutation.mutateAsync(email);
         toast.success("Password reset link has been resent to your email.");
      } catch (error) {
         console.error("Error resending password reset link:", error);
         toast.error(
            "An error occurred while resending the password reset link. Please try again."
         );
      }
   };

   const handleChangeEmail = () => {
      setStatus("idle");
   };

   if (status === "success") {
      return (
         <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-10 shadow-md w-full max-w-xl ">
               <div className="flex items-center">
                  <Image
                     src={emailSent}
                     alt="email-sent"
                  />
                  <h1 className="text-2xl font-semibold mb-4 ml-4">
                     Email Sent
                  </h1>
               </div>
               <p className="my-2">
                  We have sent an email to {email}. Please check your inbox and
                  follow the instructions to reset your account password.
               </p>
               <div className="my-6">
                  <p>
                     Did not receive the Email?{" "}
                     <span
                        className="cursor-pointer text-main ml-4 underline pb-2"
                        onClick={handleResend}
                     >
                        Resend Email
                     </span>
                  </p>
               </div>
               <div className="my-6">
                  <p>
                     Wrong Email Address?
                     <span
                        className="cursor-pointer text-main ml-4 underline pb-2"
                        onClick={handleChangeEmail}
                     >
                        Change Email Address
                     </span>
                  </p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
         <div className="bg-white p-8 shadow-md w-full max-w-lg">
            <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
            {status === "error" && (
               <p className="text-red-500 mb-4">
                  An error occurred while sending the password reset link.
                  Please try again.
               </p>
            )}
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 flex flex-col gap-6"
               >
                  <p className="my-2">
                     Enter the email address you used to create the account, and
                     we will email you instructions to reset your password.
                  </p>
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email Address *</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-white p-6 outline-none border"
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
                     className="w-full p-6"
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
