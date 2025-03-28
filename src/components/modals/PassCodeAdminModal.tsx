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
   onVerify: (verify: boolean) => any;
}

const PassCodeAdminModal = ({
   open,
   email,
   onClose,
   onVerify,
}: PassCodeModalProps) => {
   const [otp, setOtp] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);


   const otpMutation = useVerifyOtp();

   const validateOtp = async () => {
      setIsSubmitting(true);
      try {
         console.log("Here is the email: ", email)
         await otpMutation.mutateAsync({ email, otpCode: otp });
         onVerify(true);
      } catch (error) {
         console.error("Error during verification:", error);
         onVerify(false);
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleClose = () => {
      onClose();
   };
   return (
      <AlertDialog
         open={open}
         onOpenChange={handleClose}
      >
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
                  Enter the 6-digit verification code sent to your email to
                  continue.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
               <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
               >
                  <InputOTPGroup className="shad-otp">
                     <InputOTPSlot
                        className="shad-otp-slot"
                        index={0}
                     />
                     <InputOTPSlot
                        className="shad-otp-slot"
                        index={1}
                     />
                     <InputOTPSlot
                        className="shad-otp-slot"
                        index={2}
                     />
                     <InputOTPSlot
                        className="shad-otp-slot"
                        index={3}
                     />
                     <InputOTPSlot
                        className="shad-otp-slot"
                        index={4}
                     />
                     <InputOTPSlot
                        className="shad-otp-slot"
                        index={5}
                     />
                  </InputOTPGroup>
               </InputOTP>

              
            </div>
            <AlertDialogFooter>
               <AlertDialogAction
                  onClick={validateOtp}
                  className={`shad-primary-btn w-full ${
                     isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
               >
                  {isSubmitting ? "Verifying..." : "Verify"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default PassCodeAdminModal;
