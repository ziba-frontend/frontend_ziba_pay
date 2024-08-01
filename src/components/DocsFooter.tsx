"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getFeedbackCounts, submitFeedback } from "@/lib/api-calls/feedback";
import { usePathname } from "next/navigation";

const DocsFooter = () => {
   const pathname = usePathname(); // Get the current path
   const articleId = pathname; // Use current path as articleId
   const [helpfulCount, setHelpfulCount] = useState(0);
   const [notHelpfulCount, setNotHelpfulCount] = useState(0);
   const [userFeedback, setUserFeedback] = useState<"helpful" | "notHelpful" | null>(null);

   useEffect(() => {
      fetchFeedbackCounts();
   }, [articleId]);

   const fetchFeedbackCounts = async () => {
      try {
         const { helpfulCount, notHelpfulCount } = await getFeedbackCounts(articleId);
         setHelpfulCount(helpfulCount);
         setNotHelpfulCount(notHelpfulCount);
      } catch (error) {
         console.error("Failed to fetch feedback counts", error);
      }
   };

   const handleFeedback = async (isHelpful: boolean) => {
      if (userFeedback) return; // Prevent multiple submissions

      try {
         await submitFeedback(articleId, isHelpful);
         setUserFeedback(isHelpful ? "helpful" : "notHelpful");
         fetchFeedbackCounts(); // Update feedback counts
         toast.success("Thank you for your feedback!");
      } catch (error) {
         console.error("Failed to submit feedback", error);
         toast.error("Failed to submit feedback. Please try again.");
      }
   };

   return (
      <div className="flex flex-col gap-2 py-10">
         <div className="flex gap-6">
            <p>Was this page helpful?</p>
            <p className="flex items-center cursor-pointer" onClick={() => handleFeedback(true)}>
               <ThumbsUp className="fill-[#1E1147] thumb1" />
               <span className="ml-2 text-main helpful">Helpful</span>
            </p>
            <p className="flex items-center cursor-pointer" onClick={() => handleFeedback(false)}>
               <ThumbsDown className="fill-[#1E1147] thumb2" />
               <span className="ml-2 text-destructive helpful">Not helpful</span>
            </p>
         </div>

         <div className="flex items-start justify-start border-t">
            <p>&copy; Copyright 2024. All rights reserved.</p>
         </div>
      </div>
   );
};

export default DocsFooter;
