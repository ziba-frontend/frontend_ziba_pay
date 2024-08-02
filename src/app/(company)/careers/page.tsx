import Careers from "@/components/pages/Careers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Careers At Ziba Pay",
  description: "Join Zibapay and shape the future of payment solutions.",
};

const page = () => {
   return <Careers />;
};

export default page;
