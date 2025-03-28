"use client";
import Image from "next/image";
import React, { useState } from "react";
import signup from "../../../public/images/signup.png";
import signup2 from "../../../public/images/signup2.png";
import logo from "../../../public/svg/logo.svg";
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
import { useRouter } from "next/navigation";
import RiseLoader from "react-spinners/RiseLoader";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { Cookies } from "react-cookie";
import { useSearchParams } from "next/navigation";
import { useSignup } from "@/hooks/useAuth";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
   email: z.string().email({ message: "Invalid email address." }),
   password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
         message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
         message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&#]/, {
         message: "Password must contain at least one special character.",
      }),
   name: z.string().min(1, { message: "Name is required." }),
   businessType: z.string().min(1, { message: "Business type is required." }),
   agreeTerms: z.literal(true, {
      errorMap: () => ({
         message: "You must agree to the terms and conditions",
      }),
   }),
});

const businessTypes = [
   { value: "retail", label: "Retail" },
   { value: "ecommerce", label: "E-Commerce" },
   { value: "technology", label: "Technology" },
   { value: "consulting", label: "Consulting" },
   { value: "manufacturing", label: "Manufacturing" },
   { value: "healthcare", label: "Healthcare" },
   { value: "education", label: "Education" },
   { value: "finance", label: "Finance" },
   { value: "other", label: "Other" },
];

const SignUp = () => {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const searchParams = useSearchParams();
   const redirectUrl = searchParams.get("redirectUrl");

   const form = useForm({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
         name: "",
         email: "",
         password: "",
         businessType: "",
         agreeTerms: false,
      },
   });

   const {
      watch,
      handleSubmit,
      control,
      formState: { errors, isValid },
   } = form;
   const watchedFields = watch();

   const cookies = new Cookies();
   const registerUserMutation = useSignup();
   const onSubmit = async (data: any) => {
      setIsSubmitting(true);
      const { agreeTerms, ...userData } = data;
      try {
         const response = await registerUserMutation.mutateAsync(data);
         if (response.status == "success") {
            toast.success("Registration successful! Please login to continue.");
            location.replace("/login");
         } else {
            const errorMessage =
               response?.error?.message ||
               response?.message ||
               "Registration failed. Please try again.";
            toast.error(errorMessage);

            // Check if error message indicates email exists
            if (errorMessage.toLowerCase().includes("email already exists")) {
               toast.success("Please login with your existing account");
               location.replace("/login");
            }
         }
      } catch (error: any) {
         const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Registration failed. Please try again.";
         toast.error(errorMessage);

         // Check if error message indicates email exists
         if (errorMessage.toLowerCase().includes("email already exists")) {
            toast.success("Please login with your existing account");
            location.replace("/login");
         }
      } finally {
         setIsSubmitting(false);
      }
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
            <Link
               href="/"
               className="block md:hidden my-6"
            >
               {" "}
               <Image
                  src={logo}
                  alt="zibaPay"
                  width={120}
               />
            </Link>
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
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8 w-full sm:w-5/6 md:w-[70%] lg:w-[60%] z-20 container p-10 shadow bg-white rounded md:px-[60px] lg:px-[100px]"
               >
                  <h4 className="text-center my-6">
                     Create your Ziba pay Account
                  </h4>
                  <div className="grid grid-cols-1 gap-8 items-center justify-center">
                     <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="Enter your name"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>{errors.name?.message}</FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border"
                                    placeholder="email@tech.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>{errors.email?.message}</FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password *</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       className="bg-white p-6 border pr-10"
                                       placeholder="Enter your password"
                                       type={showPassword ? "text" : "password"}
                                       {...field}
                                    />
                                    <div
                                       className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                       onClick={() =>
                                          setShowPassword((prev) => !prev)
                                       }
                                    >
                                       {showPassword ? (
                                          <EyeOff size={20} />
                                       ) : (
                                          <Eye size={20} />
                                       )}
                                    </div>
                                 </div>
                              </FormControl>
                              <FormMessage>
                                 {errors.password?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="businessType"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Business Type *</FormLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger className="bg-white p-6 border">
                                       <SelectValue placeholder="Select your business type" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {businessTypes.map((type) => (
                                       <SelectItem
                                          key={type.value}
                                          value={type.value}
                                       >
                                          {type.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage>
                                 {errors.businessType?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                  </div>
                  <div>
                     <FormField
                        control={control}
                        name="agreeTerms"
                        render={({ field }) => (
                           <FormItem className="flex gap-3 items-start ">
                              <FormControl>
                                 <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="mt-[14px]"
                                 />
                              </FormControl>
                              <p className="mt-0 text-sm">
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
                              <FormMessage>
                                 {errors.agreeTerms?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                  </div>
                  <Button
                     type="submit"
                     className="w-full my-6 p-7"
                     disabled={!isValid || isSubmitting}
                  >
                     {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                           <RiseLoader
                              color="#3BD64A"
                              size={10}
                           />
                           <span>Creating Account...</span>
                        </div>
                     ) : (
                        "Create Account"
                     )}
                  </Button>
                  <p className="text-center">
                     Already have an account?{" "}
                     <Link
                        href="/login"
                        className="text-main"
                     >
                        Login
                     </Link>
                  </p>
               </form>
            </Form>
         </div>
      </div>
   );
};

export default SignUp;
