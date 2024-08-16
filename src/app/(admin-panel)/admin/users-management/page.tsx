import UsersPage from "@/components/pages/Users";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Users - Dashboard",
   description: "Users",
};

const page = () => {
   return <UsersPage />;
};

export default page;
