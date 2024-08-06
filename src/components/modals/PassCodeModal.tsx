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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyPhoneNumber } from "@/lib/api-calls/auth-server";

interface PassCodeModalProps {
  open: boolean;
  onClose: () => void;
  phone: string;
}

const PassCodeModal = ({ open, onClose, phone }: PassCodeModalProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const validateVerificationCode = async () => {
    try {
      await verifyPhoneNumber(phone, verificationCode); 
      onClose();
    } catch (err) {
      setError("Invalid or expired code");
      console.error("Error during verification:", err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Verify Your Phone number
            <img
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={onClose}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To start making mobile money transactions with this number, please enter the verification code.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={verificationCode}
            onChange={(value) => setVerificationCode(value)}
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
            onClick={validateVerificationCode}
            className="shad-primary-btn w-full"
          >
            Verify Code
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassCodeModal;
