"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import CustomFormField, { FormFieldType } from "../form/CustomFormField";
import { AddPhoneValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import PassCodeModal from "./PassCodeModal";
import SubmitButton from "../SubmitButton";
import { useSendVerificationCode } from "@/hooks/useAuth";

const AddNumberModal = () => {
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [passCodeModalOpen, setPassCodeModalOpen] = useState(false);
   const [phone, setPhone] = useState<string | null>(null);
   const sendVerificationCodeMutation = useSendVerificationCode();
   const form = useForm<z.infer<typeof AddPhoneValidation>>({
      resolver: zodResolver(AddPhoneValidation),
      defaultValues: {
         phone: "",
      },
   });

   const onSubmit = async (data: z.infer<typeof AddPhoneValidation>) => {
      console.log(data);
      setIsLoading(true);
      try {
         const response = await sendVerificationCodeMutation.mutateAsync(
            data.phone
         );
         setPhone(data.phone);
         setOpen(false);
         console.log("response: ", response);
         setPassCodeModalOpen(true);
      } catch (error) {
         console.error("Failed to send verification code", error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      console.log("phone updated: ", phone);
   }, [phone]);

   return (
      <>
         <Dialog
            open={open}
            onOpenChange={setOpen}
         >
            <DialogTrigger asChild>
               <p className="text-white">Share</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>Create Number</DialogTitle>
                  <DialogDescription>
                     Verify Your New Phone number
                  </DialogDescription>
               </DialogHeader>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="flex-1 space-y-6"
                  >
                     <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="(555) 123-4567"
                     />
                     <SubmitButton isLoading={isLoading}>
                        Send Code
                     </SubmitButton>
                  </form>
               </Form>
               <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                     <Button
                        type="button"
                        variant="secondary"
                     >
                        Close
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         <PassCodeModal
            open={passCodeModalOpen}
            onClose={() => setPassCodeModalOpen(false)}
            phone={phone ?? ""}
         />
      </>
   );
};

export default AddNumberModal;
