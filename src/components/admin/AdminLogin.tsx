"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import logo from "../../../public/svg/logo.svg";
import adminlogin from "../../../public/images/adminlogin.png";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import RiseLoader from "react-spinners/RiseLoader";
import PassCodeAdminModal from "../modals/PassCodeAdminModal";
import { useLogin, useSignup } from "@/hooks/useAuth";


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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { mutate: loginUser } = useLogin();
  const { mutate: signupUser } = useSignup();

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    const { emailOrPhone, password, name } = data;
    setEmail(emailOrPhone);

    loginUser(
      { email: emailOrPhone, password },
      {
        onSuccess: () => {
          setOpen(true);
        },
        onError: () => {
          signupUser(
            { name, email: emailOrPhone, password, role: "admin" },
            {
              onSuccess: () => {
                loginUser(
                  { email: emailOrPhone, password },
                  { onSuccess: () => setOpen(true) }
                );
              },
              onError: () => {
                toast.error("Signup failed. Please try again.");
              },
            }
          );
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/admin");
  };

  return (
    <div className="bg-white">
      <Image
        src={adminlogin}
        alt="login ziba"
        className="fixed top-0 left-0 bottom-0 w-[600px] h-screen z-10 hidden md:block"
      />
      <div className="flex flex-col gap-6 items-center justify-center min-h-screen z-20 border rounded-[24px] shadow-lg">
        <Link href="/" className="block md:hidden my-6">
          <Image src={logo} alt="zibaPay" width={120} />
        </Link>
        <Image
          src={adminlogin}
          alt="login ziba"
          className="w-full mb-20 block md:hidden"
        />
        <Link href="/" className="mt-6 hidden md:block z-30">
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
              {/* Name Field */}
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
                  </FormItem>
                )}
              />
              {/* Password Field */}
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
                  </FormItem>
                )}
              />
              {/* Email/Phone Field */}
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
                    <RiseLoader color="#3BD64A" size={10} />
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {email && (
          <PassCodeAdminModal open={open} onClose={closeModal} email={email} />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
