"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import AddNumberModal from "@/components/modals/AddNumberModal";
import { getVerifiedPhoneNumbers } from "@/lib/api-calls/auth-server";

type Numbers = {
   number: string;

};

const NumbersComponent: React.FC = () => {
   const [numbers, setNumbers] = useState<Numbers[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchNumbers = async () => {
         try {
            const data = await getVerifiedPhoneNumbers();
            console.log("Here are are numbers: ",data.data)
            setNumbers(data.data.verifiedPhoneNumbers || []);
         } catch (error) {
            setError("Failed to fetch verified numbers");
         } finally {
            setLoading(false);
         }
      };

      fetchNumbers();
   }, []);

   const columns: ColumnDef<Numbers>[] = [ 
      {
         header: "#",
         cell: ({ row }) => {
            return <p className="text-14-medium text-dark-700">{row.index + 1}</p>;
         },
      },    
      {
         accessorKey: "number",
         header: "Number",
         cell: ({ row }) => {
            return (
               <div className="flex gap-2 items-center">
                  <p>{row.getValue("number")} </p>
               </div>
            );
         },
      },
   ];

   return (
      <div>
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-2 gap-4">
            <h2>Verified Phone Numbers</h2>
            <div className="flex gap-3">
               <div className="bg-main flex gap-2 items-center rounded p-2 border">
                  <AddNumberModal />
               </div>
               <div className="bg-black flex items-center justify-center rounded p-2 text-white cursor-pointer" onClick={() => window.location.reload()}>
                  <p>Refresh</p>
               </div>
            </div>
         </div>
         {loading ? (
            <div className="flex items-center justify-center py-6">
               <p>Loading...</p>
            </div>
         ) : error ? (
            <div className="flex items-center justify-center py-6">
               <p>{error}</p>
            </div>
         ) : numbers.length > 0 ? (
            <div className="py-6 w-full ">
               <DataTable
                  columns={columns}
                  data={numbers}
               />
            </div>
         ) : (
            <div className="flex items-center justify-center p-12 bg-br my-6">
               <p>You don’t have any verified phone numbers.</p>
            </div>
         )}
      </div>
   );
};

export default page;
