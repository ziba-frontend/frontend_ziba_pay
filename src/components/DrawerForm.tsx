"use client";
import React, { useRef, useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDeposit, useWithdraw } from "@/hooks/useTransaction";

// Define the schema
const formSchema = z.object({
   amount: z.string().min(1, { message: "Amount is required." }),
   phone: z.string().min(1, { message: "Phone number is required." }),
   paymentMethod: z.enum(["mtn", "airtel"], {
      required_error: "Payment method is required.",
   }),
});

interface DrawerFormProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
}

const DrawerForm: React.FC<DrawerFormProps> = ({ isOpen, onClose, title }) => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const drawerRef = useRef<HTMLDivElement>(null);
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

   const { mutateAsync: deposit, isPending: isDepositing } = useDeposit();
   const { mutateAsync: withdraw, isPending: isWithdrawing } = useWithdraw();

   const handleOutsideClick = (event: MouseEvent) => {
      if (
         drawerRef.current &&
         !drawerRef.current.contains(event.target as Node)
      ) {
         onClose();
      }
   };

   useEffect(() => {
      if (isOpen) {
         document.addEventListener("mousedown", handleOutsideClick);
      } else {
         document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [isOpen]);

   const onSubmit = async (data: any) => {
      const amount = parseFloat(data.amount);
      const paymentMethod = data.paymentMethod;

      try {
         if (title === "Cash-in") {
            await deposit({ paymentMethod, amount });
         } else {
            await withdraw({ paymentMethod, amount });
         }
         alert("Transaction successful");
         router.refresh();
         onClose();
      } catch (error) {
         alert("Transaction failed");
      }
   };

   return (
      <Drawer open={isOpen}>
         <FocusLock>
            <DrawerTrigger></DrawerTrigger>
            <DrawerContent
               ref={drawerRef}
               className="bg-transparent fixed z-50 left-0 md:left-1/2 top-20 transform md:-translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-auto max-h-[90%] rounded-lg shadow-lg p-6 "
            >
               <DrawerHeader className="bg-background flex justify-between items-center">
                  <DrawerTitle>{title}</DrawerTitle>
                  <button
                     onClick={onClose}
                     className="text-main"
                  >
                     <FaTimes />
                  </button>
               </DrawerHeader>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-8 w-5/6 md:w-full p-6 bg-white"
                  >
                     <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border"
                                    placeholder="Amount"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-white p-6 outline-none border "
                                    placeholder="Phone number"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                           <FormItem className="flex items-center gap-2">
                              <FormLabel>Payment Method</FormLabel>
                              <FormControl>
                                 <select
                                    {...field}
                                    className="bg-white p-2 outline-none border"
                                 >
                                    <option value="">Payment Method</option>
                                    <option value="mtn">MTN</option>
                                    <option value="airtel">Airtel</option>
                                 </select>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="flex gap-4 flex-row items-center ">
                        <p
                           className="text-red-600 cursor-pointer"
                           onClick={onClose}
                        >
                           Cancel
                        </p>
                        <Button type="submit">{title}</Button>
                     </div>
                  </form>
               </Form>
            </DrawerContent>
         </FocusLock>
      </Drawer>
   );
};

export default DrawerForm;
