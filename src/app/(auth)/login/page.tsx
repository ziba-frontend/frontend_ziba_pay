"use client";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import logo from "../../../../public/svg/logo.svg";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import login from "../../../../public/images/login.png";
import { Checkbox } from "@/components/ui/checkbox";
import { loginApi } from "@/lib/api-calls/auth-server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RiseLoader from "react-spinners/RiseLoader";
import { Eye, EyeOff } from "lucide-react";

// Define the schema
const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
   password: z.string().min(1, { message: "Password is required." }),
});

const Login = () => {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const form = useForm({
      resolver: zodResolver(formSchema),
      mode: "onChange",
   });

   // Define the onSubmit handler
   const onSubmit = async (data: any) => {
      setIsLoading(true);
      await loginApi(data);
      setIsLoading(false);
      router.push("/dashboard");
      console.log(data);
   };

   return (
      <div className="bg-white">
         <Image
            src={login}
            alt="login ziba"
            className="fixed top-0 left-0 bottom-0 w-[500px] h-screen z-10 hidden md:block"
         />
         <div className="flex flex-col gap-6 items-center justify-center min-h-screen z-20">
            <Image
               src={logo}
               alt="zibaPay"
               width={120}
               className="block md:hidden py-6"
            />
            <Image
               src={login}
               alt="login ziba"
               className="w-full mb-20 block md:hidden"
            />
            <Link
               href="/"
               className="mt-6 hidden md:block z-30"
            >
               <Image
                  src={logo}
                  alt="zibaPay"
                  className=" 2xl:ml-[200px]"
                  width={120}
               />
            </Link>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full sm:w-5/6 md:w-[70%] lg:w-[60%] z-20 container p-10 shadow-lg bg-white rounded 2xl:ml-[500px] md:px-[60px] 2xl:px-[102px] 2xl:w-1/2"
               >
                  <h4 className="text-center my-6 block md:hidden">
                     Log in to your <br />{" "}
                     <span className="text-main">Ziba pay</span> Account
                  </h4>
                  <h4 className="text-center my-6 hidden md:block">Login</h4>
                  <div className="space-y-8">
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
                     <div className="relative">
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Password *</FormLabel>
                                 <FormControl>
                                    <div className="relative">
                                       <Input
                                          className="bg-white p-6 border pr-10"
                                          placeholder="******"
                                          type={showPassword ? "text" : "password"}
                                          {...field}
                                       />
                                       <div
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                          onClick={() => setShowPassword((prev) => !prev)}
                                       >
                                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                       </div>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <Link
                           href="/forgot-password"
                           className="text-main absolute right-0 -bottom-10 underline"
                        >
                           Forgot password?
                        </Link>
                     </div>
                     <div className="flex gap-4 items-center pt-20">
                        <Checkbox />
                        <p>Keep me signed in</p>
                     </div>
                     <Button
                        type="submit"
                        className="w-full p-[26px]"
                        disabled={!form.formState.isValid || isLoading}
                     >
                        {isLoading ? (
                           <div className="flex items-center justify-center gap-2">
                              <RiseLoader
                                 color="#3BD64A"
                                 size={10}
                              />
                              <span>Logging In...</span>
                           </div>
                        ) : (
                           "Log In"
                        )}
                     </Button>
                     <p className="text-center">
                        <Link href="/sign-up">Create Account</Link>
                     </p>
                  </div>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default Login;
