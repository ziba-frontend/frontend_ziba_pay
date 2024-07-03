"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "../../public/svg/logo.svg";
import Image from "next/image";
import drop1 from "../../public/images/drop1.png";
import drop2 from "../../public/images/drop2.png";
import { createPortal } from "react-dom";
import prod1 from "../../public/images/prod1.png";

type MenuItems = {
   [key: string]: {
      label: string;
      href: string;
      img?: string;
      description?: string;
   }[];
};

const menuItems: MenuItems = {
   Products: [
      {
         label: "Payment processing solutions",
         href: "/payment-processing",
         img: "/images/prod1.png",
         description:
            "Securely accept payments online, in-person, or through mobile devices with our comprehensive payment processing solution.",
      },
      {
         label: "Invoicing and billing services",
         href: "/billing",
         img: "/images/prod2.png",
         description:
            "Streamline your invoicing process and manage billing effortlessly with our automated invoicing and billing services.",
      },
      {
         label: "Financial management tool",
         href: "/financial-management-tool",
         img: "/images/prod3.png",
         description:
            "Gain better control over your finances and make informed decisions with our suite of financial management tools.",
      },
      {
         label: "Custom Solution For your business",
         href: "/custom-solution-for-business",
         img: "/images/prod4.png",
         description:
            "Tailored solutions designed to meet the unique needs of your industry or business, whether you're in e-commerce, healthcare, hospitality, or education.",
      },
      // Add more items as needed
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
      { label: "FAQ", href: "/help-center/ziba-pay-security" },
   ],
};

type DropdownProps = {
   title: string;
   items: { label: string; href: string; img?: string; description?: string }[];
   onOpenChange: (isOpen: boolean) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ title, items, onOpenChange }) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleItemClick = () => {
      onOpenChange(false);
   };

   return (
      <DropdownMenu
         onOpenChange={(isOpen) => {
            setIsDropdownOpen(isOpen);
            onOpenChange(isOpen);
         }}
      >
         <DropdownMenuTrigger className="cursor-pointer">
            {title}
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className={`bg-white p-6 relative ${
               title === "Products" ? "w-[26rem]" : "w-64"
            } left-0`}
         >
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
               <DropdownMenuItem
                  key={index}
                  className="flex flex-col py-2 justify-start"
               >
                  {title === "Products" ? (
                     <Link
                        href={item.href}
                        className="flex items-start gap-2"
                        onClick={handleItemClick}
                     >
                        <Image
                           src={item.img!}
                           alt={item.label}
                           width={40}
                           height={40}
                        />
                        <div className="flex flex-col">
                           <span className="font-bold">{item.label}</span>
                           <span className="text-sm">{item.description}</span>
                        </div>
                     </Link>
                  ) : (
                     <Link
                        href={item.href}
                        className="w-full text-left"
                        onClick={handleItemClick}
                     >
                        {item.label}
                     </Link>
                  )}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

const Navbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="fixed z-[80] top-0 left-0 w-full bg-background">
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
                        onOpenChange={(isOpen) => setIsDropdownOpen(isOpen)}
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
               <div className="absolute top-[100px] left-0 w-full bg-background md:hidden h-screen overflow-y-auto">
                  <div className="flex flex-col items-center p-4 gap-5 text-2xl">
                     {Object.entries(menuItems).map(([title, items]) => (
                        <Accordion
                           type="single"
                           collapsible
                           className="w-full"
                           key={title}
                        >
                           <AccordionItem value={title}>
                              <AccordionTrigger>{title}</AccordionTrigger>
                              <AccordionContent>
                                 {items.map((item, index) => (
                                    <div
                                       key={index}
                                       className="py-2 flex items-start gap-2"
                                    >
                                       {title === "Products" ? (
                                          <>
                                             <Image
                                                src={item.img!}
                                                alt={item.label}
                                                width={40}
                                                height={40}
                                             />
                                             <div className="flex flex-col">
                                                <Link
                                                   href={item.href}
                                                   onClick={toggleMenu}
                                                >
                                                   <span className="font-bold">
                                                      {item.label}
                                                   </span>
                                                   <span className="text-sm">
                                                      {item.description}
                                                   </span>
                                                </Link>
                                             </div>
                                          </>
                                       ) : (
                                          <Link
                                             href={item.href}
                                             onClick={toggleMenu}
                                          >
                                             {item.label}
                                          </Link>
                                       )}
                                    </div>
                                 ))}
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                     ))}
                     <Link
                        href="/api-docs"
                        className="block py-2"
                        onClick={toggleMenu}
                     >
                        Developer
                     </Link>
                     <div className="flex flex-col gap-3 mt-4">
                        <Link
                           href="/login"
                           onClick={toggleMenu}
                        >
                           <Button
                              variant="outline"
                              className="w-full"
                           >
                              Login
                           </Button>
                        </Link>
                        <Link
                           href="/sign-up"
                           onClick={toggleMenu}
                        >
                           <Button className="w-full">Create Account</Button>
                        </Link>
                     </div>
                  </div>
               </div>
            )}
         </div>
         {isDropdownOpen &&
            createPortal(
               <div className="fixed inset-0 bg-black opacity-50 z-[92]"></div>,
               document.body
            )}
      </div>
   );
};

export default Navbar;
