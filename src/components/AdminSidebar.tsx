"use client";
import React from "react";
import {
   LayoutDashboard,
   Settings,
   Users,
   Sidebar,
   WalletCards,
   Signal,
   LogOut,
   PenBoxIcon,
} from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import logo from "../../public/svg/logo.svg";
import { Nav } from "./ui/nav";
import { logoutApi } from "@/lib/api-calls/auth-server";
import Link from "next/link";
import Image from "next/image";

type Props = {
   isCollapsed: boolean;
   toggleSidebar: () => void;
};

export default function AdminSidebar({ isCollapsed, toggleSidebar }: Props) {
   const onlyWidth = useWindowWidth();
   const mobileWidth = onlyWidth < 768;

   const handleLogout = async () => {
      try {
         await logoutApi();
         window.location.href = "/login";
      } catch (error) {
         console.error("Failed to logout:", error);
      }
   };

   return (
      <div
         className={`fixed top-0 left-0 bg-white bottom-0 z-20 overflow-y-scroll no-scrollbar flex flex-col items-start ${
            isCollapsed || mobileWidth ? "w-[60px]" : "w-[200px] md:w-[250px]"
         } border-r p-4 transition-width duration-300`}
      >
         {!(isCollapsed || mobileWidth) && (
            <Link href="/">
               <Image
                  src={logo}
                  alt="zibaPay"
               />
            </Link>
         )}
         <div className="flex justify-between flex-col h-full">
            <div className="py-2">
               {!(isCollapsed || mobileWidth) && (
                  <p className="my-2">Metrics</p>
               )}
               <Nav
                  isCollapsed={mobileWidth ? true : isCollapsed}
                  links={[
                     {
                        title: "Dashboard Overview",
                        href: "/admin",
                        icon: LayoutDashboard,
                        variant: "default",
                     },
                     {
                        title: "Users Management",
                        href: "/admin/users-management",
                        icon: Users,
                        variant: "ghost",
                     },
                     {
                        title: "Blogs Management",
                        href: "/admin/blogs",
                        icon: PenBoxIcon,
                        variant: "ghost",
                     },
                     {
                        title: "Transactions Management ",
                        href: "/admin/transactions-management",
                        icon: WalletCards,
                        variant: "ghost",
                     },
                     {
                        title: "System Configuration",
                        href: "/admin/system-configuration",
                        icon: Settings,
                        variant: "ghost",
                     },
                     {
                        title: "Reporting & Analytics",
                        href: "/admin/reporting-and-analytics",
                        icon: Signal,
                        variant: "ghost",
                     },
                  ]}
               />
            </div>
            <button
               onClick={handleLogout}
               className="flex gap-2 items-center"
            >
               <LogOut />
               {!(isCollapsed || mobileWidth) && (
                  <p className="hidden sm:block">Logout</p>
               )}
            </button>
         </div>

         {/* Toggle Button */}
         <div className="mt-auto pt-4 border-t pb-6">
            <Sidebar
               onClick={toggleSidebar}
               className="cursor-pointer"
            />
         </div>
      </div>
   );
}
