import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import CheckoutNavbar from "@/components/CheckoutNavbar";
import CheckoutSidebar from "@/components/CheckoutSidebar";
import CheckoutFooter from "@/components/CheckoutFooter";

export const metadata: Metadata = {
  title: "Checkout - ZibaPay",
  description: "ZibaPay secure checkout page",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-8 px-4">
      <div className="w-full md:w-5/6 xl:w-[65%] max-w-6xl">
        <div className="flex rounded-xl overflow-hidden shadow-xl bg-white border border-gray-200">
          <CheckoutSidebar />
          
          <section className="transition-all duration-300 py-6 px-6 w-full">
            
            <div className="py-2">
              {children}
            </div>
            
            <CheckoutFooter />
          </section>
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <ShieldCheck size={18} className="text-green-600" />
            <p className="text-gray-700 text-sm">
              Secured by{" "}
              <Link href="/" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                ZibaPay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;