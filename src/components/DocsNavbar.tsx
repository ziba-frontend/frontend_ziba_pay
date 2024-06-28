"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes, FaBars } from "react-icons/fa";
import { Button } from "./ui/button";
import FocusLock from "react-focus-lock";

import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";

interface SearchResult {
   id: string;
   content: string;
   type: string;
   url: string;
}

const DocsNavbar = () => {
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
   const router = useRouter();
   const drawerRef = useRef<HTMLDivElement>(null);

   const fetchSearchResults = async (query: string) => {
      try {
         const response = await fetch(`/api/search?query=${query}`);
         if (response.ok) {
            const results: SearchResult[] = await response.json();
            setSearchResults(
               results.filter((result) => result.type === "page")
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
      if (searchQuery) {
         fetchSearchResults(searchQuery);
         setIsDrawerOpen(true);
      } else {
         setSearchResults([]);
         setIsDrawerOpen(false);
      }
   }, [searchQuery]);

   const handleSearch = (event: React.FormEvent) => {
      event.preventDefault();
      if (searchResults.length > 0) {
         router.push(searchResults[0].url);
         setSearchResults([]);
         setSearchQuery("");
         setIsDrawerOpen(false);
      }
   };

   const handleOutsideClick = (event: MouseEvent) => {
      if (
         drawerRef.current &&
         !drawerRef.current.contains(event.target as Node)
      ) {
         setIsDrawerOpen(false);
      }
   };

   useEffect(() => {
      if (isDrawerOpen) {
         document.addEventListener("mousedown", handleOutsideClick);
      } else {
         document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [isDrawerOpen]);

   // Function to toggle mobile menu
   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <div className="h-[90px] fixed left-0 top-0 w-full z-[99] bg-background shadow-md">
         <div className="container mx-auto p-4 flex items-center justify-between ">
            <Link href="/">API-DOCS</Link>
            <div className="flex items-center gap-10 ">
               <form
                  onSubmit={handleSearch}
                  className="flex gap-4 bg-transparent items-center p-2 rounded-full w-[200px] md:w-[300px] border border-main"
               >
                  <FaSearch className="text-main" />
                  <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="outline-none w-5/6 bg-transparent"
                     placeholder="Search..."
                     onFocus={() => setIsDrawerOpen(true)}
                  />
               </form>
               <div className="flex items-center gap-4 ">
                  <Link href="#">API</Link>
                  <Link href="/help-center">Support</Link>
                  <Link href="/login">
                     <Button className="bg-main">Sign in</Button>
                  </Link>
               </div>
            </div>
            <div className="md:hidden">
               <button
                  onClick={toggleMenu}
                  className="text-main"
               >
                  <FaBars size={24} />
               </button>
            </div>
         </div>
         {/* Mobile menu */}
         {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg p-4 absolute top-[100px] left-0 right-0">
               <form
                  onSubmit={handleSearch}
                  className="flex gap-4 bg-transparent items-center p-2 rounded-full w-full border border-main mb-4"
               >
                  <FaSearch className="text-main" />
                  <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="outline-none w-full bg-transparent"
                     placeholder="Search..."
                     onFocus={() => setIsDrawerOpen(true)}
                  />
               </form>
               <div className="flex flex-col gap-4">
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
                  <Link
                     href="/login"
                     onClick={() => setIsMenuOpen(false)}
                  >
                     <Button className="bg-main w-full">Sign in</Button>
                  </Link>
               </div>
            </div>
         )}
         {/* Drawer for search results */}
         <Drawer open={isDrawerOpen}>
            <FocusLock>
               <DrawerTrigger></DrawerTrigger>
               <DrawerContent
                  ref={drawerRef}
                  className="bg-transparent fixed z-50 left-0 md:left-1/2 top-20 transform md:-translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-auto max-h-[90%] rounded-lg shadow-lg p-6"
               >
                  <DrawerHeader className="bg-background flex justify-between items-center">
                     <DrawerTitle>Search Results</DrawerTitle>
                     <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-main"
                     >
                        <FaTimes />
                     </button>
                  </DrawerHeader>
                  <div className="bg-background p-2">
                     <form onSubmit={handleSearch}>
                        <div className="flex gap-4 bg-transparent items-center rounded-full border border-main p-2 w-full md:w-[80%]">
                           <FaSearch className="text-main" />
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="outline-none w-full bg-transparent"
                              placeholder="Search..."
                           />
                        </div>
                     </form>
                  </div>
                  {searchResults.length > 0 && (
                     <ul className="bg-background p-2">
                        {searchResults.map((result: SearchResult) => (
                           <li
                              key={result.id}
                              className="py-2"
                           >
                              <Link
                                 href={result.url}
                                 className="hover:underline "
                                 onClick={() => setIsDrawerOpen(false)}
                              >
                                 {result.content}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  )}
               </DrawerContent>
            </FocusLock>
         </Drawer>
      </div>
   );
};

export default DocsNavbar;
