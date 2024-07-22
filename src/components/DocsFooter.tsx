import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const DocsFooter = () => {
   return (
      <div className="flex flex-col gap-2 py-10">
         <div className="flex gap-6">
            <p>Was this page helpful?</p>
            <p className="flex items-center cursor-pointer">
               <ThumbsUp fill="#1E1147" />
               <span className="ml-2 text-main">Helpful</span>
            </p>
            <p className="flex items-center cursor-pointer">
               <ThumbsDown fill="#1E1147"  />
               <span className="ml-2 text-destructive ">Not helpful</span>
            </p>
         </div>

         <div className="flex items-start justify-start  border-t">
            <p>&copy; Copyright 2024. All rights reserved.</p>
         </div>
      </div>
   );
};

export default DocsFooter;
