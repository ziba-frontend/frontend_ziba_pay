// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import DrawerForm from "@/components/DrawerForm";
import Link from "next/link";
import RiseLoader from "react-spinners/RiseLoader";
import { z } from "zod";
import { getSentTransaction } from "@/lib/api-calls/transaction";
import CategoryBadge from "@/components/CategoryBadge";
import { getUserProfile } from "@/lib/api-calls/auth-server";

// Define the schema
const formSchema = z.object({
   username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
   }),
   issue: z.string().min(1, { message: "Issue is required." }),
   email: z.string().email({ message: "Invalid email address." }),
   subject: z.string().min(1, { message: "Subject is required." }),
});

type Payment = {
   recipient: {
      name: string;
      phoneNumber: string;
   };
   date: string;
   amount: number;
   status: string;
   createdAt: string;
};

const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: "recipient.name",
      header: "Recipient",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <p>{row.original.recipient.name}</p>
            </div>
         );
      },
   },
   {
      accessorKey: "recipient.phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <p>{row.original.recipient.phoneNumber}</p>
            </div>
         );
      },
   },
   {
      accessorKey: "amount",
      header: "Amount",
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         const status = row.original.status;
         let statusClass = "";

         if (status === "pending") {
            statusClass = "text-blue-500 bg-blue-100";
         } else if (status === "completed") {
            statusClass = "text-green-500 bg-green-100";
         } else if (status === "cancelled") {
            statusClass = "text-red-500 bg-red-100";
         }

         return (
            <div className={`px-2 py-1 rounded ${statusClass}`}>{status}</div>
         );
      },
   },
   {
      accessorKey: "createdAt",
      header: "Date",
   },
];

const Transactions = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [drawerTitle, setDrawerTitle] = useState<string>("");
   const [data, setData] = useState<Payment[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [profile, setProfile] = useState<{
      balance: number;
      balanceMTN: number;
      balanceAirtel: number;
   } | null>(null);

   const handleOpenDrawer = (title: string) => {
      setDrawerTitle(title);
      setIsDrawerOpen(true);
   };

   useEffect(() => {
      const fetchAllTransactions = async () => {
         try {
            const transactions = await getSentTransaction();
            console.log("Transactions retrieved are:", transactions);
            setData(transactions);
         } catch (error) {
            console.error("Error while getting all transactions:", error);
         } finally {
            setLoading(false);
         }
      };

      const fetchUserProfile = async () => {
         try {
            const userProfile = await getUserProfile();
            setProfile(userProfile);
            console.log("The user proifle: ", userProfile);
         } catch (error) {
            console.error("Error fetching user profile:", error);
         }
      };

      fetchAllTransactions();
      fetchUserProfile();
   }, []);

   if (loading) {
      return (
         <div className="w-full h-screen flex items-center justify-center">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return (
      <div>
         <div className="flex md:items-center md:justify-between my-2 flex-col sm:gap-4 md:flex-row gap-6">
            <h2>Transactions</h2>

            <div className="flex gap-3 flex-row">
               <div className="bg-black flex w-fit flex-col gap-2 items-end rounded p-2 text-white">
                  <h5>RWF {profile?.balanceMTN || 0}</h5>
                  <p>MTN Balance</p>
               </div>
               <div className="bg-black flex w-fit flex-col gap-2 items-end rounded p-2 text-white">
                  <h5>RWF {profile?.balanceAirtel || 0}</h5>
                  <p>Airtel Balance</p>
               </div>
               <div className="bg-black flex w-fit flex-col gap-2 items-end rounded p-2 text-white">
                  <h5>RWF {profile?.balance || 0}</h5>
                  <p>Total Balance</p>
               </div>
            </div>
         </div>
         <div className="gap-6 flex flex-wrap p-1 sm:p-6 border my-6">
            <div>
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder="Kind" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Business">Business</SelectItem>
                     <SelectItem value="Credit">Credit</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-1 sm:p-2">
                     <SelectItem value="Pending">Pending</SelectItem>
                     <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="MTN">MTN</SelectItem>
                     <SelectItem value="Airtel">Airtel</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div
               className="flex items-center justify-center border px-4 cursor-pointer"
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
         </div>
         <div className="flex items-center justify-between my-2">
            <div>
               <p>All Transactions</p>
               <p>10-01-2023 / 10-02-2023 </p>
            </div>
            <div className="flex gap-3">
               <div className="bg-black hidden sm:flex sm:gap-2 items-end rounded p-2 text-white">
                  <Settings />
                  <p>Filters</p>
               </div>
               <div className="bg-black flex w-fit items-end rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>
         <div className="py-6 w-full overflow-x-scroll">
            <DataTable
               columns={columns}
               data={data}
            />
         </div>
         <DrawerForm
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title={drawerTitle}
         />
      </div>
   );
};

export default Transactions;
