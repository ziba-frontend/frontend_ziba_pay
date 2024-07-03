"use client";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { z } from "zod";
import DrawerForm from "@/components/DrawerForm";
import Link from "next/link";

// Define the schema
const formSchema = z.object({
   username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
   }),
   issue: z.string().min(1, { message: "Issue is required." }),
   email: z.string().email({ message: "Invalid email address." }),
   subject: z.string().min(1, { message: "Subject is required." }),
});

type Props = {};
type Payment = {
   name: string;
   date: string;
   amount: string;
   status: string;
};

const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: "name",
      header: "Transactions",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <p>{row.getValue("name")} </p>
            </div>
         );
      },
   },
   {
      accessorKey: "date",
      header: "Date",
   },
   {
      accessorKey: "amount",
      header: "Amount",
   },
   {
      accessorKey: "status",
      header: "Status",
   },
];

const data: Payment[] = [
   {
      name: "John Doe",
      date: "2023-01-01",
      amount: "4000FRW",
      status: "Pending",
   },
   {
      name: "Alice Smith",
      date: "2023-02-15",
      amount: "2.5$",
      status: "Completed",
   },

   {
      name: "Mia Gonzalez",
      date: "2023-12-08",
      amount: "6.8$",
      status: "Failed",
   },
];
const Transactions = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [drawerTitle, setDrawerTitle] = useState<string>("");

   const handleOpenDrawer = (title: string) => {
      setDrawerTitle(title);
      setIsDrawerOpen(true);
   };
   return (
      <div>
         <div className="flex md:items-center md:justify-between my-2 flex-col  sm:gap-4 md:flex-row gap-6">
            <h2>Transactions</h2>
            <div className="flex gap-3 flex-row">
               <div className="bg-black flex w-fit flex-col gap-2 items-end rounded p-2 text-white ">
                  <h5>RWF 0</h5>
                  <p>MTN Balance</p>
               </div>
               <div className="bg-black flex w-fit flex-col gap-2 items-end rounded p-2 text-white ">
                  <h5>RWF 0</h5>
                  <p>Airtel Balance</p>
               </div>
               <div className="bg-black flex w-fit flex-col gap-2 items-end rounded p-2 text-white ">
                  <h5>RWF 0</h5>
                  <p>Total Balance</p>
               </div>
            </div>
         </div>
         <div className="gap-6 flex flex-wrap p-1 sm:p-6 border my-6 items-center">
            <div className="">
               {" "}
               <Select>
                  <SelectTrigger className="">
                     <SelectValue placeholder="Kind" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Business">Business</SelectItem>
                     <SelectItem value="Credit">Credit</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="">
               {" "}
               <Select>
                  <SelectTrigger className="">
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-1 sm:p-2">
                     <SelectItem value="Pending">Pending</SelectItem>
                     <SelectItem value="Completed">Completed</SelectItem>
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
                     <SelectItem value="MTN">MTN</SelectItem>
                     <SelectItem value="Airtel">Airtel</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div
               className="flex items-center justify-center border px-4 cursor-pointer "
               onClick={() => handleOpenDrawer("Cash In")}
            >
               CashIn
            </div>
            <div
               className="flex items-center justify-center border px-4 cursor-pointer"
               onClick={() => handleOpenDrawer("Cash Out")}
            >
               CashOut
            </div>
            <Link href="/checkout">checkout</Link>
         </div>
         <div className="flex items-center justify-between my-2">
            <div>
               {" "}
               <p>All Transactions</p>
               <p>10-01-2023 / 10-02-2023 </p>
            </div>

            <div className="flex gap-3">
               <div className="bg-black hidden sm:flex  sm:gap-2 items-end rounded p-2 text-white">
                  <Settings />
                  <p>Filters</p>
               </div>
               <div className="bg-black flex w-fit   items-end rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>
         <div className="py-6 w-full  overflow-x-scroll ">
            <DataTable
               columns={columns}
               data={data}
            />
         </div>

         {/* =========CONDITIONAL RENDERING============== */}
         {/*          
         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>No Transactions found from 10-01-2023 / 10-02-2023.</p>
         </div> */}

         {/* CASH_IN */}

         {/* DrawerForm Component */}
         <DrawerForm
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title={drawerTitle}
         />
      </div>
   );
};

export default Transactions;
