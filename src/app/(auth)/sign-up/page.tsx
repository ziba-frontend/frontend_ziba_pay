import SignUp from "@/components/pages/Signup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Create Account - Ziba Pay",
   description: "Create your zibapay account",
};

const page = () => {
   return <SignUp />;
};

export default page;
