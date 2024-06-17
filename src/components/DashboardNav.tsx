"use client";
import Image from "next/image";
import React from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import logo from "../../public/svg/logo.svg";
import { Bell, LogOut } from "lucide-react";
import Link from "next/link";

const DashboardNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
   return (
      <div className="bg-white p-4 z-40 fixed left-0 top-0 w-full h-[100px] flex items-center justify-between px-6">
         <div className="flex gap-20">
            <Link href="/">
               {" "}
               <Image
                  src={logo}
                  alt="zibaPay"
               />
            </Link>

            <div className="flex gap-4 items-center">
               <FaBars
                  onClick={toggleSidebar}
                  className="cursor-pointer"
               />
               <h1 className="ml-6 hidden sm:text-sm md:text-xl">
                  Welcome Back Chris 🖐️
               </h1>
            </div>
         </div>
         <Link href="/login">
            <div className="flex gap-2 items-center">
               <LogOut />
               Logout
            </div>
         </Link>
      </div>
   );
};

export default DashboardNav;
