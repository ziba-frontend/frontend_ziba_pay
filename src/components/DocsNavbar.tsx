import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";

const DocsNavbar = () => {
   return (
      <div className="bg-white">
         <div className="container mx-auto p-4 flex items-center justify-between h-[100px]">
            <Link href="/"> API-DOCS</Link>
            <div className="flex items-center gap-10">
               <form className="flex gap-4 bg-transparent items-center p-2 rounded-full w-[200px] md:w-[300px] border border-main">
                  <FaSearch className="text-main" />
                  <input className="outline-none w-5/6 bg-transparent " />
               </form>
               <Link href="#">API</Link>
               <Link href="/help-center">Support</Link>
               <Link href="/login">
                  <Button className="bg-main">Sign in</Button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default DocsNavbar;
