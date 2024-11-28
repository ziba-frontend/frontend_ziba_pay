"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useCommentStore } from "@/store/useCommentStore";

const DocsFooter = () => {
   const pathname = usePathname();
   const {
      helpfulCount,
      notHelpfulCount,
      userComment,
      setHelpful,
      setNotHelpful,
   } = useCommentStore();

   const handleHelpfulClick = () => {
      if (userComment !== "helpful") {
         setHelpful();
         toast.success("Thanks for your feedback!");
      }
   };

   const handleNotHelpfulClick = () => {
      if (userComment !== "notHelpful") {
         setNotHelpful();
         toast.success("Thanks for your feedback!");
      }
   };

   return (
      <div className="flex flex-col gap-2 py-10">
         <div className="flex gap-6">
            <p>Was this page helpful?</p>
            <p
               className="flex items-center cursor-pointer"
               onClick={handleHelpfulClick}
            >
               <ThumbsUp
                  className={`fill-[#1E1147] ${
                     userComment === "helpful" ? "text-green-500" : ""
                  }`}
               />
               <span className="ml-2 text-main helpful">
                  Helpful ({helpfulCount})
               </span>
            </p>
            <p
               className="flex items-center cursor-pointer"
               onClick={handleNotHelpfulClick}
            >
               <ThumbsDown
                  className={`fill-[#1E1147] ${
                     userComment === "notHelpful" ? "text-red-500" : ""
                  }`}
               />
               <span className="ml-2 text-destructive helpful">
                  Not helpful ({notHelpfulCount})
               </span>
            </p>
         </div>
         <div className="flex items-start justify-start border-t">
            <p>&copy; Copyright 2024. All rights reserved.</p>
         </div>
      </div>
   );
};

export default DocsFooter;
