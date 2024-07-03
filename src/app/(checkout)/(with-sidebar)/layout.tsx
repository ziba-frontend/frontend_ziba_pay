import CheckoutFooter from "@/components/CheckoutFooter";
import CheckoutNavbar from "@/components/CheckoutNavbar";
import CheckoutSidebar from "@/components/CheckoutSidebar";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen  py-12">
         <div className=" mx-auto w-full md:w-5/6 lg:w-[50%]">
            <div className="flex shadow-lg border">
               <CheckoutSidebar />
               <section className="transition-all duration-300 py-6 pr-4 md:pr-10    w-full">
                  <CheckoutNavbar />
                  {children}
                  <CheckoutFooter />
               </section>
            </div>
         </div>
         <div className="flex gap-2 mt-6">
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
