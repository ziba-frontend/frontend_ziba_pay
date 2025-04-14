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

const formSchema = z
   .object({
      firstName: z.string().min(1, { message: "First name is required." }),
      lastName: z.string().min(1, { message: "Last name is required." }),
      email: z.string().email({ message: "Invalid email address." }),
      password: z
         .string()
         .min(8, { message: "Password must be at least 8 characters long." })
         .regex(/[A-Z]/, {
            message: "Password must contain an uppercase letter.",
         })
         .regex(/[a-z]/, {
            message: "Password must contain a lowercase letter.",
         })
         .regex(/\d/, { message: "Password must contain a number." })
         .regex(/[@$!%*?&#]/, {
            message: "Password must contain a special character.",
         }),
      confirmPassword: z.string().min(8, {
         message: "Confirm password is required.",
      }),
      businessName: z
         .string()
         .min(1, { message: "Business name is required." }),
      businessType: z
         .string()
         .min(1, { message: "Business type is required." }),
      country: z.string().min(1, { message: "Country is required." }),
      phoneNumber: z
         .string()
         .min(1, { message: "Phone number is required." })
         .max(15, {
            message: "Phone number must be at most 15 characters long.",
         })
         .regex(/^[0-9]{8,15}$/, {
            message:
               "Enter only digits without country code or special characters.",
         }),
      howHear: z.string().optional(),
      agreeTerms: z.literal(true, {
         errorMap: () => ({
            message: "You must agree to the terms and conditions",
         }),
      }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
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

const references = [
   { value: "social_media", label: "Social Media" },
   { value: "friend", label: "Friend" },
   { value: "advertisement", label: "Advertisement" },
   { value: "search_engine", label: "Search Engine" },
   { value: "event", label: "Event" },
   { value: "other", label: "Other" },
];

const countryCodes = [
   { value: "234", label: "🇳🇬 234" },
   { value: "250", label: "🇷🇼 250" },
   { value: "254", label: "🇰🇪 254" },
   { value: "255", label: "🇹🇿 255" },
   { value: "27", label: "🇿🇦 27" },
   { value: "256", label: "🇺🇬 256" },
   { value: "251", label: "🇪🇹 251" },
   { value: "20", label: "🇪🇬 20" },
   { value: "1", label: "🇺🇸 1" },
];

const SignUp = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [countryCode, setCountryCode] = useState("250");

   const form = useForm({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
         email: "",
         password: "",
         firstName: "",
         lastName: "",
         businessName: "",
         confirmPassword: "",
         businessType: "",
         country: "",
         howHear: "",
         phoneNumber: "",
         agreeTerms: false,
      },
   });

   const {
      watch,
      handleSubmit,
      control,
      formState: { errors, isValid },
   } = form;

   const registerUserMutation = useSignup();
   const onSubmit = async (data: any) => {
      setIsSubmitting(true);

      const { agreeTerms, confirmPassword } = data;
      const formattedPhoneNumber = `+${countryCode}${data.phoneNumber.replace(
         /^0+/,
         ""
      )}`;
      const submissionData = { ...data, phoneNumber: formattedPhoneNumber };
      try {
         const response = await registerUserMutation.mutateAsync(
            submissionData
         );
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

   // Function to get the label for the selected country code
   const getSelectedCountryCodeLabel = () => {
      const selectedCode = countryCodes.find(code => code.value === countryCode);
      return selectedCode ? selectedCode.label : "Code";
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
                     <FormField
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="Enter your name"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {errors.firstName?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="Enter your name"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {errors.lastName?.message}
                              </FormMessage>
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
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Confirm Password *</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       className="bg-white p-6 border pr-10"
                                       placeholder="Confirm your password"
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
                                 {errors.confirmPassword?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                 <div className="flex gap-1 items-center">
                                    <div className="relative flex items-center">
                                       <span className="absolute left-2 text-gray-500">
                                          +
                                       </span>
                                       <Select
                                          value={countryCode}
                                          onValueChange={setCountryCode}
                                       >
                                          <SelectTrigger className="bg-white border w-28 pl-5 py-6">
                                             <SelectValue>
                                                {getSelectedCountryCodeLabel()}
                                             </SelectValue>
                                          </SelectTrigger>
                                          <SelectContent className="max-h-60">
                                             {countryCodes.map((code) => (
                                                <SelectItem
                                                   key={code.value}
                                                   value={code.value}
                                                >
                                                   {code.label}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                    </div>
                                    <Input
                                       className="bg-white p-6 border flex-1"
                                       placeholder="Phone number without country code"
                                       type="tel"
                                       inputMode="numeric"
                                       {...field}
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage>
                                 {errors.phoneNumber?.message}
                              </FormMessage>
                              <p className="text-xs text-gray-500 mt-1">
                                 Enter only digits (e.g., 712345678)
                              </p>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="country"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 border pr-10"
                                    placeholder="Enter your country"
                                    type={"text"}
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage>
                                 {errors.country?.message}
                              </FormMessage>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={control}
                        name="businessName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Business Name *</FormLabel>
                              <Input
                                 className="bg-white p-6 border"
                                 placeholder="Enter your business name"
                                 {...field}
                              />
                              <FormMessage>
                                 {errors.businessName?.message}
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
                     <FormField
                        control={control}
                        name="howHear"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>
                                 How did you hear about us ?{" "}
                              </FormLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger className="bg-white p-6 border">
                                       <SelectValue placeholder="Select your answer" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {references.map((type) => (
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
                                 {errors.howHear?.message}
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
                                 in line with Ziba pay's
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