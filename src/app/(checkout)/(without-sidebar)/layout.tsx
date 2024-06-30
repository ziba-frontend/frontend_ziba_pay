import { LockKeyhole } from "lucide-react";

import Link from "next/link";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <div className=" mx-auto w-full md:w-5/6 lg:w-[50%]"></div>
         <div className="flex gap-2 mt-12">
            <LockKeyhole />{" "}
            <p>
               Secured by{" "}
               <Link
                  href="/"
                  className="font-bold"
               >
                  ZibaPay
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Layout;
