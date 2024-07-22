"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { Sidebar } from "lucide-react";

const DocsSidebar = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const isLargeScreen = useMediaQuery({ minWidth: 1024 });

   useEffect(() => {
      setIsSidebarOpen(isLargeScreen);
   }, [isLargeScreen]);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   return (
      <>
         <div
            className={`fixed top-[90px] left-0 h-screen bg-background overflow-y-scroll px-4 pb-40 transform pt-6 ${
               isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out w-[250px]`}
         >
            <Accordion
               type="multiple"
               collapsible
               className="w-full"
            >
               {/* Get started section */}
               <AccordionItem
                  value="item-1"
                  className="border-none"
               >
                  <AccordionTrigger className="font-bold">
                     Get started
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                     <p className="py-2">Introduction</p>
                     <p className="py-2">Quick Start</p>
                     <p className="py-2">Client</p>
                     <p className="py-2">Libraries</p>
                  </AccordionContent>
               </AccordionItem>

               {/* Guide section */}
               <AccordionItem
                  value="item-2"
                  className="border-none"
               >
                  <AccordionTrigger className="font-bold">
                     Guide
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                     <p className="py-2">Authentication</p>
                     <p className="py-2">Error Handling</p>
                     <p className="py-2">Response</p>
                     <p className="py-2">Request</p>
                     <p className="py-2">Pagination</p>
                     <p className="py-2">Webhook</p>
                  </AccordionContent>
               </AccordionItem>

               {/* Core Resources section */}
               <AccordionItem
                  value="item-3"
                  className="border-none"
               >
                  <AccordionTrigger className="font-bold">
                     Core Resources
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                     <p className="py-2">Payment</p>
                     <p className="py-2">Overview</p>
                     <p className="py-2">Accept Payment</p>
                     <p className="py-2">Subscription</p>
                     <p className="py-2">Payout</p>
                     <p className="py-2">Refund</p>
                     <p className="py-2">Split Payment</p>
                     <p className="py-2">Transaction Search</p>
                     <p className="py-2">Orders</p>
                     <p className="py-2">Invoicing</p>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
         <button
            onClick={toggleSidebar}
            className={`fixed bottom-4 ${
               isSidebarOpen ? "right-4" : "left-4"
            } bg-gray-800 text-white p-2 rounded-full z-50`}
         >
            <Sidebar size={20} />
         </button>
      </>
   );
};

export default DocsSidebar;
