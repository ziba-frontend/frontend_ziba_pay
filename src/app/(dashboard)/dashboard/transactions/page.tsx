import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import React from "react";

const Transactions = () => {
   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Transactions</h2>
            <div className="flex gap-3">
               <div className="bg-black flex flex-col gap-2 items-end rounded p-2 text-white">
                  <h5>RWF 0</h5>
                  <p>MTN Balance</p>
               </div>
               <div className="bg-black flex flex-col gap-2 items-end rounded p-2 text-white">
                  <h5>RWF 0</h5>
                  <p>Airtel Balance</p>
               </div>
               <div className="bg-black flex flex-col gap-2 items-end rounded p-2 text-white">
                  <h5>RWF 0</h5>
                  <p>Total Balance</p>
               </div>
            </div>
         </div>
         <div className="gap-6 flex flex-wrap p-6 border my-6">
            <div className="">
               {" "}
               <Select>
                  <SelectTrigger className="">
                     <SelectValue placeholder="Kind" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Nigeria">Nigeria</SelectItem>
                     <SelectItem value="Ghana">Ghana</SelectItem>
                     <SelectItem value="Rwanda">Rwanda</SelectItem>
                     <SelectItem value="Kenya">Kenya</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="">
               {" "}
               <Select>
                  <SelectTrigger className="">
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Nigeria">Nigeria</SelectItem>
                     <SelectItem value="Ghana">Ghana</SelectItem>
                     <SelectItem value="Rwanda">Rwanda</SelectItem>
                     <SelectItem value="Kenya">Kenya</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="">
               {" "}
               <Select>
                  <SelectTrigger className="">
                     <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Nigeria">Nigeria</SelectItem>
                     <SelectItem value="Ghana">Ghana</SelectItem>
                     <SelectItem value="Rwanda">Rwanda</SelectItem>
                     <SelectItem value="Kenya">Kenya</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="flex items-center justify-center border px-4">
               CashIn
            </div>
            <div className="flex items-center justify-center border px-4">
               CashOut
            </div>
         </div>
         <div className="flex items-center justify-between my-2">
            <div>
               {" "}
               <p>All Transactions</p>
               <p>10-01-2023 / 10-02-2023 </p>
            </div>

            <div className="flex gap-3">
               <div className="bg-black flex  gap-2 items-end rounded p-2 text-white">
                  <Settings />
                  <p>Filters</p>
               </div>
               <div className="bg-black flex   items-end rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>No Transactions found from 10-01-2023 / 10-02-2023.</p>
         </div>
      </div>
   );
};

export default Transactions;
