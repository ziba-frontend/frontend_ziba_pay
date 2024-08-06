import Clients from "@/components/pages/Clients";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Clients - Dashboard",
   description: "Clients",
};
const page = () => {
   return <Clients />;
};

export default page;
