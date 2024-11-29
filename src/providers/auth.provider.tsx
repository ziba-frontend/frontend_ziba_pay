"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import RiseLoader from "react-spinners/RiseLoader";
import { useFetchUserProfile } from "@/hooks/useAuth";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setRole } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const { data: user, isLoading, error } = useFetchUserProfile();

  useEffect(() => {
    if (user) {
      setUser({ id: user.id, fullName: user.name });
      setRole(user.role);
      setLoading(false);
    } else if (error) {
      console.error("Failed to fetch user data:", error);
      setLoading(false);
    }
  }, [user, error, setUser, setRole]);

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
