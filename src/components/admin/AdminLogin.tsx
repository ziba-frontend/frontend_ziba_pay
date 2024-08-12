"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
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
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  loginApi,
  signupApi
} from "@/lib/api-calls/auth-server";
import { decryptKey, encryptKey } from "@/lib/utils";
import Link from "next/link";
import RiseLoader from "react-spinners/RiseLoader";

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
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY?.toString()) {
      setOpen(false);
      router.push("/admin");
    } else {
      setOpen(true);
    }
  }, [encryptedKey, router]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { emailOrPhone, password, name } = data;
    try {
      // Try logging in first
      await loginApi({ email: emailOrPhone, password });
      // Open the modal for passkey confirmation if login succeeds
      setOpen(true);
    } catch (loginError) {
      // If login fails, attempt to sign up
      try {
        await signupApi({
          name,
          email: emailOrPhone,
          password,
          role: "admin",
        });
        // Log in after signing up
        await loginApi({ email: emailOrPhone, password });
        // Open the modal for passkey confirmation
        setOpen(true);
      } catch (signupError) {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
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
        <Link href="/" className="block md:hidden my-6">
          <Image src={logo} alt="zibaPay" width={120} />
        </Link>
        <Image
          src={adminlogin}
          alt="login ziba"
          className="w-full mb-20 block md:hidden"
        />
        <Link href="/" className="mt-6 hidden md:block z-30">
          <Image src={logo} alt="zibaPay" className="2xl:ml-[400px]" width={120} />
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
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm">{form.formState.errors.name?.message}</p>
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
                      {form.formState.errors.password && (
                        <p className="text-red-500 text-sm">{form.formState.errors.password?.message}</p>
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
                    {form.formState.errors.emailOrPhone && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.emailOrPhone?.message}
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
                    <RiseLoader color="#3BD64A" size={10} />
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* Passkey Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="p-6 max-w-md mx-auto">
            <DialogHeader>
              <h2 className="text-center">Enter Admin Passkey</h2>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey"
                className="border rounded p-3"
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="button"
                onClick={validatePasskey}
                className="bg-main w-full"
              >
                Submit Passkey
              </Button>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminLogin;
