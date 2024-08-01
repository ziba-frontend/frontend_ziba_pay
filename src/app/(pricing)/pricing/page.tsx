import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
   return (
      <div className="mt-[100px] pt-6 md:pt-20 ">
         <div className="container">
            <h1 className="md:w-5/6 xl:w-[40%] my-2">
               We Have The Best Pricing Package
            </h1>
            <p className="my-2">
               Find pricing plans that are clear and tailored to your business
            </p>
            <Button className="p-6 my-4">
               <Link href="/sign-up">Create A Free Account</Link>
            </Button>
         </div>
      </div>
   );
};

export default page;
