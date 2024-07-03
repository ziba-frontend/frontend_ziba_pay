"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DrawerForm from "@/components/DrawerForm";
import { getReceivedTransactions, generatePDFTransactions, generateCSVTransactions } from "@/lib/api-calls/transaction";
import { z } from "zod";

type Payment = {
   user: {
      name: string;
      phoneNumber: string
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
      accessorKey: "status",
      header: "Status",
   },
   {
      accessorKey: "createdAt",
      header: "Date",
   },
];

const Summary = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [drawerTitle, setDrawerTitle] = useState<string>("");
   const [data, setData] = useState<Payment[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   const handleOpenDrawer = (title: string) => {
      setDrawerTitle(title);
      setIsDrawerOpen(true);
   };

   const handleGeneratePDF = async () => {
      try {
         const pdfData = await generatePDFTransactions();
         const blob = new Blob([pdfData], { type: 'application/pdf' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = 'transactions.pdf';
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
         const blob = new Blob([csvData], { type: 'text/csv' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = 'transactions.csv';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } catch (error) {
         console.error("Error while creating csv", error);
      }
   };

   useEffect(() => {
      const fetchAllTransactions = async () => {
         try {
            const transactions = await getReceivedTransactions();
            console.log("Transactions retrieved are:", transactions);
            setData(transactions);
         } catch (error) {
            console.error("Error while getting all transactions:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchAllTransactions();
   }, []);

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Summary</h2>
            <div className="flex gap-3">
               <div className="bg-white flex  gap-2 items-center rounded p-2 border">
                  <Calendar />
                  <p>January</p>
                  <p>2023</p>
               </div>
               <div className="bg-black flex  gap-2 items-center rounded p-2 text-white" onClick={handleGeneratePDF}>
                  <h5>PDF</h5>
                  <FaFilePdf />
               </div>
               <div className="bg-black flex  gap-2 items-center rounded p-2 text-white" onClick={handleGenerateCSV}>
                  <h5>CSV</h5>
                  <FaFileCsv />
               </div>
               <div className="bg-black flex  items-center justify-center rounded p-2 text-white">
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="py-6 w-full overflow-x-scroll">
            <DataTable columns={columns} data={data} />
         </div>
         <DrawerForm isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={drawerTitle} />
      </div>
   );
};

export default Summary;