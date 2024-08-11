import NumbersComponent from "@/components/pages/ApproavedNumbers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Approved Numbers - Dashboard",
   description: "Approved numbers",
};

const page = () => {
   return <NumbersComponent />;
};

export default page;
