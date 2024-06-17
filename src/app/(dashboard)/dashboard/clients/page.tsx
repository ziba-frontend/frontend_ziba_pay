import { Calendar } from "lucide-react";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

const Clients = () => {
   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <div>
               <h2>Clients</h2>
               <p>Today: 13th January 2023</p>
            </div>
            <div className="flex gap-3">
               <div className="bg-white flex  gap-2 items-center rounded p-2 border">
                  <Calendar />
                  <p>January</p>
                  <p>2023</p>
               </div>

               <div className="bg-black flex  items-center justify-center rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>No Clients found at the moment.</p>
         </div>
      </div>
   );
};

export default Clients;
