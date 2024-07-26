"use client";
import React, { useState, useEffect } from "react";
import { getAllApiKeys } from "@/lib/api-calls/developer";
import RiseLoader from "react-spinners/RiseLoader";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import ApplicationModal from "@/components/modals/ApplicationModal";
import CompleteTransaction from "@/components/modals/CompleteTransaction";

interface GatewayConfig {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  apiSecret: string;
}

const columns: ColumnDef<GatewayConfig>[] = [
  {
    header: "ID",
    cell: ({ row }) => {
      return <p className="text-14-medium text-dark-700">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "apiKey",
    header: "API Key",
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
       const gateway = row.original;
       const id = gateway.id;

       return (
          <div className="flex gap-1">
             <CompleteTransaction
                type="configure"
                gatewayId={id}
             />
             <CompleteTransaction
                type="delete"
                gatewayId={id}
             />
          </div>
       )
    }
 }
];

const Summary = () => {
  const [gatewayConfigs, setGatewayConfigs] = useState<GatewayConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleSecrets, setVisibleSecrets] = useState<Record<number, boolean>>({});

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const apiKeys = await getAllApiKeys();
      setGatewayConfigs(apiKeys);
      setError(null);
    } catch (error) {
      console.error("Error while fetching keys", error);
      setError("Failed to fetch gateway configurations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const toggleSecretVisibility = (index: number) => {
    setVisibleSecrets((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between my-2">
        <h2 className="text-2xl font-semibold">Application</h2>
        <div className="flex gap-3">
          <div className="bg-green-500 text-white flex gap-2 items-center rounded p-2 border">
            <p className="text-lg font-medium">Application</p>
          </div>
          <ApplicationModal onSuccess={fetchApiKeys} />
        </div>
      </div>
      {error && <div className="text-red-500 my-4">{error}</div>}
      <div className="py-6 w-full">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <RiseLoader color="#000" size={15} />
          </div>
        ) : (
          gatewayConfigs.length > 0 ? (
            <DataTable
              columns={columns}
              data={gatewayConfigs}
            />
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-100 rounded-lg">
              <p className="text-lg font-medium">You don’t have any applications.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Summary;
