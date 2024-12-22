import { authorizedAPI } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "/transactions";

// Fetch Sent Transactions
const getSentTransaction = async (queryParams = {}) => {
   const response = await authorizedAPI.get(`${BASE_URL}/sent`, {
      params: queryParams,
      withCredentials: true,
   });
   return response.data.data.transactions;
};

// Fetch Received Transactions
const getReceivedTransactions = async (queryParams = {}) => {
   const response = await authorizedAPI.get(`${BASE_URL}/received`, {
      params: queryParams,
      withCredentials: true,
   });
   return response.data.data.transactions;
};

// Fetch All Transactions
const getAllTransactions = async () => {
   const response = await authorizedAPI.get(`${BASE_URL}/all`, {
      withCredentials: true,
   });
   return response.data.data.transactions;
};

// Fetch All Transaction Status
const getAllTransactionStatus = async () => {
   const response = await authorizedAPI.get(`${BASE_URL}/status`, {
      withCredentials: true,
   });
   return response.data.data;
};

// Generate PDF Report for Received Transactions
const generatePDFTransactions = async () => {
   const response = await authorizedAPI.get(
      `${BASE_URL}/pdf-reports/received`,
      {
         withCredentials: true,
      }
   );
   return response.data.data;
};

// Generate CSV Report for Sent Transactions
const generateCSVTransactions = async () => {
   const response = await authorizedAPI.get(`${BASE_URL}/csv-reports/sent`, {
      withCredentials: true,
   });
   return response.data.data;
};

// Complete Transaction
const completeTransaction = async (transactionId: string) => {
   const response = await authorizedAPI.patch(
      `${BASE_URL}/${transactionId}/approve`,
      {},
      { withCredentials: true }
   );
   return response.data.data;
};

// Cancel Transaction
const cancelTransaction = async (transactionId: string) => {
   const response = await authorizedAPI.patch(
      `${BASE_URL}/${transactionId}/cancel`,
      {},
      { withCredentials: true }
   );
   return response.data.data;
};

const deposit = async ({
   paymentMethod,
   amount,
}: {
   paymentMethod: string;
   amount: number;
}): Promise<any> => {
   const response = await authorizedAPI.post(
      `${BASE_URL}/cash-in`,
      { paymentMethod, amount },
      { withCredentials: true }
   );
   return response.data.data;
};

// Withdraw Cash
const withdraw = async ({
   paymentMethod,
   amount,
}: {
   paymentMethod: string;
   amount: number;
}): Promise<any> => {
   const response = await authorizedAPI.post(
      `${BASE_URL}/cash-out`,
      { paymentMethod, amount },
      { withCredentials: true }
   );
   return response.data.data;
};

// Fetch Withdrawal History
const getWithdrawalHistory = async (queryParams = {}) => {
   const response = await authorizedAPI.get(`${BASE_URL}/withdraw-history`, {
      withCredentials: true,
      params: queryParams,
   });
   return response.data;
};

// React Query Hooks

export const useGetSentTransactions = (queryParams = {}) =>
   useQuery({
      queryKey: ["sentTransactions", queryParams],
      queryFn: () => getSentTransaction(queryParams),
   });

export const useGetReceivedTransactions = (queryParams = {}) =>
   useQuery({
      queryKey: ["receivedTransactions", queryParams],
      queryFn: () => getReceivedTransactions(queryParams),
   });

export const useGetAllTransactions = () =>
   useQuery({
      queryKey: ["allTransactions"],
      queryFn: getAllTransactions,
   });

export const useGetAllTransactionStatus = () =>
   useQuery({
      queryKey: ["transactionStatus"],
      queryFn: getAllTransactionStatus,
   });

export const useGeneratePDFTransactions = () =>
   useMutation({
      mutationFn: generatePDFTransactions,
   });

export const useGenerateCSVTransactions = () =>
   useMutation({
      mutationFn: generateCSVTransactions,
   });

export const useCompleteTransaction = () =>
   useMutation({
      mutationFn: completeTransaction,
   });

export const useCancelTransaction = () =>
   useMutation({
      mutationFn: cancelTransaction,
   });

export const useDeposit = () =>
   useMutation({
      mutationFn: deposit,
   });

export const useWithdraw = () =>
   useMutation({
      mutationFn: withdraw,
   });

export const useGetWithdrawalHistory = (queryParams = {}) =>
   useQuery({
      queryKey: ["withdrawalHistory", queryParams],
      queryFn: () => getWithdrawalHistory(queryParams),
   });
