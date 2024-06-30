"use client";
import Image from "next/image";
import React from "react";
import logo from "../../public/svg/logo.svg";
import { Bell, LogOut } from "lucide-react";
import Link from "next/link";

const DashboardNav = () => {
   return (
      <div className="bg-white p-4 z-40 fixed left-0 top-0 w-full h-[100px] flex items-center justify-between px-6">
         <div className="flex gap-20">
            <Link href="/">
               <Image src={logo} alt="zibaPay" />
            </Link>
            <h1 className="ml-6 hidden md:block">Welcome Back Chris 🖐️</h1>
         </div>
         <Link href="/login">
            <div className="flex gap-2 items-center">
               <LogOut />
               <p className="hidden sm:block"> Logout</p>
            </div>
         </Link>
      </div>
   );
};

export default DashboardNav;
