import Account from "@/components/pages/Account";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Profile - Dashboard",
   description: "Profile",
};

const page = () => {
   return <Account />;
};

export default page;
