"use client";

import React from "react";
import {
   ShoppingCart,
   LayoutDashboard,
   UsersRound,
   Settings,
} from "lucide-react";
import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "./ui/nav";

type Props = {
   isCollapsed: boolean;
};

export default function SideNavbar({ isCollapsed }: Props) {
   const onlyWidth = useWindowWidth();
   const mobileWidth = onlyWidth < 768;

   return (
      <div
         className={`fixed top-[100px] left-0 bg-white bottom-0 ${
            isCollapsed ? "w-[60px]" : "w-[200px]"
         } border-r p-4 transition-width duration-300`}
      >
         <Nav
            isCollapsed={mobileWidth ? true : isCollapsed}
            links={[
               {
                  title: "Dashboard",
                  href: "/dashboard",
                  icon: LayoutDashboard,
                  variant: "default",
               },
               {
                  title: "Users",
                  href: "/dashboard/users",
                  icon: UsersRound,
                  variant: "ghost",
               },
               {
                  title: "Orders",
                  href: "/dashboard/orders",
                  icon: ShoppingCart,
                  variant: "ghost",
               },
               {
                  title: "Settings",
                  href: "/dashboard/settings",
                  icon: Settings,
                  variant: "ghost",
               },
            ]}
         />
      </div>
   );
}
