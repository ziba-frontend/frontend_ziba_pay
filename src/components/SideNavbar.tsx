"use client";

import React from "react";
import {
   ShoppingCart,
   LayoutDashboard,
   UsersRound,
   Settings,
   GitGraph,
   User,
   Users,
   Clock,
   Blocks,
   Link,
   ArrowUpLeftSquare,
   Phone,
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
         <div className="py-2">
            {!isCollapsed && <p className="ml-4 my-2">Metrics</p>}
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
                     title: "Transactions",
                     href: "/dashboard/transactions",
                     icon: UsersRound,
                     variant: "ghost",
                  },
                  {
                     title: "Summary",
                     href: "/dashboard/summary",
                     icon: GitGraph,
                     variant: "ghost",
                  },
                  {
                     title: "Clients",
                     href: "/dashboard/clients",
                     icon: Users,
                     variant: "ghost",
                  },
                  {
                     title: "Events",
                     href: "/dashboard/events",
                     icon: Clock,
                     variant: "ghost",
                  },
               ]}
            />
         </div>
         <div className="py-2 border-t">
            {!isCollapsed && <p className="ml-4 my-2">Products</p>}
            <Nav
               isCollapsed={mobileWidth ? true : isCollapsed}
               links={[
                  {
                     title: "Application",
                     href: "/dashboard/apps",
                     icon: Blocks,
                     variant: "default",
                  },
                  {
                     title: "Links",
                     href: "/dashboard/links",
                     icon: Link,
                     variant: "ghost",
                  },
               ]}
            />
         </div>

         <div className="py-2 border-t">
            {!isCollapsed && <p className="ml-4 my-2">Admin</p>}
            <Nav
               isCollapsed={mobileWidth ? true : isCollapsed}
               links={[
                  {
                     title: "Withdrawals",
                     href: "/dashboard/withdrawals",
                     icon: ArrowUpLeftSquare,
                     variant: "default",
                  },
                  {
                     title: "Approved Numbers",
                     href: "/dashboard/approved-numbers",
                     icon: Phone,
                     variant: "ghost",
                  },
                  {
                     title: "Account",
                     href: "/dashboard/account",
                     icon: Settings,
                     variant: "ghost",
                  },
               ]}
            />
         </div>
      </div>
   );
}
