"use client";
import React, { useEffect, useState } from "react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DrawerForm from "@/components/DrawerForm";
import { StatusBadge } from "@/components/StatusBadge";
import {
   getReceivedTransactions,
   generatePDFTransactions,
   generateCSVTransactions,
} from "@/lib/api-calls/transaction";
import Link from "next/link";
import BounceLoader from "react-spinners/BounceLoader";
import { getUserProfile } from "@/lib/api-calls/auth-server";
import { formatDate } from "@/constants/constants";
import CompleteTransaction from "@/components/modals/CompleteTransaction";
import RiseLoader from "react-spinners/RiseLoader";

type Payment = {
   id: string;
   userId: string;
   user: {
      id: string;
      name: string;
      phoneNumber: string;
   };
   date: string;
   amount: number;
   status: "completed" | "pending" | "failed";
   paymentMethod: string;
   createdAt: string;
};

const columns: ColumnDef<Payment>[] = [
   {
      header: "#",
      cell: ({ row }) => {
         return <p className="text-14-medium text-dark-700">{row.index + 1}</p>;
      },
   },
   {
      accessorKey: "user.name",
      header: "User",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <p>{row.original.user.name}</p>
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
               <p>{row.original.user.phoneNumber}</p>
            </div>
         );
      },
   },
   {
      accessorKey: "amount",
      header: "Amount",
   },
   {
      accessorKey: "currency",
      header: "Currency",
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
         const status = row.original.status;
         return (
            <div className="min-w-[115px]">
               <StatusBadge status={status} />
            </div>
         );
      },
   },
   {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
         const date = row.original.createdAt;
         return <p>{formatDate(date)}</p>;
      },
   },
   {
      accessorKey: "paymentMethod",
      header: "Provider",
      cell: ({ row }) => {
         const provider = row.original.paymentMethod;
         return <p className="font-bold uppercase">{provider}</p>;
      },
   },
   {
      id: "actions",
      header: () => <div className="pl-4">Actions</div>,
      cell: ({ row }) => {
         const transaction = row.original;
         const userId = transaction.userId;

         return (
            <div className="flex gap-1">
               <CompleteTransaction
                  type="complete"
                  transactionId={transaction.id}
                  userId={userId}
               />
               <CompleteTransaction
                  type="cancel"
                  transactionId={transaction.id}
                  userId={userId}
               />
            </div>
         );
      },
   },
];

const Summary = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [drawerTitle, setDrawerTitle] = useState<string>("");
   const [data, setData] = useState<Payment[]>([]);
   const [filters, setFilters] = useState<{
      kind?: string;
      status?: string;
      provider?: string;
   }>({});
   const [sort, setSort] = useState<string | null>(null);
   const [profile, setProfile] = useState<{
      balance: number;
      balanceMTN: number;
      balanceAirtel: number;
   } | null>(null);
   const [page, setPage] = useState<number>(1);
   const [loading, setLoading] = useState<boolean>(true);

   const handleOpenDrawer = (title: string) => {
      setDrawerTitle(title);
      setIsDrawerOpen(true);
   };

   const handleGeneratePDF = async () => {
      try {
         const pdfData = await generatePDFTransactions();
         const blob = new Blob([pdfData], { type: "application/pdf" });
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = "transactions.pdf";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } catch (error) {
         console.error("Error while creating pdf", error);
      }
   };

   const handleGenerateCSV = async () => {
      try {
         const csvData = await generateCSVTransactions();
         const blob = new Blob([csvData], { type: "text/csv" });
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = "transactions.csv";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } catch (error) {
         console.error("Error while creating csv", error);
      }
   };

   const fetchTransactions = async () => {
      setLoading(true);
      try {
         const response = await getReceivedTransactions({
            ...filters,
            sort,
            page,
         });
         const transactions: Payment[] = response;
         console.log("Transactions retrieved are:", transactions);
         setData(transactions);
      } catch (error) {
         console.error("Error while getting transactions:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchTransactions();
      const fetchUserProfile = async () => {
         try {
            const userProfile = await getUserProfile();
            setProfile(userProfile);
            console.log("The user profile: ", userProfile);
         } catch (error) {
            console.error("Error fetching user profile:", error);
         }
      };
      fetchUserProfile();
   }, [filters, sort, page]);

   if (loading) {
      return (
         <div className="w-full h-screen flex items-center justify-center">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Summary</h2>
            <div className="flex gap-3">
               <div className="bg-white flex gap-2 items-center rounded p-2 border">
                  <Calendar />
                  <p>January</p>
                  <p>2023</p>
               </div>
               <div
                  className="bg-black flex gap-2 items-center rounded p-2 text-white cursor-pointer"
                  onClick={handleGeneratePDF}
               >
                  <h5>PDF</h5>
                  <FaFilePdf />
               </div>
               <div
                  className="bg-black flex gap-2 items-center rounded p-2 text-white cursor-pointer"
                  onClick={handleGenerateCSV}
               >
                  <h5>CSV</h5>
                  <FaFileCsv />
               </div>
               <div className="bg-black flex items-center justify-center rounded p-2 text-white cursor-pointer">
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="gap-6 flex flex-wrap p-1 sm:p-6 border my-6">
            <div>
               <Select
                  onValueChange={(value) =>
                     setFilters((prev) => ({ ...prev, kind: value }))
                  }
               >
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
               <Select
                  onValueChange={(value) =>
                     setFilters((prev) => ({ ...prev, status: value }))
                  }
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Completed">Completed</SelectItem>
                     <SelectItem value="Pending">Pending</SelectItem>
                     <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Select
                  onValueChange={(value) =>
                     setFilters((prev) => ({ ...prev, provider: value }))
                  }
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="Bank">Bank</SelectItem>
                     <SelectItem value="Airtel">Airtel</SelectItem>
                     <SelectItem value="MTN">MTN</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="overflow-x-auto bg-white border border-dark-100 rounded my-6">
            <DataTable
               data={data}
               columns={columns}
            />
         </div>

         <DrawerForm
            title={drawerTitle}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
         />
      </div>
   );
};

export default Summary;
