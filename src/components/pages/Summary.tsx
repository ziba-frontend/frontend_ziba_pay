"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DrawerForm from "@/components/DrawerForm";
import { StatusBadge } from "@/components/StatusBadge";
import { format } from "date-fns";
import {
  getReceivedTransactions,
  generatePDFTransactions,
  generateCSVTransactions,
} from "@/lib/api-calls/transaction";
import { Calendar } from "@/components/ui/calendar";
import { getUserProfile } from "@/lib/api-calls/auth-server";
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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

  const handleRefresh = () => {
    router.refresh();
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <h2>Summary</h2>
        <div className="flex gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                              !field.value && "text-muted-foreground"
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
                      <PopoverContent className="w-auto p-0" align="start">
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
          <Button variant="outline" onClick={handleRefresh}>
            Refresh
          </Button>
          <Button variant="outline" onClick={handleGeneratePDF}>
            <FaFilePdf className="mr-2" /> PDF
          </Button>
          <Button variant="outline" onClick={handleGenerateCSV}>
            <FaFileCsv className="mr-2" /> CSV
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Summary;
