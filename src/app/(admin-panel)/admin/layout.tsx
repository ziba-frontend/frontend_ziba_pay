"use client";
import React, { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import SideNavbar from "@/components/SideNavbar";
import AdminSidebar from "@/components/AdminSidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);

      const handleResize = () => {
         if (window.innerWidth < 768) {
            setIsCollapsed(true);
         } else {
            setIsCollapsed(false);
         }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
   };

   if (!isClient) {
      return null;
   }

   return (
      <div className="flex bg-white min-h-screen overflow-x-scroll">
         <DashboardNav />
         <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
         <div className={`transition-all duration-300 py-6 pr-4 md:pr-10 ${isCollapsed ? "ml-[80px]" : "ml-[px] md:ml-[260px]"} mt-[140px] w-full`}>
            {children}
         </div>
      </div>
   );
};

export default Layout;