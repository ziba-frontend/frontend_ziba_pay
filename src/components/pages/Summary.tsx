"use client";
import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/constants/constants";
import CompleteTransaction from "@/components/modals/CompleteTransaction";
import RiseLoader from "react-spinners/RiseLoader";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
   useGenerateCSVTransactions,
   useGeneratePDFTransactions,
   useGetReceivedTransactions,
} from "@/hooks/useTransaction";

type Payment = {
   id: string;
   userId: string;
   user: {
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
      accessorFn: (row) => row.user.phoneNumber?.number,
      header: "Phone Number",
      cell: ({ row }) => {
         return (
            <div className="flex gap-2 items-center">
               <p>{row.original.user.phoneNumber?.number}</p>
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

const FormSchema = z.object({
   day: z.date({
      required_error: "Pick a date please",
   }),
});

const Summary = () => {
   const router = useRouter();
   const [filters, setFilters] = useState<{
      kind?: string;
      status?: string;
      provider?: string;
   }>({});
   const [page, setPage] = useState<number>(1);
   const {
      data: transactions,
      isLoading,
      refetch,
   } = useGetReceivedTransactions({ ...filters, page });

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   });

   const handleRefresh = () => {
      refetch();
   };

   const handleGeneratePDF = async () => {
    try {
      const { mutateAsync } = useGeneratePDFTransactions();
      const pdfData = await mutateAsync(); 
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  const handleGenerateCSV = async () => {
    try {
      const { mutateAsync } = useGenerateCSVTransactions();
      const csvData = await mutateAsync(); 
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV", error);
    }
  };

   if (isLoading) {
      return (
         <div className="w-full h-screen flex items-center justify-center">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return (
      <div>
         <div className="flex items-center justify-between my-2 pb-6">
            <h2>Summary</h2>
            <div className="flex gap-3">
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit((data) => console.log(data))}
                     className="space-y-8"
                  >
                     <FormField
                        control={form.control}
                        name="day"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <Popover>
                                 <PopoverTrigger asChild>
                                    <FormControl>
                                       <Button
                                          variant={"outline"}
                                          className={cn(
                                             "min-w-[150px] p-6 text-left font-normal bg-white",
                                             !field.value &&
                                                "text-muted-foreground"
                                          )}
                                       >
                                          {field.value ? (
                                             format(field.value, "PPP")
                                          ) : (
                                             <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-6 h-4 w-4 opacity-50" />
                                       </Button>
                                    </FormControl>
                                 </PopoverTrigger>
                                 <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                 >
                                    <Calendar
                                       mode="single"
                                       selected={field.value}
                                       onSelect={field.onChange}
                                       initialFocus
                                    />
                                 </PopoverContent>
                              </Popover>
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>
               <Button
                  onClick={handleRefresh}
                  className="p-6"
               >
                  Refresh
               </Button>
               <Button
                  onClick={handleGeneratePDF}
                  className="p-6"
               >
                  <FaFilePdf className="mr-2" /> PDF
               </Button>
               <Button
                  onClick={handleGenerateCSV}
                  className="p-6"
               >
                  <FaFileCsv className="mr-2" /> CSV
               </Button>
            </div>
         </div>
         <DataTable
            columns={columns}
            data={transactions || []} 
         />
      </div>
   );
};

export default Summary;
