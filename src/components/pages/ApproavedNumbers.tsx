"use client";

import React from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

type Props = {};
type Numbers = {
   number: string;
   provider: string;
   amount: string;
};

const data: Numbers[] = [
   {
      number: "+250000000",
      provider: "MTN",
      amount: "4000FRW",
   },
   {
      number: "1234567890",
      provider: "Airtel",
      amount: "2.5$",
   },
   {
      number: "9876543219",
      provider: "MTN",
      amount: "6.8$",
   },
];

const NumbersComponent = (props: Props) => {
   const columns: ColumnDef<Numbers>[] = [
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
      {
         accessorKey: "provider",
         header: "Provider",
      },
      {
         accessorKey: "amount",
         header: "Amount",
      },
   ];

   const router=useRouter()
   const handleRefresh = () => {
      router.refresh();
   };
   return (
      <div>
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-2 gap-4">
            <h2>Testing Numbers</h2>
            <div className="flex gap-3">
               <div className="bg-main flex gap-2 items-center rounded p-2 border">
                  <p className="text-white">Number</p>
               </div>
               <div className="bg-black flex items-center justify-center rounded p-2 text-white cursor-pointer" onClick={handleRefresh}>
                  <p>Refresh</p>
               </div>
            </div>
         </div>
         <div className="py-6 w-full ">
            <DataTable
               columns={columns}
               data={data}
            />
         </div>
         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>You don’t have any testing Numbers.</p>
         </div>
      </div>
   );
};

export default NumbersComponent;
