import AdminLogin from "@/components/admin/AdminLogin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Admin Login - Ziba Pay",
   description: "Admin Login page",
};
const page = () => {
   return <AdminLogin />;
};

export default page;
