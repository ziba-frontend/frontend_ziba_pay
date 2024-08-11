"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import adminlogin from "../../../public/images/adminlogin.png";
import {
   loginApi,
   requestOtpApi,
   verifyOtpApi,
} from "@/lib/api-calls/auth-server";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import RiseLoader from "react-spinners/RiseLoader";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from "@/components/ui/input-otp";

// Custom validation function to check for email or phone number
const emailOrPhoneValidation = z
   .string()
   .min(1, { message: "Email or Phone number is required" })
   .refine(
      (value) =>
         /^\d{10,15}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
         message: "Invalid email or phone number",
      }
   );

const formSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   emailOrPhone: emailOrPhoneValidation,
   password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

const AdminLogin = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [otp, setOtp] = useState("");
   const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

   const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
   });

   const { watch, formState } = form;
   const emailOrPhone = watch("emailOrPhone");
   const password = watch("password");

   const onSubmit = async (data: FormData) => {
      setIsLoading(true);
      setIsOtpDialogOpen(true);
      try {
         await requestOtpApi(data);
         setIsOtpDialogOpen(true);
      } catch (error) {
         toast.error("Failed to send OTP. Please try again.");
         setIsLoading(false);
      }
   };

   const handleOtpSubmit = async () => {
      setIsLoading(true);
      try {
         await verifyOtpApi({ email, otp });
         await loginApi({ email, password });
         const redirectTo = searchParams.get("redirect") || "/dashboard";
         window.location.href = redirectTo;
      } catch (error) {
         toast.error("Invalid OTP or credentials. Please try again.");
      } finally {
         setIsLoading(false);
         setIsOtpDialogOpen(false);
      }
   };

   return (
      <div className="bg-white">
         <Image
            src={adminlogin}
            alt="login ziba"
            className="fixed top-0 left-0 bottom-0 w-[600px] h-screen z-10 hidden md:block"
         />
         <div className="flex flex-col gap-6 items-center justify-center min-h-screen z-20 border rounded-[24px] shadow-lg">
            <Link
               href="/"
               className="block md:hidden my-6"
            >
               <Image
                  src={logo}
                  alt="zibaPay"
                  width={120}
               />
            </Link>
            <Image
               src={adminlogin}
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
                  className="2xl:ml-[400px]"
                  width={120}
               />
            </Link>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full sm:w-5/6 md:w-[70%] lg:w-[60%] z-20 container p-10 shadow-lg bg-white rounded 2xl:ml-[600px] md:px-[60px] 2xl:px-[102px] 2xl:w-1/2"
               >
                  <h2 className="text-center my-6">Welcome Admin!</h2>
                  <div className="space-y-8">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="name"
                                    {...field}
                                 />
                              </FormControl>
                              {formState.errors.name && (
                                 <p className="text-red-500 text-sm">
                                    {formState.errors.name.message}
                                 </p>
                              )}
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
                                          type={
                                             showPassword ? "text" : "password"
                                          }
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
                                 {formState.errors.password && (
                                    <p className="text-red-500 text-sm">
                                       {formState.errors.password.message}
                                    </p>
                                 )}
                              </FormItem>
                           )}
                        />
                        <Link
                           href="/forgot-password"
                           target="_blank"
                           className="text-main absolute right-0 -bottom-10 underline"
                        >
                           Forgot password?
                        </Link>
                     </div>
                     <FormField
                        control={form.control}
                        name="emailOrPhone"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email or Phone number *</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="email or phone number"
                                    {...field}
                                 />
                              </FormControl>
                              {formState.errors.emailOrPhone && (
                                 <p className="text-red-500 text-sm">
                                    {formState.errors.emailOrPhone.message}
                                 </p>
                              )}
                           </FormItem>
                        )}
                     />
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
                           </div>
                        ) : (
                           "Get Started"
                        )}
                     </Button>
                  </div>
               </form>
            </Form>

            {/* OTP Dialog */}
            <Dialog
               open={isOtpDialogOpen}
               onOpenChange={setIsOtpDialogOpen}
            >
               <DialogContent className="">
                  <DialogHeader>
                     <h2 className="flex items-start justify-between">
                        Access Verification
                     </h2>
                     <small>
                        To access the admin page, please enter the passcode....
                     </small>
                  </DialogHeader>
                  <InputOTP
                     maxLength={6}
                     value={otp}
                     onChange={(value) => setOtp(value)}
                  >
                     <InputOTPGroup className="shad-otp">
                        {[...Array(6)].map((_, index) => (
                           <div
                              key={index}
                              className="border rounded-md p-6 text-center border-[#363A3D] text-main text-lg mx-1"
                           >
                              <input
                                 type="text"
                                 maxLength={1}
                                 className="w-full h-full text-center bg-transparent border-none focus:outline-none"
                                 value={otp[index] || ""}
                                 onChange={(e) => {
                                    const newOtp = otp.split("");
                                    newOtp[index] = e.target.value;
                                    setOtp(newOtp.join(""));
                                 }}
                              />
                           </div>
                        ))}
                     </InputOTPGroup>
                  </InputOTP>
                  <Button
                     onClick={handleOtpSubmit}
                     className="w-full mt-4 p-6"
                     disabled={otp.length !== 6 || isLoading}
                  >
                     {isLoading ? (
                        <RiseLoader
                           color="#3BD64A"
                           size={10}
                        />
                     ) : (
                        "Verify "
                     )}
                  </Button>
               </DialogContent>
            </Dialog>
         </div>
      </div>
   );
};

export default AdminLogin;
