"use client";
import React, { useEffect, useState } from "react";
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
   Sidebar,
   PenSquare,
   WalletCards,
   Signal,
} from "lucide-react";
import { FaBars } from "react-icons/fa";
import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "./ui/nav";
import { getUserProfile } from "@/lib/api-calls/auth-server";
import toast from "react-hot-toast";

type Props = {
   isCollapsed: boolean;
   toggleSidebar: () => void;
};

export default function SideNavbar({ isCollapsed, toggleSidebar }: Props) {
   const onlyWidth = useWindowWidth();
   const mobileWidth = onlyWidth < 768;
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const user = await getUserProfile();
            if (user.role === "admin") {
               setIsAdmin(true);
            }
         } catch (error) {
            toast.error("Error fetching user profile");
            console.error("Error fetching user profile:", error);
         }
      };

      fetchUserProfile();
   }, []);
   return (
      <div
         className={`fixed top-[100px] left-0 bg-white bottom-0 z-20 overflow-y-scroll no-scrollbar ${
            isCollapsed || mobileWidth ? "w-[60px]" : "w-[200px] md:w-[250px]"
         } border-r p-4 transition-width duration-300`}
      >
         <div className="py-2">
            {!(isCollapsed || mobileWidth) && (
               <p className="ml-4 my-2">Metrics</p>
            )}
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
                     icon: WalletCards ,
                     variant: "ghost",
                  },
                  {
                     title: "Summary",
                     href: "/dashboard/summary",
                     icon: Signal ,
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
            {!(isCollapsed || mobileWidth) && (
               <p className="ml-4 my-2">Products</p>
            )}
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

      
         {isAdmin ? (
            <div className="py-2 border-t ">
               {!(isCollapsed || mobileWidth) && (
                  <p className="ml-4 my-2">Admin</p>
               )}
               <Nav
                  isCollapsed={mobileWidth ? true : isCollapsed}
                  links={[
                     {
                        title: "Users",
                        href: "/dashboard/users",
                        icon: Users,
                        variant: "default",
                     },
                     {
                        title: "Blogs",
                        href: "/dashboard/blogs",
                        icon:PenSquare,
                        variant: "ghost",
                     },
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
         ) : (
            <div className="py-2 border-t ">
               {!(isCollapsed || mobileWidth) && (
                  <p className="ml-4 my-2">Admin</p>
               )}
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
         )}

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

