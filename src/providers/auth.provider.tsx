// auth.provider.ts
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import RiseLoader from "react-spinners/RiseLoader";

interface AuthProviderProps {
   children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const { setUser, setRole } = useAuthStore();
   const [loading, setLoading] = useState(true);

   const fetchUserData = () => {
      try {
         const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("jwt_auth_token="))
            ?.split("=")[1];

         if (token) {
            const decodedToken: any = jwtDecode(token);
            setUser({ id: decodedToken.id, fullName: decodedToken.fullName });
            setRole(decodedToken.role);
         } else {
            console.error("No token found.");
         }
      } catch (error) {
         console.error("Failed to fetch user data:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchUserData();
   }, []);

   if (loading) {
      return (
         <div className="items-center justify-center flex min-h-screen">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return <>{children}</>;
};

export default AuthProvider;
