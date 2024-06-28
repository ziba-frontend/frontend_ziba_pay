"use client";
import React, { useRef, useEffect } from "react";
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

// Define the schema
const formSchema = z.object({
   amount: z.string().min(1, { message: "Amount is required." }),
   phone: z.string().min(1, { message: "Phone number is required." }),
});

interface DrawerFormProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
}

const DrawerForm: React.FC<DrawerFormProps> = ({ isOpen, onClose, title }) => {
   const drawerRef = useRef<HTMLDivElement>(null);
   const form = useForm({
      resolver: zodResolver(formSchema),
   });

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

   const onSubmit = (data: any) => {
      console.log(data);
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
