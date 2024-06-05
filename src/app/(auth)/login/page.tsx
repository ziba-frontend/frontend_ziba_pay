"use client";
import React from "react";
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

// Define the schema
const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
   password: z.string().min(1, { message: "Password is required." }),
});
import login from "../../../../public/images/login.png";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

   // Define the onSubmit handler
   const onSubmit = (data: any) => {
      console.log(data);
   };
   return (
      <div>
         <div className='flex bg-white'>
            <Image
               src={login}
               alt='login to ziba'
               className='hidden w-[386px] md:block'
            />
            <div className='flex  w-full items-center justify-center flex-col gap-6 py-20 md:py-0'>
               <Image
                  src={logo}
                  alt='zibaPay'
                  width={210}
               />
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className='space-y-8 w-full  xl:w-[850px] p-10 shadow'
                  >
                     <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                 <Input
                                    className='bg-white p-6 outline-none border '
                                    placeholder='email'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className='relative'>
                        <FormField
                           control={form.control}
                           name='password'
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Password *</FormLabel>
                                 <FormControl>
                                    <Input
                                       className='bg-white p-6  border '
                                       placeholder='******'
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <span className='text-main absolute right-0 top-24'>
                           Forgot password ?
                        </span>
                     </div>
                     <div className='flex gap-4 items-center pt-20'>
                        <Checkbox />
                        <p>Keep me signed in</p>
                     </div>
                     <Button
                        type='submit'
                        className='w-full'
                     >
                        Log In
                     </Button>
                     <p className='text-center'>Create Account</p>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default Login;
