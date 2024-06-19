import CheckoutFooter from "@/components/CheckoutFooter";
import CheckoutNavbar from "@/components/CheckoutNavbar";
import CheckoutSidebar from "@/components/CheckoutSidebar";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className=" mx-auto w-[50%]">
         <div className="flex shadow-lg border">
            <CheckoutSidebar />
            <section className="transition-all duration-300 py-6 pr-4 md:pr-10    w-full">
               <CheckoutNavbar />
               {children}
               <CheckoutFooter />
            </section>
         </div>
      </div>
   );
};

export default Layout;
