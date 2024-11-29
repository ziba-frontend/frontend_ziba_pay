//@ts-nocheck

"use client";
import React, { useEffect, useState } from "react";
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
import { getUserProfile } from "@/lib/api-calls/auth-server";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/constants/constants";
import CompleteTransaction from "@/components/modals/CompleteTransaction";
import { useFetchUserProfile } from "@/hooks/useAuth";
import {
   useCancelTransaction,
   useCompleteTransaction,
   useGetSentTransactions,
} from "@/hooks/useTransaction";
import toast from "react-hot-toast";

const formSchema = z.object({
   username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
   }),
   issue: z.string().min(1, { message: "Issue is required." }),
   email: z.string().email({ message: "Invalid email address." }),
   subject: z.string().min(1, { message: "Subject is required." }),
});
export declare type Status = "completed" | "pending" | "failed";
type Payment = {
   id: string;
   userId: string;
   recipient: {
      id: string;
      name: string;
      phoneNumber: {
         id: string;
         number: string;
         verified: boolean;
         verificationToken: string;
         verificationExpires: string;
      };
   };
   date: string;
   amount: number;
   status: Status;
   paymentMethod: string;
   createdAt: string;
};

const columns: ColumnDef<Payment>[] = [
   {
      header: "ID",
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
      accessorFn: (row) => row.recipient.phoneNumber?.number,
      header: "Phone Number",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <p>{row.original.recipient.phoneNumber?.number}</p>
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

const Transactions = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [drawerTitle, setDrawerTitle] = useState<string>("");
   const [data, setData] = useState<Payment[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const { data: profile, isLoading: profileLoading } = useFetchUserProfile();

   const [filters, setFilters] = useState<{
      kind?: string;
      status?: string;
      provider?: string;
   }>({});
   const [sort, setSort] = useState<string | null>(null);
   const [page, setPage] = useState<number>(1);

   const handleOpenDrawer = (title: string) => {
      setDrawerTitle(title);
      setIsDrawerOpen(true);
   };

   const {
      data: transactionsData,
      isLoading: transactionsLoading,
      refetch: refetchTransactions,
   } = useGetSentTransactions({ ...filters, sort, page });


   console.log("Here are sent transactions: ", transactionsData);

   const completeTransactionMutation = useCompleteTransaction();
   const cancelTransactionMutation = useCancelTransaction();

   const handleTransactionAction = async (
      transactionId: string,
      actionType: "complete" | "cancel"
   ) => {
      try {
         if (actionType === "complete") {
            await completeTransactionMutation.mutateAsync(transactionId);
            toast.success("Transaction completed successfully");
         } else {
            await cancelTransactionMutation.mutateAsync(transactionId);
            toast.success("Transaction cancelled successfully");
         }
         refetchTransactions();
      } catch (error) {
         toast.error("Failed to update transaction");
         console.error("Transaction action error:", error);
      }
   };

   if (profileLoading || transactionsLoading) {
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
                  <SelectContent className="bg-white p-1 sm:p-2">
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Select
                  onValueChange={(value) =>
                     setFilters((prev) => ({ ...prev, paymentMethod: value }))
                  }
               >
                  <SelectTrigger>
                     <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="mtn">MTN</SelectItem>
                     <SelectItem value="airtel">Airtel</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div>
               <Select onValueChange={(value) => setSort(value)}>
                  <SelectTrigger>
                     <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-2">
                     <SelectItem value="createdAt">Date</SelectItem>
                     <SelectItem value="amount">Amount</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="border-2 flex w-fit flex-col gap-2 items-end rounded p-2 ">
               <Link href="/checkout">Checkout</Link>
            </div>
         </div>
         <DataTable
            columns={columns}
            data={transactionsData?.transactions || []}
            actions={{
               onComplete: (id: string) =>
                  handleTransactionAction(id, "complete"),
               onCancel: (id: string) => handleTransactionAction(id, "cancel"),
            }}
         />
         <DrawerForm
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title={drawerTitle}
         />
      </div>
   );
};

export default Transactions;
