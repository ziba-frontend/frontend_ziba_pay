import {create} from "zustand";

interface AdminState {
  isAdmin: boolean;
  users: any[];
  transactions: any[];
  setAdminStatus: (status: boolean) => void;
  setUsers: (users: any[]) => void;
  setTransactions: (transactions: any[]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  users: [],
  transactions: [],
  setAdminStatus: (status: boolean) => set({ isAdmin: status }),
  setUsers: (users: any[]) => set({ users }),
  setTransactions: (transactions: any[]) => set({ transactions }),
}));
