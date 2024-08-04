import Summary from "@/components/pages/Summary";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Summary - Dashboard",
   description: "Summary",
};

const page = () => {
   return <Summary />;
};

export default page;
