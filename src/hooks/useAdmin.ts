//@ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { authorizedAPI } from "@/lib/api";
import { useAdminStore } from "@/store/useAdminStore";
import { useFetchUserProfile } from "./useAuth";


const BASE_URL = '/admin';

// Fetch if the user is an admin
export const useCheckIfAdmin = () => {
  const { setAdminStatus } = useAdminStore();

  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      try {
        const user = await useFetchUserProfile();
        const isAdmin = user?.role === "admin";
        setAdminStatus(isAdmin);
        return isAdmin;
      } catch (error) {
        console.error("Error checking if user is admin:", error);
        return false;
      }
    },
    onError: () => {
      toast.error("Error checking admin status");
    },
  });
};

// Fetch all users
export const useGetAllUsers = () => {
  const { setUsers } = useAdminStore();
  
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await authorizedAPI.get(`${BASE_URL}/`, { withCredentials: true });
      return response.data.data.users;
    },
    onSuccess: (data) => {
      setUsers(data);
    },
    onError: (error) => {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    },
  });
};

// Fetch user by ID
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await authorizedAPI.get(`${BASE_URL}/${userId}`, { withCredentials: true });
      return response.data.data.user;
    },
    onError: (error) => {
      toast.error("Failed to fetch user");
      console.error("Error while fetching user: ", error);
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (args: { userId: string, userData: any }) => {
      const { userId, userData } = args;
      const response = await authorizedAPI.patch(`${BASE_URL}/${userId}`, userData, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update user");
      console.error("Error updating user:", error);
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await authorizedAPI.delete(`${BASE_URL}/${userId}`, { withCredentials: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    },
  });
};

// Fetch all transactions
export const useGetAllTransactions = () => {
  const { setTransactions } = useAdminStore();
  
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await authorizedAPI.get(`${BASE_URL}/transactions`, { withCredentials: true });
      return response.data.data.transactions;
    },
    onSuccess: (data) => {
      setTransactions(data);
    },
    onError: (error) => {
      toast.error("Failed to fetch transactions");
      console.error("Error fetching transactions:", error);
    },
  });
};

// Fetch transaction by ID
export const useGetTransactionById = (transactionId: string) => {
  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      const response = await authorizedAPI.get(`${BASE_URL}/transactions/${transactionId}`, { withCredentials: true });
      return response.data.data.transaction;
    },
    onError: (error) => {
      toast.error("Failed to fetch transaction details");
      console.error("Error fetching transaction details:", error);
    },
  });
};


