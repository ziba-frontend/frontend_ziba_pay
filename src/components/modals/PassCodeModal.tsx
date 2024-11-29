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
import { useVerifyPhoneNumber } from "@/hooks/useAuth"; 
import { toast } from "react-hot-toast";

interface PassCodeModalProps {
  open: boolean;
  onClose: () => void;
  phone: string;
}

const PassCodeModal = ({ open, onClose, phone }: PassCodeModalProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const verifyPhoneMutation = useVerifyPhoneNumber();

  const validateVerificationCode = async () => {
    if (!verificationCode || verificationCode.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }


    try {
      await verifyPhoneMutation.mutateAsync({phone, code: verificationCode });
      onClose();
      toast.success("Phone number verified successfully!");
    } catch (err: any) {
      setError("Invalid or expired code.");
      console.error("Error during verification:", err);
    } 
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Verify Your Phone Number
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
            onChange={(value) => {
              setVerificationCode(value);
              if (error) setError(""); 
            }}
          >
            <InputOTPGroup className="shad-otp">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot className="shad-otp-slot" index={index} key={index} />
              ))}
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
            disabled={verifyPhoneMutation.isPending}
          >
            {verifyPhoneMutation.isPending ? "Verifying..." : "Verify Code"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassCodeModal;
