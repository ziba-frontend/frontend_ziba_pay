import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Dashboard - Zibapay",
   description: "Zibapay dashboard",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
