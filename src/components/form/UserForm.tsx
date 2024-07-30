"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


type User = {
  id: string;
  name: string;
  email: string;
};

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  role: z.string().min(1, "Role is required"),
});

type UserFormValues = z.infer<typeof UserSchema>;

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormValues) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onClose }) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: { name: "", email: "", role: "" },
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
    } else {
      form.reset({ name: "", email: "", role: "" });
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => <Input placeholder="Name" {...field} />}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => <Input placeholder="Email" {...field} />}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{user ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;