import { create } from "zustand";

interface AuthState {
   user: any | null;
   role: string | null;
   setUser: (user: any) => void;
   setRole: (role: string) => void;
   clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   role: null,
   setUser: (user) => set({ user }),
   setRole: (role) => set({ role }),
   clearUser: () => set({ user: null, role: null }),
}));
