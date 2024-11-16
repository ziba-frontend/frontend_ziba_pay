"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";

const DocsFooter = () => {
   const pathname = usePathname(); 
   const articleId = pathname; 
   const [helpfulCount, setHelpfulCount] = useState(0);
   const [notHelpfulCount, setNotHelpfulCount] = useState(0);
   const [userFeedback, setUserFeedback] = useState<
      "helpful" | "notHelpful" | null
   >(null);

   return (
      <div className="flex flex-col gap-2 py-10">
         <div className="flex gap-6">
            <p>Was this page helpful?</p>
            <p
               className="flex items-center cursor-pointer"
               
            >
               <ThumbsUp className="fill-[#1E1147] thumb1" />
               <span className="ml-2 text-main helpful">Helpful</span>
            </p>
            <p
               className="flex items-center cursor-pointer"
              
            >
               <ThumbsDown className="fill-[#1E1147] thumb2" />
               <span className="ml-2 text-destructive helpful">
                  Not helpful
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
