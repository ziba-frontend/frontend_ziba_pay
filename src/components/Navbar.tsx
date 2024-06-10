"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../public/svg/logo.svg";
import Image from "next/image";
import drop1 from "../../public/images/drop1.png";
import drop2 from "../../public/images/drop2.png";

type MenuItems = { [key: string]: { label: string; href: string }[] };

const menuItems: MenuItems = {
   Products: [
      { label: "Payment processing solutions", href: "/payment-processing" },
      {
         label: "Financial management tool",
         href: "/financial-management-tool",
      },
      {
         label: "Custom Solution For your business",
         href: "/custom-solution-for-business",
      },
      { label: "Ecommerce solutions", href: "/ecommerce-solutions" },
      {
         label: "Healthcare Payment Solutions",
         href: "/health-care-payment-solutions",
      },
      { label: "Hospitality", href: "/hospitality" },
      { label: "Education", href: "/education" },
      { label: "Invoicing and billing", href: "/billing" },
   ],
   Company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blogs", href: "/blogs" },
      { label: "Partnership", href: "/partnership" },
   ],
   Support: [
      { label: "Help Center", href: "/help-center" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
   ],
};

type DropdownProps = {
   title: string;
   items: { label: string; href: string }[];
};

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => (
   <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
         {title}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-6 relative">
         <Image
            src={drop1}
            alt="ziba"
            className="absolute top-0 left-0"
            height={40}
            width={40}
         />
         <Image
            src={drop2}
            alt="ziba"
            className="absolute bottom-0 right-0"
            height={40}
            width={40}
         />
         {items.map((item, index) => (
            <DropdownMenuItem key={index}>
               <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
         ))}
      </DropdownMenuContent>
   </DropdownMenu>
);

const Navbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="container mx-auto p-4 flex items-center justify-between h-[100px]">
         <div className="flex items-center">
            <Link
               href="/"
               className=""
            >
               <Image
                  src={logo}
                  alt="ZibaPay"
               />
            </Link>
            <div className="hidden md:flex w-1/2 gap-12 ml-8">
               {Object.entries(menuItems).map(([title, items]) => (
                  <Dropdown
                     key={title}
                     title={title}
                     items={items}
                  />
               ))}
               <Link href="/api-docs">Developer</Link>
            </div>
         </div>
         <div className="hidden md:flex gap-3">
            <Link href="/login">
               <Button variant="outline">Login</Button>
            </Link>
            <Link href="/sign-up">
               <Button>Create Account</Button>
            </Link>
         </div>
         <div className="md:hidden flex items-center">
            <button
               onClick={toggleMenu}
               className="text-2xl"
            >
               {isOpen ? <AiOutlineClose /> : <FiMenu />}
            </button>
         </div>
         {isOpen && (
            <div className="absolute top-[100px] left-0 w-full  bg-white md:hidden ">
               <div className="flex flex-col items-center p-4  gap-5 text-2xl ">
                  {Object.entries(menuItems).map(([title, items]) => (
                     <Dropdown
                        key={title}
                        title={title}
                        items={items}
                     />
                  ))}
                  <Link
                     href="/api-docs"
                     className="block py-2"
                  >
                     Developer
                  </Link>
                  <div className="flex flex-col gap-3 mt-4 ">
                     <Link href="/login">
                        <Button
                           variant="outline"
                           className="w-full"
                        >
                           Login
                        </Button>
                     </Link>
                     <Link href="/sign-up">
                        <Button className="w-full">Create Account</Button>
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Navbar;
