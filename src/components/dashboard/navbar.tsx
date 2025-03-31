"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import ProfileDropdown from "./profile-dropdown";
import BreadCrumb from "./bread-crumb";
import logo from "../../../public/svg/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface props {
   setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
   isSidebarOpen: boolean;
   setIsSidebarMinimized: React.Dispatch<React.SetStateAction<boolean>>;
   isSidebarMinimized: boolean;
}

const DashboardNavbar: React.FC<props> = ({
   setIsSheetOpen,
   setIsSidebarOpen,
   isSidebarOpen,
   setIsSidebarMinimized,
   isSidebarMinimized,
}) => {
   return (
      <main className="h-[64px] transition-all duration-300 top-0 sticky bg-white flex flex-row-reverse sm:flex-row items-center justify-between px-[1rem] w-full z-50">
         <Button
            variant="ghost"
            className={`xl:hidden p-0 hover:bg-inherit`}
            onClick={() => setIsSheetOpen(true)}
         >
            <Icon
               icon={"iconamoon:menu-burger-horizontal"}
               fontSize={24}
            />
         </Button>
         <section className="sm:flex items-center space-x-4 hidden">
            <button
               onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
               className="bg-[#F5F6FA] p-1.5 rounded-md text-gray-700 hidden xl:flex"
            >
               <Icon
                  icon="material-symbols:legend-toggle-rounded"
                  fontSize={21}
               />
            </button>
            <BreadCrumb />
         </section>
         <section className="hidden sm:flex  gap-x-4 items-center">
            <div className="text-[#494C52] bg-subprimary flex items-center justify-center h-[46px] w-[46px]">
               <div className="relative">
                  <Icon
                     icon="bxs:bell"
                     fontSize={28}
                  />
                  <div className="bg-primary w-[8px] h-[8px] absolute top-[4px] right-[4px] rounded-full"></div>
               </div>
            </div>
            <ProfileDropdown />
         </section>
         <div className="sm:hidden flex items-center">
         <Link href="/" className="transition-transform hover:scale-105 duration-300">
          <Image
            src={logo}
            alt="zibaPay"
            className="h-10 w-auto"
          />
        </Link>
            <BreadCrumb />
         </div>
      </main>
   );
};

export default DashboardNavbar;
