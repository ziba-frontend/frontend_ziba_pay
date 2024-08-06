import Apps from "@/components/pages/Apps";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Applications - Dashboard",
  description: "Applications",
};
const page = () => {
   return <Apps />;
};

export default page;
