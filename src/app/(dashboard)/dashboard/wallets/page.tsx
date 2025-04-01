
import Wallets from "@/components/pages/Wallets";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Wallets - Dashboard",
   description: "Wallets",
};

const page = () => {
   return <Wallets />;
};

export default page;
