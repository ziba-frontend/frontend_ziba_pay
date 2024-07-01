"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/svg/logo.svg";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserProfile, logoutApi } from "@/lib/api-calls/action";
import Link from "next/link";

const DashboardNav = () => {
   const [firstName, setFirstName] = useState("");
   const router = useRouter();

   useEffect(() => {
      const fetchUserInfo = async () => {
         try {
            const user = await getUserProfile();
            const firstName = user.name ? user.name.split(" ")[0] : "";
            setFirstName(firstName);
         } catch (error) {
            console.error("Failed to fetch user info:", error);
         }
      };

      fetchUserInfo();
   }, []);

   const handleLogout = async () => {
      try {
         await logoutApi();
         router.push("/login");
      } catch (error) {
         console.error("Failed to logout:", error);
      }
   };

   return (
      <div className="bg-white p-4 z-40 fixed left-0 top-0 w-full h-[100px] flex items-center justify-between px-6">
         <div className="flex gap-20">
            <Link href="/">
               <Image
                  src={logo}
                  alt="zibaPay"
               />
            </Link>
            <h1 className="ml-6 hidden md:block">
               {`Welcome Back ${firstName} 🖐️`}
            </h1>
         </div>
         <button
            onClick={handleLogout}
            className="flex gap-2 items-center"
         >
            <LogOut />
            <p className="hidden sm:block">Logout</p>
         </button>
      </div>
   );
};

export default DashboardNav;
