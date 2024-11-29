import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorizedAPI } from "@/lib/api";
import { useFetchUserProfile } from "./useAuth";

const BASE_URL = "/admin";

const fetchIsAdmin = async (): Promise<boolean> => {
  const { data: user } = await useFetchUserProfile();
  if (!user) throw new Error("User data not available");
  return user.role === "admin";
};

const fetchAllUsers = async (): Promise<any[]> => {
  const response = await authorizedAPI.get(`${BASE_URL}/`, {
    withCredentials: true,
  });
  return response.data;
};

const fetchUserById = async (userId: string): Promise<any> => {
  const response = await authorizedAPI.get(`${BASE_URL}/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

const fetchAllTransactions = async (): Promise<any[]> => {
  const response = await authorizedAPI.get(`${BASE_URL}/transactions`, {
    withCredentials: true,
  });
  return response.data.transactions;
};

const fetchTransactionById = async (transactionId: string): Promise<any> => {
  const response = await authorizedAPI.get(
    `${BASE_URL}/transactions/${transactionId}`,
    { withCredentials: true }
  );
  return response.data.transaction;
};

export const useCheckIfAdmin = () =>
  useMutation({
    mutationFn: fetchIsAdmin,
    onSuccess: () => console.log("Admin status verified."),
    onError: (error) => {
      console.error("Failed to check if admin:", error);
    },
  });

export const useGetAllUsers = () =>
  useMutation({
    mutationFn: fetchAllUsers,
    onSuccess: (data) => console.log("Users fetched successfully", data),
    onError: (error: any) => {
      console.error("Failed to fetch all users:", error);
    },
  });

export const useGetUserById = (userId: string) =>
  useMutation({
    mutationFn: () => fetchUserById(userId),
    onSuccess: (data) =>
      console.log(`User with ID ${userId} fetched successfully`, data),
    onError: (error: any) => {
      console.error(`Failed to fetch user with ID ${userId}:`, error);
    },
  });

export const useGetAllTransactions = () =>
  useMutation({
    mutationFn: fetchAllTransactions,
    onSuccess: (data) =>
      console.log("Transactions fetched successfully", data),
    onError: (error: any) => {
      console.error("Failed to fetch transactions:", error);
    },
  });

export const useGetTransactionById = (transactionId: string) =>
  useMutation({
    mutationFn: () => fetchTransactionById(transactionId),
    onSuccess: (data) =>
      console.log(
        `Transaction with ID ${transactionId} fetched successfully`,
        data
      ),
    onError: (error: any) => {
      console.error(
        `Failed to fetch transaction with ID ${transactionId}:`,
        error
      );
    },
  });
