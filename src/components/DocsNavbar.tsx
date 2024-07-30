"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaBars } from "react-icons/fa";
import { Button } from "./ui/button";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

interface SearchResult {
   id: string;
   content: string;
   type: string;
   url: string;
}

const DocsNavbar = () => {
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
   const router = useRouter();
   const searchRef = useRef<HTMLFormElement>(null);

   const fetchSearchResults = async (query: string) => {
      try {
         console.log(`Fetching search results for query: ${query}`);
         const response = await fetch(`/api/search?query=${query}`);
         if (response.ok) {
            const results: SearchResult[] = await response.json();
            console.log("Fetched results:", results);
            setSearchResults(
               results.filter((result) => result.type === "text")
            );
         } else {
            console.error(
               "Error fetching search results:",
               response.statusText
            );
         }
      } catch (error) {
         console.error("Error fetching search results:", error);
      }
   };

   useEffect(() => {
      if (searchQuery.length >= 3) {
         fetchSearchResults(searchQuery);
      } else {
         setSearchResults([]);
      }
   }, [searchQuery]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            searchRef.current &&
            !searchRef.current.contains(event.target as Node)
         ) {
            setSearchResults([]);
            setSearchQuery("");
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleSearch = (event: React.FormEvent) => {
      event.preventDefault();
      if (searchResults.length > 0) {
         router.push(searchResults[0].url);
         setSearchResults([]);
         setSearchQuery("");
         if (isMenuOpen) {
            setIsMenuOpen(false); // Close the menu on search
         }
      }
   };

   const handleResultClick = (url: string) => {
      router.push(url);
      setSearchResults([]);
      setSearchQuery("");
      if (isMenuOpen) {
         setIsMenuOpen(false); // Close the menu on link click
      }
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const truncateContent = (content: string, maxLength: number) => {
      if (content.length > maxLength) {
         return content.slice(0, maxLength) + "...";
      }
      return content;
   };

   return (
      <div className="h-[90px] fixed left-0 top-0 w-full z-[50] bg-background shadow-md">
         <div className="container mx-auto p-4 flex items-center justify-between">
            <Link href="/api-docs/start/introduction">API-DOCS</Link>

            <div className="flex items-center gap-10">
               <form
                  onSubmit={handleSearch}
                  className="relative bg-transparent p-2 rounded-md w-[200px] md:w-[300px] lg:w-[400px] border border-main docform"
                  ref={searchRef}
               >
                  <FaSearch className="text-main mx-2" />
                  <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="outline-none w-5/6 bg-transparent"
                     placeholder="Search..."
                  />
                  {searchResults.length > 0 && (
                     <div className="absolute left-0 right-0 top-[30px] mt-2 bg-background border border-t-main rounded-b-md shadow-xl z-40 p-2 max-h-[300px] overflow-y-auto no-scrollbar ">
                        {searchResults.map((result) => (
                           <div
                              key={result.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleResultClick(result.url)}
                           >
                              <p
                                 className="text-sm font-semibold"
                                 title={result.content}
                              >
                                 {truncateContent(result.content, 50)}
                              </p>
                           </div>
                        ))}
                     </div>
                  )}
               </form>
               <div className="docnav">
                  <Link href="/api-docs/start/introduction">API</Link>
                  <Link href="/help-center">Support</Link>
                  <Link href="/login">
                     <Button className="bg-main">Sign in</Button>
                  </Link>
               </div>
               <button
                  className="md:hidden text-main"
                  onClick={toggleMenu}
               >
                  <FaBars size={20} />
               </button>
            </div>
         </div>
         {isMenuOpen && (
            <div className="md:hidden bg-background shadow-lg p-6 absolute top-[90px] left-0 w-full h-screen overflow-y-scroll pb-20 no-scrollbar">
               <div className="flex flex-col gap-4 ">
                  <Link
                     href="#"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     API
                  </Link>
                  <Link
                     href="/help-center"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     Support
                  </Link>

                  <Button
                     className="bg-main w-fit p-6"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     <Link href="/login">Sign in</Link>
                  </Button>

                  <Accordion
                     type="single"
                     collapsible
                     className="w-full"
                  >
                     <AccordionItem
                        value="item-1"
                        className="border-b border-black/30 py-4"
                     >
                        <AccordionTrigger className="font-bold">
                           Get started
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-4 flex-col pl-6">
                           <Link
                              href="./introduction"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Introduction
                           </Link>
                           <Link
                              href="./quick"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Quick Start
                           </Link>
                           <Link
                              href="./client"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Client
                           </Link>
                           <Link
                              href="./libraries"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Libraries
                           </Link>
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem
                        value="item-2"
                        className="border-b border-black/30 py-4"
                     >
                        <AccordionTrigger className="font-bold">
                           Guide
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-4 flex-col pl-6">
                           <Link
                              href="/api-docs/guide/authentication"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Authentication
                           </Link>
                           <Link
                             href="/api-docs/guide/error-handling"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Error Handling
                           </Link>
                           <Link
                              href="/api-docs/guide/response"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Response
                           </Link>
                           <Link
                              href="/api-docs/guide/request"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Request
                           </Link>
                           <Link
                              href="/api-docs/guide/pagination"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Pagination
                           </Link>
                           <Link
                              href="/api-docs/guide/webhook"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Webhook
                           </Link>
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem
                        value="item-3"
                        className="border-b border-black/30 py-4"
                     >
                        <AccordionTrigger className="font-bold">
                           Core Resources
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-4 flex-col pl-6">
                           <Link
                              href="/api-docs/core/payment"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Payment
                           </Link>
                           <Link
                              href="/api-docs/core/overview"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Overview
                           </Link>
                           <Link
                              href="/api-docs/core/accept-payment"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Accept Payment
                           </Link>
                           <Link
                              href="/api-docs/core/subscription"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Subscription
                           </Link>
                           <Link
                              href="/api-docs/core/payout"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Payout
                           </Link>
                           <Link
                              href="/api-docs/core/refund"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Refund
                           </Link>
                           <Link
                              href="/api-docs/core/split-payment"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Split Payment
                           </Link>
                           <Link
                              href="/api-docs/core/transaction-search"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Transaction Search
                           </Link>
                           <Link
                              href="/api-docs/core/orders"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Orders
                           </Link>
                           <Link
                              href="/api-docs/core/invoicing"
                              onClick={() => setIsMenuOpen(false)}
                           >
                              Invoicing
                           </Link>
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>
               </div>
            </div>
         )}
      </div>
   );
};

export default DocsNavbar;
