"use client";

import { JSX, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DashboardNavbar from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import Link from "next/link";

type DashboardLayoutProps = {
   children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
   const [isOpen, setIsOpen] = useState(false);
   const [isClient, setIsClient] = useState(true);
   const [isSidebar, setIsSidebar] = useState(true);
   const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

   return (
      <main className="flex h-screen max-w-[1840px] mx-auto bg-subprimary overflow-x-hidden">
         {isSidebar && (
            <section
               className={`transition-all duration-300 sticky top-0 hidden xl:block ${
                  isSidebarMinimized ? "w-[80px]" : "w-[280px]"
               } h-full bg-white`}
            >
               <DashboardSidebar
                  setIsSidebarMinimized={setIsSidebarMinimized}
                  setIsSheetOpen={setIsOpen}
                  isSidebarMinimized={isSidebarMinimized}
               />
            </section>
         )}
         {isClient && (
            <Sheet
               open={isOpen}
               onOpenChange={setIsOpen}
            >
               <SheetContent
                  side={"left"}
                  className="px-0 w-[280px]"
               >
                  <DashboardSidebar
                     setIsSidebarMinimized={setIsSidebarMinimized}
                     setIsSheetOpen={setIsOpen}
                     isSidebarMinimized={isSidebarMinimized}
                  />
               </SheetContent>
            </Sheet>
         )}
         <section className="flex-1 flex flex-col gap-3 py-3 px-3 max-w-full relative overflow-x-hidden">
            <DashboardNavbar
               setIsSheetOpen={setIsOpen}
               setIsSidebarOpen={setIsSidebar}
               isSidebarOpen={isSidebar}
               setIsSidebarMinimized={setIsSidebarMinimized}
               isSidebarMinimized={isSidebarMinimized}
            />
            <div className="flex-1 bg-white overflow-y-auto relative mb-4 px-4">
               {children}
            </div>
         </section>
      </main>
   );
}

export default DashboardLayout;
