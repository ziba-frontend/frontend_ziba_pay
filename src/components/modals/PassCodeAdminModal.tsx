"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useVerifyOtp } from "@/hooks/useAuth";

interface PassCodeModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
}

const PassCodeAdminModal = ({ open, email, onClose }: PassCodeModalProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { mutate: verifyOtpMutation, isPending } = useVerifyOtp();

  const validateOtp = () => {
    verifyOtpMutation(
      { email, otpCode: otp },
      {
        onSuccess: () => {
          onClose();
          router.push("/admin");
        },
        onError: (error:any) => {
          setError("Invalid or expired code");
          console.error("Error during verification:", error);
        },
      }
    );
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Verify Your Email
            <img
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={handleClose}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter the 6-digit verification code sent to your email to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validateOtp}
            className={`shad-primary-btn w-full ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassCodeAdminModal;
