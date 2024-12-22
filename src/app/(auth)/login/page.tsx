import Login from "@/components/pages/Login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Login",
   description: "Login into your zibapay account",
};

const page = () => {
   return <Login />;
};

export default page;
