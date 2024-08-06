"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";

const UserSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().email("Invalid email").min(1, "Email is required"),
   businessType: z.string().min(1, "Business Type is required"),
});
export type UserFormValues = z.infer<typeof UserSchema>;

interface UserFormProps {
   user: {
      name: string;
      email: string;
      businessType: string;
   };
   onSubmit: (data: UserFormValues) => void;
   onClose: () => void;
}

const ProfileForm: React.FC<UserFormProps> = ({ user, onSubmit, onClose }) => {
   const form = useForm<UserFormValues>({
      resolver: zodResolver(UserSchema),
      defaultValues: user,
   });

   useEffect(() => {
      form.reset(user);
   }, [user, form]);

   const handleSubmit = (data: UserFormValues) => {
      onSubmit(data);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormItem>
               <FormLabel>Name</FormLabel>
               <FormControl>
                  <Controller
                     name="name"
                     control={form.control}
                     render={({ field }) => (
                        <Input placeholder="Name" {...field} />
                     )}
                  />
               </FormControl>
               <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
            <FormItem>
               <FormLabel>Email</FormLabel>
               <FormControl>
                  <Controller
                     name="email"
                     control={form.control}
                     render={({ field }) => (
                        <Input placeholder="Email" {...field} />
                     )}
                  />
               </FormControl>
               <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
            <FormItem>
               <FormLabel>Business Type</FormLabel>
               <FormControl>
                  <Controller
                     name="businessType"
                     control={form.control}
                     render={({ field }) => (
                        <Input placeholder="Business Type" {...field} />
                     )}
                  />
               </FormControl>
               <FormMessage>{form.formState.errors.businessType?.message}</FormMessage>
            </FormItem>
            <div className="flex justify-end space-x-4">
               <Button variant="outline" onClick={onClose}>Cancel</Button>
               <Button type="submit">Update</Button>
            </div>
         </form>
      </Form>
   );
};

export default ProfileForm;
