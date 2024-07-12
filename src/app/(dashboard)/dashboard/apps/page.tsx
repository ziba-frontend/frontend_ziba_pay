"use client";
import React, { useState, useEffect } from "react";
import { createApiGateway, getAllApiKeys } from "@/lib/api-calls/developer";
import RiseLoader from "react-spinners/RiseLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface GatewayConfig {
  apiKey: string;
  apiSecret: string;
}

const Summary = () => {
  const [gatewayConfigs, setGatewayConfigs] = useState<GatewayConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleSecrets, setVisibleSecrets] = useState<Record<number, boolean>>({});

  const fetchApiKeys = async () => {
    try {
      const apiKeys = await getAllApiKeys();
      setGatewayConfigs(apiKeys);
      setError(null);
    } catch (error) {
      console.error("Error while fetching keys", error);
      setError("Failed to fetch gateway configurations");
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreateGatewayConfig = async () => {
    setLoading(true);
    try {
      const apiKeys = await createApiGateway();
      setGatewayConfigs([...gatewayConfigs, apiKeys]);
      setError(null);
    } catch (error) {
      console.error("Error while creating keys", error);
      setError("Failed to create gateway configuration");
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={handleCreateGatewayConfig}
            className="bg-black flex items-center justify-center rounded p-2 text-white"
            disabled={loading}
          >
            {loading ? (
              <RiseLoader color="#ffffff" size={10} />
            ) : (
              <p>Create</p>
            )}
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 my-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gatewayConfigs.length > 0 ? (
          gatewayConfigs.map((config, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
              <p className="text-sm font-medium truncate">
                API Key: <span className="font-mono">{config.apiKey}</span>
              </p>
              <div className="flex items-center mt-2">
                <p className="text-sm font-medium truncate">
                  API Secret:{" "}
                  <span className="font-mono">
                    {visibleSecrets[index] ? config.apiSecret : "•".repeat(config.apiSecret.length)}
                  </span>
                </p>
                <button
                  onClick={() => toggleSecretVisibility(index)}
                  className="ml-2 text-gray-600"
                >
                  {visibleSecrets[index] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-100 rounded-lg">
            <p className="text-lg font-medium">You don’t have any applications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
