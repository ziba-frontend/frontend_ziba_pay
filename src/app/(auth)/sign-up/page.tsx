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
import Link from "next/link";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
   password: z.string().min(1, { message: "Password is required." }),
});
const SignUp = () => {
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

   // Define the onSubmit handler
   const onSubmit = (data: any) => {
      console.log(data);
   };
   return (
      <div className="bg-main/40">
         <Image
            src={signup}
            alt="signup ziba"
            className="fixed top-0 left-0 bottom-0 w-[350px] z-10"
         />
         <Image
            src={signup2}
            alt="ziba"
            className="fixed top-0 right-0"
         />
         <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
            <Image
               src={logo}
               alt="zibaPay"
               className="z-30"
            />

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full sm:w-5/6 md:w-[70%] lg:w-[60%]  z-20 container p-10 shadow bg-white"
               >
                  <h4 className="text-center my-6">
                     Create your Ziba pay Account
                  </h4>
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
                     <FormField
                        control={form.control}
                        name="email"
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
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Business Email *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6  border "
                                    placeholder="email@tech.com"
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
                              <FormLabel>Password*</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6  border "
                                    placeholder="Enter your password"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="business-name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Registered Business Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6  border "
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
                        name="number"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Incorporation Number *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6  border "
                                    placeholder="Incorporation Number"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="Business Type *"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Incorporation Number *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6  border "
                                    placeholder="Business Type*"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Country*</FormLabel>
                              <FormControl>
                                 <Select>
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
                     />

                     <FormField
                        control={form.control}
                        name="how-hear"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 How did you hear about Ziba pay *
                              </FormLabel>
                              <FormControl>
                                 <Select>
                                    <SelectTrigger className="">
                                       <SelectValue placeholder="Select One or more options" />
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
                     />
                  </div>
                  <div className="flex gap-4">
                     {" "}
                     <Checkbox />
                     <p>
                        I hereby consent to the{" "}
                        <Link
                           href="#"
                           className="text-main underline"
                        >
                           Terms of Use
                        </Link>{" "}
                        and give consent to Ziba pay to process my data in line
                        with Ziba pay’s
                        <Link
                           href="#"
                           className="text-main underline ml-1"
                        >
                           Privacy Policy
                        </Link>
                        . I also confirm i have the authorization of the Board
                        of Directors and the Company to create this account and
                        provide their personal data.
                     </p>
                  </div>

                  <Button
                     type="submit"
                     className="w-full my-6 p-7"
                  >
                     Create Account
                  </Button>
                  <p className="text-center">
                     Already have account ? <Link href="/login">Login</Link>
                  </p>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default SignUp;
