"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { createBlog, updateBlog } from "@/lib/api-calls/blog";
import { toast } from "react-hot-toast";
import BlogForm, { BlogFormValues } from "../form/BlogForm";

type Blog = {
   id: string;
   title: string;
   image?: string;
   description: string;
   content: string;
};

interface BlogModalProps {
   blog: Blog | null;
   onClose: () => void;
   onSuccess: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose, onSuccess }) => {
   const [open, setOpen] = useState(false);

   useEffect(() => {
      setOpen(true);
   }, [blog]);

   const handleSubmit = async (data: BlogFormValues) => {

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('content', data.content);

      if (data.image instanceof File) {
         formData.append('image', data.image);
     }
      try {
         if (blog) {
            await updateBlog(blog.id, formData);
            toast.success("Blog updated successfully");
         } else {
            await createBlog(formData);
            toast.success("Blog created successfully");
         }
         onSuccess();
      } catch (error) {
         toast.error("Failed to save blog");
      } finally {
         setOpen(false);
         onClose();
      }
   };

   const handleClose = () => {
      setOpen(false);
      onClose();
   };

   return (
      <Dialog
         open={open}
         onOpenChange={handleClose}
         
      >
         <DialogContent className=" max-h-[90vh] overflow-y-scroll no-scrollbar">
            <DialogHeader className="mb-4 space-y-3 ">
               <DialogTitle>{blog ? "Update Blog" : "Create Blog"}</DialogTitle>
            </DialogHeader>
            <BlogForm
               blog={blog}
               onSubmit={handleSubmit}
               onClose={handleClose}
            />
         </DialogContent>
      </Dialog>
   );
};

export default BlogModal;
