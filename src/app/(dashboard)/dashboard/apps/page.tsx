import { Calendar } from "lucide-react";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

const Summary = () => {
   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Application</h2>
            <div className="flex gap-3">
               <div className="bg-main flex  gap-2 items-center rounded p-2 border">
                  <p>Application</p>
               </div>

               <div className="bg-black flex  items-center justify-center rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>You don’t have any applications. </p>
         </div>
      </div>
   );
};

export default Summary;
