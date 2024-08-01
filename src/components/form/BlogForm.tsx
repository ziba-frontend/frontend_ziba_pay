"use client";

import React, { useEffect } from "react";
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
import { Textarea } from "../ui/textarea";
import Uploader from "../Uploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Blog = {
   id: string;
   title: string;
   image: string;
   description: string;
   content: string;
};

const BlogSchema = z.object({
   title: z.string().min(1, "Title is required"),
   image: z.string().min(1, "Image URL is required"),
   description: z.string().min(1, "Description is required"),
   content: z.string().min(1, "Content is required"),
});

type BlogFormValues = z.infer<typeof BlogSchema>;

interface BlogFormProps {
   blog?: Blog | null;
   onSubmit: (data: BlogFormValues) => void;
   onClose: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit, onClose }) => {
   const form = useForm<BlogFormValues>({
      resolver: zodResolver(BlogSchema),
      defaultValues: blog || {
         title: "",
         image: "",
         description: "",
         content: "",
      },
   });

   useEffect(() => {
      if (blog) {
         form.reset(blog);
      }
   }, [blog]);

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 "
         >
            <FormItem>
               <FormLabel>Title</FormLabel>
               <FormControl>
                  <Controller
                     name="title"
                     control={form.control}
                     render={({ field }) => (
                        <Input
                           placeholder="Title"
                           {...field}
                        />
                     )}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
            <FormItem>
               <FormLabel>Image </FormLabel>
               <FormControl>
                  <Uploader />
               </FormControl>
               <FormMessage />
            </FormItem>
            <FormItem>
               <FormLabel>Description</FormLabel>
               <FormControl>
                  <Controller
                     name="description"
                     control={form.control}
                     render={({ field }) => (
                        <Input
                           placeholder="Description"
                           {...field}
                        />
                     )}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
            <FormItem>
               <FormLabel>Content</FormLabel>
               <FormControl>
                  <Controller
                     name="content"
                     control={form.control}
                     render={({ field }) => (
                        <ReactQuill
                           placeholder="Content"
                           className="rounded"
                        />
                     )}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
            <div className="flex justify-end space-x-4">
               <Button
                  variant="outline"
                  onClick={onClose}
               >
                  Cancel
               </Button>
               <Button type="submit">{blog ? "Update" : "Create"}</Button>
            </div>
         </form>
      </Form>
   );
};

export default BlogForm;
