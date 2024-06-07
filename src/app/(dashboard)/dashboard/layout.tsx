"use client";
import React, { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";
import SideNavbar from "@/components/SideNavbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
   };

   if (!isClient) {
      // Render nothing on the server
      return null;
   }

   return (
      <div className='flex'>
         <DashboardNav toggleSidebar={toggleSidebar} />
         <SideNavbar isCollapsed={isCollapsed} />
         <div
            className={`transition-all duration-300 py-6 pr-4 md:pr-10 ${
               isCollapsed ? "ml-[80px]" : "ml-[250px]"
            } mt-[140px] w-full`}
         >
            {children}
         </div>
      </div>
   );
};

export default Layout;
