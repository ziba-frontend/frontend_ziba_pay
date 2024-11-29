"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "../../public/svg/logo.svg";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFetchUserProfile, useLogout } from "@/hooks/useAuth";

const DashboardNav = () => {
   const { data: user, isLoading, isError } = useFetchUserProfile();
   const { mutate: logout, isPending: isLogoutLoading } = useLogout();
   const router = useRouter();

   useEffect(() => {
      if (isError) {
         console.error("Failed to fetch user profile.");
      }
   }, [isError]);

   const handleLogout = () => {
      //@ts-ignore
      logout(null, {
         onSuccess: () => {
            window.location.href = "/login";
            window.location.reload();
         },
         onError: (error: any) => {
            console.error("Failed to logout:", error);
         },
      });
   };

   const firstName = user?.name ? user.name.split(" ")[0] : "User";

   return (
      <div className="bg-white p-4 z-40 fixed left-0 top-0 w-full h-[100px] flex items-center justify-between px-6">
         <div className="flex gap-20">
            <Link href="/">
               <Image
                  src={logo}
                  alt="zibaPay"
               />
            </Link>
            {!isLoading && (
               <h3 className="ml-6 hidden md:block">{`Welcome Back ${firstName} 🖐️`}</h3>
            )}
         </div>
         <button
            onClick={handleLogout}
            disabled={isLogoutLoading}
            className="flex gap-2 items-center"
         >
            <LogOut />
            <p className="hidden sm:block">
               {isLogoutLoading ? "Logging out..." : "Logout"}
            </p>
         </button>
      </div>
   );
};

export default DashboardNav;
