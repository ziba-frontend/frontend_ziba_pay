import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const DocsReview = () => {
   return (
      <div className="flex gap-4 items-center">
         <h4>Was this helpful ?</h4>
         <span className="cursor-pointer">
            <ThumbsUp color="green" />
         </span>
         <span className="cursor-pointer">
            <ThumbsDown color="red" />
         </span>
      </div>
   );
};

export default DocsReview;
