"use client";
import Image from "next/image";
import React from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import logo from "../../public/svg/logo.svg";
import { Bell } from "lucide-react";
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
               <form className="flex gap-4 bg-br items-center p-2 rounded-full w-[200px] md:w-[300px]">
                  <FaSearch color="gray" />
                  <input className="outline-none w-5/6 bg-transparent" />
               </form>
            </div>
         </div>
         <div className="flex gap-4 items-center">
            <Bell />
            <div className="w-10 h-10 rounded-full flex items-center justify-center border">
               I
            </div>
         </div>
      </div>
   );
};

export default DashboardNav;
