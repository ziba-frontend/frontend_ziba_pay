import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setRole: (role: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setRole: (role) => set({ role }),
      clearUser: () => set({ user: null, role: null, isAuthenticated: false }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        role: state.role,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);