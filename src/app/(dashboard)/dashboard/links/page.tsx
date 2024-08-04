import Links from "@/components/pages/Links";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Links - Dashboard",
   description: "Links",
};

const page = () => {
   return <Links />;
};

export default page;
