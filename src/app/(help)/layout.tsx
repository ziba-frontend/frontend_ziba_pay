"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../public/svg/logo.svg";
import help1 from "../../../public/images/help1.png";
import help2 from "../../../public/images/help2.png";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";


interface SearchData {
   title: string;
   link: string;
}


const searchData: SearchData[] = [
   { title: "How secure is Ziba pay?", link: "/help-center/ziba-pay-security" },
   { title: "Virtual Accounts", link: "/help-center/virtual-accounts" },
   { title: "Ziba pay APIs", link: "/help-center/ziba-pay-apis" },
 
];

interface LayoutProps {
  children: React.ReactNode;
  showFormAndImage?: boolean; 
  hideBorder?: boolean; 
}

const Layout: React.FC<LayoutProps> = ({ children, showFormAndImage = true, hideBorder = false }) => {
   const pathname = usePathname();
   const showSearchForm = pathname !== "/help-center/request";
   const [query, setQuery] = useState<string>("");
   const [filteredResults, setFilteredResults] = useState<SearchData[]>([]);
   const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

   useEffect(() => {
      if (query) {
         const results = searchData.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
         );
         setFilteredResults(results);
      } else {
         setFilteredResults([]);
      }
   }, [query]);

   return (
      <>
         {showFormAndImage && (
            <Image
               src={help1}
               alt="ziba help center"
               className="absolute right-0 -z-20"
            />
         )}
         {showFormAndImage && showSearchForm && (
            <div className="absolute right-12 top-[150px] w-[200px] md:w-[300px]">
               <form
                  className={`flex gap-4 bg-white items-center p-2 rounded-full transition-all ${
                     isInputFocused ? "border-2 border-main" : "border"
                  }`}
               >
                  <FaSearch color="gray" />
                  <input
                     className="outline-none w-5/6"
                     placeholder="Search..."
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     onFocus={() => setIsInputFocused(true)}
                     onBlur={() => setIsInputFocused(false)}
                  />
               </form>
               {filteredResults.length > 0 && (
                  <div className="bg-white mt-2 rounded-md shadow-lg">
                     {filteredResults.map((result, index) => (
                        <Link
                           key={index}
                           href={result.link}
                           onClick={() => setQuery("")} // Clear the query on click
                        >
                           <div className="p-2 hover:bg-gray-100 cursor-pointer">
                              {result.title}
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         )}
         <div className={`border-b ${hideBorder ? "border-none" : ""}`}>
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

         <section className={`min-h-[75vh] ${hideBorder ? "" : "border-b"}`}>{children}</section>
         <div className="flex items-start h-[80px] container">
            <h4 className="mt-4">
               <Link href="/">Ziba Pay </Link>
            </h4>
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
