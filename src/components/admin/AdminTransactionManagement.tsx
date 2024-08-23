"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getAllTransactions, getTransactionById } from "@/lib/api-calls/admin";
import { FaSearch } from "react-icons/fa";
import { ArrowDown } from "lucide-react";
import TransactionDetailsModal from "../modals/TransactionDetailsModal";
import { Button } from "../ui/button";

type User = {
   name: string;
   email: string;
};

type Transaction = {
   id: string;
   userId: string;
   recipientId: string;
   amount: number;
   currency: string;
   status: string;
   type: string;
   createdAt: string;
   user: User;
   recipient: User;
};

const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
    },
    {
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "recipientId",
        header: "Recipient ID",
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
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const transaction = row.original;
            const { setDetailsTransaction, setDetailsModalOpen } = React.useContext(TransactionsPageContext);

            const handleViewDetails = () => {
                setDetailsTransaction(transaction);
                setDetailsModalOpen(true);
            };

            return (
                <button onClick={handleViewDetails} className="text-blue-500">
                    View Details
                </button>
            );
        },
    },
];

const TransactionsPageContext = React.createContext<{
    setDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailsTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
}>({
    setDetailsModalOpen: () => {},
    setDetailsTransaction: () => {},
});

export default function AdminTransactionManagement() {
    const [data, setData] = useState<Transaction[]>([]);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [detailsTransaction, setDetailsTransaction] = useState<Transaction | null>(null);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const transactions = await getAllTransactions();
              setData(transactions);
          } catch (error) {
              toast.error("Failed to fetch transactions");
              setData([]); 
          }
      };
      fetchData();
  }, []);

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
    };

    return (
        <TransactionsPageContext.Provider value={{ setDetailsModalOpen, setDetailsTransaction }}>
            <div className="mb-6 flex flex-col md:flex-row md:justify-between gap-4 w-full">
                <form
                    className={`flex gap-4 items-center bg-white p-[15px] rounded-lg transition-all ${
                        isInputFocused ? "border-2 border-main" : "border"
                    }`}
                >
                    <FaSearch color="gray" />
                    <input
                        className="outline-none flex-1"
                        placeholder="Search for transactions..."
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                </form>
                <Button className=" w-fit md:w-auto">
                    Export
                    <ArrowDown />
                </Button>
            </div>
            <div className="flex flex-col gap-5 w-full">
                <PageTitle title="Transactions" />
                
                <DataTable
                    columns={columns}
                    data={data}
                    title="All Transactions"
                />
                {isDetailsModalOpen && (
                    <TransactionDetailsModal
                        transaction={detailsTransaction}
                        onClose={handleCloseDetailsModal}
                    />
                )}
            </div>
        </TransactionsPageContext.Provider>
    );
}
