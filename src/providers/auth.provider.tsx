"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import RiseLoader from "react-spinners/RiseLoader";
import { useFetchUserProfile } from "@/hooks/useAuth";
import { Cookies } from "react-cookie";

interface AuthProviderProps {
   children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const { setUser, setRole } = useAuthStore();
   const [loading, setLoading] = useState(true);
   const cookies = new Cookies();
   const token = cookies.get("token");

   // Skip authentication check if no token exists
   useEffect(() => {
      if (!token) {
         setLoading(false);
         return;
      }
   }, [token]);

   const { data: user, isLoading, error } = useFetchUserProfile();

   useEffect(() => {
      if (!token) return;

      if (user) {
         setUser({ id: user.id, fullName: user.name });
         setRole(user.role);
         setLoading(false);
      } else if (error) {
         console.error("Failed to fetch user data:", error);
         setLoading(false);
      }
   }, [user, error, setUser, setRole, token]);

   if (!token) return <>{children}</>;

   if (isLoading || loading) {
      return (
         <div className="items-center justify-center flex min-h-screen">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return <>{children}</>;
};

export default AuthProvider;
