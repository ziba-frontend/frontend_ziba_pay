"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../public/svg/logo.svg";
import help1 from "../../../public/images/help1.png";
import help2 from "../../../public/images/help2.png";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const pathname = usePathname();
   const showSearchForm = pathname !== "/help-center/request";

   return (
      <>
         <Image
            src={help1}
            alt="ziba help center"
            className="absolute right-0 -z-20"
         />
         {showSearchForm && (
            <form className="absolute right-12 top-[150px] flex gap-4 bg-white items-center p-2 rounded-full w-[200px] md:w-[300px]">
               <FaSearch color="gray" />
               <input className="outline-none w-5/6 " />
            </form>
         )}
         <div className="border-b">
            <div className="flex justify-between items-center h-[100px] container">
               <Link href="/">
                  <Image
                     src={logo}
                     alt="zibaPay"
                     className="-z-10"
                  />
               </Link>

               <Button>
                  <Link href="/help-center/request">Submit a Request</Link>
               </Button>
            </div>
         </div>

         <section className="min-h-[75vh] border-b">{children}</section>
         <div className="flex items-start h-[80px] container">
            <Link href="/">
               <h4>Ziba Pay</h4>
            </Link>
         </div>
         <Image
            src={help2}
            alt="ziba help center"
            className="fixed right-0 -bottom-20 -z-20"
         />
      </>
   );
};

export default Layout;
