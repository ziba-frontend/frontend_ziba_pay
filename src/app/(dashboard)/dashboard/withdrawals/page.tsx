"use client"
import { DataTable } from "@/components/DataTable";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { Status } from "../transactions/page";
import { getWithdrawalHistory } from "@/lib/api-calls/transaction";
import RiseLoader from "react-spinners/RiseLoader";
import CompleteTransaction from "@/components/modals/CompleteTransaction";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/constants/constants";
import { getUserProfile } from "@/lib/api-calls/auth-server";

type Payment = {
   id: string;
   userId: string;
   recipient: {
      id: string;
      name: string;
      phoneNumber: string;
   };
   type: string;
   date: string;
   amount: number;
   status: Status;
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
      accessorKey: "amount",
      header: "Amount",
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
      accessorKey: "typr",
      header: "TYPE",
      cell: ({ row }) => {
         const provider = row.original.type;
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

const Withdrawal = () => {
   const [data, setData] = useState<Payment[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [profile, setProfile] = useState<{
      balance: number;
      balanceMTN: number;
      balanceAirtel: number;
   } | null>(null);
   const [filters, setFilters] = useState<{
      kind?: string;
      status?: string;
      provider?: string;
   }>({});
   const [sort, setSort] = useState<string | null>(null);
   const [page, setPage] = useState<number>(1);


   const fetchTransactions = async () => {
      setLoading(true);
      try {
         const response = await getWithdrawalHistory({
            ...filters,
            sort,
            page,
         });
         const transactions = response.data.transactions;
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
         <div className="flex md:items-center md:justify-between my-2 flex-col sm:gap-4 md:flex-row gap-6">
            <h2>Withdrawal Transactions History</h2>

            
         </div>
        
         <DataTable
            columns={columns}
            data={data}
         />
        
      </div>
   );
};

export default Withdrawal;
