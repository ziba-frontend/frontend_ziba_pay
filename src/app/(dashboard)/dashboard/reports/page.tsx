import Reports from "@/components/pages/Reports";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Reports - Dashboard",
   description: "Reports",
};

const page = () => {
   return <Reports />;
};

export default page;
