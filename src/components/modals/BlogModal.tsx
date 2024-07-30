"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { createBlog, updateBlog } from "@/lib/api-calls/admin";
import { toast } from "react-hot-toast";
import BlogForm from "../form/BlogForm";

type Blog = {
   id: string;
   title: string;
   image: string;
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

   const handleSubmit = async (data: {
      title: string;
      image: string;
      description: string;
      content: string;
   }) => {
      try {
         if (blog) {
            await updateBlog(blog.id, data);
            toast.success("Blog updated successfully");
         } else {
            await createBlog(data);
            toast.success("Blog created successfully");
         }
         onSuccess();
      } catch (error) {
         toast.error("Failed to save blog");
      } finally {
         setOpen(false); // Close the modal
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
