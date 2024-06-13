import CheckoutFooter from "@/components/ui/CheckoutFooter";
import CheckoutNavbar from "@/components/ui/CheckoutNavbar";
import CheckoutSidebar from "@/components/ui/CheckoutSidebar";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex">
         <CheckoutSidebar />
         <section className="transition-all duration-300 py-6 pr-4 md:pr-10 ml-[450px]  w-full">
            <CheckoutNavbar />
            {children}
            <CheckoutFooter />
         </section>
      </div>
   );
};

export default Layout;
