import BlogsPage from "@/components/pages/Blogs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Blogs - Dashboard",
   description: "Blogs",
};

const page = () => {
   return <BlogsPage />;
};

export default page;
