import Orders from "@/components/pages/Orders";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Orders - Dashboard",
   description: "Orders",
};

const page = () => {
   return <Orders />;
};

export default page;
