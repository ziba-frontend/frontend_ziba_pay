import { Calendar } from "lucide-react";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

const Links = () => {
   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Payment Links</h2>
            <div className="flex gap-3">
               <div className="bg-main flex  gap-2 items-center rounded p-2 border">
                  <p>Links</p>
               </div>

               <div className="bg-black flex  items-center justify-center rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>You don’t have any payment links</p>
         </div>
      </div>
   );
};

export default Links;
