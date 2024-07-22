"use client";
import Image from "next/image";
import React from "react";
import signup from "../../../../public/images/signup.png";
import signup2 from "../../../../public/images/signup2.png";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signupApi } from "@/lib/api-calls/auth-server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

interface User {
   name: string | null;
   email: string | null;
   businessName: string | null;
   phoneNumber: string | null;
   businessType: string | null;
   country: string | null;
   password: string | null;
}

const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
   password: z.string().min(1, { message: "Password is required." }),
   name: z.string().min(1, { message: "Name is required." }),
   businessName: z.string().min(1, { message: "Business name is required." }),
   phoneNumber: z.string().min(10, { message: "Phone number is required" }),
   businessType: z.string().min(1, { message: "Business type is required." }),
   country: z.string().min(1, { message: "Country is required." }),
   howHear: z.string().min(1, { message: "This field is required." }),
   agreeTerms: z.literal(true, {
      errorMap: () => ({
         message: "You must agree to the terms and conditions",
      }),
   }),
});

const SignUp = () => {
   const router = useRouter();
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         businessName: "",
         phoneNumber: "",
         businessType: "",
         country: "",
         howHear: "",
         agreeTerms: false,
      },
   });

   const onSubmit = async (data: any) => {
      const { agreeTerms, ...userData } = data;
      await signupApi(userData);
      console.log(userData);
      router.push("/dashboard");
   };

   return (
      <div className="md:bg-main/40">
         <Image
            src={signup}
            alt="signup ziba"
            className="fixed top-0 left-0 bottom-0 w-[350px] z-10 hidden md:block"
         />
         <Image
            src={signup2}
            alt="ziba"
            className="fixed top-0 right-0 hidden md:block"
         />
         <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
         <Image
               src={logo}
               alt="zibaPay"
               width={120}
               className="block md:hidden py-6"
            />
         <Image
            src={signup}
            alt="signup ziba"
            className="w-full mb-20 block md:hidden"
         />
            <Link
               href="/"
               className="mt-6 hidden md:block"
            >
               <Image
                  src={logo}
                  alt="zibaPay"
                  className="z-30"
                  width={120}
               />
            </Link>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full sm:w-5/6 md:w-[70%] lg:w-[60%] z-20 container p-10 shadow bg-white rounded md:px-[60px] lg:px-[100px]"
               >
                  <h4 className="text-center my-6">
                     Create your Ziba pay Account
                  </h4>
                  <div className="grid grid-cols-1  gap-8 items-center justify-center">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border "
                                    placeholder="Enter your name"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
       <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Enter your password"
                                    type="password"
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
                              <FormLabel> Email Address *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="email@tech.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Enter your password"
                                    type="password"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                     {/* <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Registered Business Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Registered business name"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Incorporation Number *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Incorporation Number"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                     <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Business Type *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="Business Type"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <FormControl>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                 >
                                    <SelectTrigger className="">
                                       <SelectValue placeholder="Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="Nigeria">
                                          Nigeria
                                       </SelectItem>
                                       <SelectItem value="Ghana">
                                          Ghana
                                       </SelectItem>
                                       <SelectItem value="Rwanda">
                                          Rwanda
                                       </SelectItem>
                                       <SelectItem value="Kenya">
                                          Kenya
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                     {/* <FormField
                        control={form.control}
                        name="howHear"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 How did you hear about Ziba pay *
                              </FormLabel>
                              <FormControl>
                                 <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                 >
                                    <SelectTrigger className="">
                                       <SelectValue placeholder="Select One or more options" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="social-media">
                                          Social media
                                       </SelectItem>
                                       <SelectItem value="ad">
                                          Advertisement
                                       </SelectItem>
                                       <SelectItem value="research">
                                          Research
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     /> */}
                  </div>
                  <div className="">
                     <FormField
                        control={form.control}
                        name="agreeTerms"
                        render={({ field }) => (
                           <FormItem className=" flex gap-4 items-start">
                              <FormControl>
                                 <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="mt-3"
                                 />
                              </FormControl>
                              <p className=" mt-0">
                                 I hereby consent to the{" "}
                                 <Link
                                    href="#"
                                    className="text-main underline"
                                 >
                                    Terms of Use
                                 </Link>{" "}
                                 and give consent to Ziba pay to process my data
                                 in line with Ziba pay’s
                                 <Link
                                    href="#"
                                    className="text-main underline ml-1"
                                 >
                                    Privacy Policy
                                 </Link>
                                 . I also confirm I have the authorization of
                                 the Board of Directors and the Company to
                                 create this account and provide their personal
                                 data.
                              </p>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <Button
                     type="submit"
                     className="w-full my-6 p-7"
                     disabled={!form.formState.isValid}
                  >
                     Create Account
                  </Button>
                  <p className="text-center">
                     Already have an account? <Link href="/login">Login</Link>
                  </p>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default SignUp;
