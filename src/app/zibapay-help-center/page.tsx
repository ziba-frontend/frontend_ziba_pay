"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Layout from "../(help)/layout";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SearchData {
   title: string;
   link: string;
}

const searchData: SearchData[] = [
   { title: "How secure is Ziba pay?", link: "/help-center/ziba-pay-security" },
   { title: "Virtual Accounts", link: "/help-center/virtual-accounts" },
   { title: "Ziba pay APIs", link: "/help-center/ziba-pay-apis" },
];
const ZibapayHelp = () => {
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
      <Layout
         showFormAndImage={false}
         hideBorder={true}
      >
         <div
            className="flex items-center justify-center min-h-[40vh] bg-no-repeat bg-cover bg-center mt-12"
            style={{
               backgroundImage: "url('/svg/help1.svg')",
            }}
         >
            <div className="w-5/6 sm:w-3/4 ">
               <form
                  className={`flex gap-4 bg-white items-center sm:p-6 p-2 rounded-full transition-all ${
                     isInputFocused ? "border-2 border-main" : "border"
                  }`}
               >
                  <Search color="gray" />
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
                           onClick={() => setQuery("")}
                        >
                           <div className="p-2 hover:bg-gray-100 cursor-pointer">
                              {result.title}
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         </div>

         <div className="container flex items-center justify-center py-12 flex-col gap-6">
            <div className="flex gap-4 lg:gap-12 flex-wrap items-center justify-center  my-6">
               <Button
                  variant="outline"
                  className="md:w-[200px] lg:w-[383px] hover:border-main hover:bg-main hover:text-white p-6"
               >
                  <Link href="/help-center">General</Link>
               </Button>
               <Button
                  variant="outline"
                  className="md:w-[200px] lg:w-[383px] hover:border-main hover:bg-main hover:text-white p-6"
               >
                  <Link href="/help-center">Getting Started</Link>
               </Button>
               <Button
                  variant="outline"
                  className="md:w-[200px] lg:w-[383px] hover:border-main hover:bg-main hover:text-white p-6"
               >
                  Pricing
               </Button>
            </div>
            <Button
               variant="outline"
               className="w-[93%] hover:border-main hover:bg-main hover:text-white p-6"
            >
               Disputes
            </Button>
         </div>
      </Layout>
   );
};

export default ZibapayHelp;
