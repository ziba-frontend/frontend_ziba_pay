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
  const [mounted, setMounted] = useState(false);
  const cookies = new Cookies();
  
  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the authentication token and fetch user profile
  const { data: userData, isLoading, error } = useFetchUserProfile();

  // Handle user data when it's available
  useEffect(() => {
    if (!mounted) return;
    
    const token = cookies.get("auth_token");
    
    if (!token) {
      setLoading(false);
      return;
    }

    if (userData) {
      // Store the complete user object
      setUser(userData);
      setRole(userData.role);
      setLoading(false);
    } else if (error) {
      console.error("Failed to fetch user data:", error);
      setLoading(false);
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [userData, error, isLoading, setUser, setRole, mounted]);

  // Always render children on server
  if (!mounted) {
    return <>{children}</>;
  }

  // Client-side only logic
  const token = cookies.get("auth_token");
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