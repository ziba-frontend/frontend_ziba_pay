"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import RiseLoader from "react-spinners/RiseLoader";
import { useFetchUserProfile } from "@/hooks/useAuth";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isAuthenticated, setUser, setRole } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if token exists
  const token = mounted ? Cookies.get("auth_token") : null;
  const shouldFetchProfile = mounted && token && !user;

  // Get the authentication token and fetch user profile only when needed
  const { isLoading: isFetchingProfile } = useFetchUserProfile({
    enabled: shouldFetchProfile,
    onSettled: () => setLoading(false)
  });

  // Set loading state based on conditions
  useEffect(() => {
    if (!mounted) return;
    
    // If we have no token, or we already have user data, we're done loading
    if (!token || (isAuthenticated && user)) {
      setLoading(false);
    }
  }, [token, user, isAuthenticated, mounted]);

  // Always render children on server
  if (!mounted) {
    return <>{children}</>;
  }

  // If no token, render children immediately (no auth needed)
  if (!token) {
    return <>{children}</>;
  }

  // Show loading spinner only if we're actually loading something
  if (loading || isFetchingProfile) {
    return (
      <div className="items-center justify-center flex min-h-screen">
        <RiseLoader color="#3BD64A" />
      </div>
    );
  }

  // Render children when authentication is complete
  return <>{children}</>;
};

export default AuthProvider;