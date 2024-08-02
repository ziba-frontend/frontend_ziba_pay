import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
   title: "Zibapay help center",
   description: "Get support and answers with Zibapay's comprehensive help center.",
};

const HelpCenter = () => {
   return (
      <div className="container flex items-center justify-center  min-h-[80vh] ">
         <div className="flex flex-col gap-4  w-full md:w-[60%]">
            <h1>General</h1>
            <h4>FAQ</h4>
            <Link href="help-center/ziba-pay-security">
               <p>How secure is Ziba pay?</p>
            </Link>
            <Link href="help-center/virtual-accounts">
               <p>Virtual Accounts</p>
            </Link>
            <Link href="help-center/ziba-pay-apis">
               {" "}
               <p>Ziba pay APIs</p>
            </Link>
         </div>
      </div>
   );
};

export default HelpCenter;
