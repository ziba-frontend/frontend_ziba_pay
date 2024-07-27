"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../../public/svg/logo.svg";
import help1 from "../../../../public/images/help1.png";
import help2 from "../../../../public/images/help2.png";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define the search data type
interface SearchData {
   title: string;
   link: string;
}

// Sample search data
const searchData: SearchData[] = [
   { title: "How secure is Ziba pay?", link: "/help-center/ziba-pay-security" },
   { title: "Virtual Accounts", link: "/help-center/virtual-accounts" },
   { title: "Ziba pay APIs", link: "/help-center/ziba-pay-apis" },
   // Add more search data as needed
];

const WithSearchLayout: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
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
         <Image
            src={help1}
            alt="ziba help center"
            className="absolute right-0 -z-20"
         />
         {showSearchForm && (
            <div className="absolute left-[34px] md:left-auto md:right-[34px] 2xl:right-[115px] top-[170px] md:top-[120px] w-[344px]">
               <form
                  className={`flex gap-4 bg-white items-center p-[15px] rounded-full transition-all ${
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

         <section className="min-h-[75vh] border-b ">{children}</section>
         <div className="flex items-start h-[80px] container pt-4">
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

export default WithSearchLayout;
