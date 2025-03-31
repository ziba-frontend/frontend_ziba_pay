import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessType?: string;
  country?: string;
  howHear?: string;
  token?: string;
  // Add any other user properties you need
}

interface AuthState {
  user: User | null;
  role: string | null;
  setUser: (user: User) => void;
  setRole: (role: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      clearUser: () => set({ user: null, role: null }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user, role: state.role }),
    }
  )
);