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
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "../../public/svg/logo.svg";
import hamburger from "../../public/svg/hamburger.png";
import Image from "next/image";
import drop1 from "../../public/images/drop1.png";
import drop2 from "../../public/images/drop2.png";
import { createPortal } from "react-dom";
import close from "../../public/images/close.png";

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
         <DropdownMenuTrigger className="cursor-pointer text-[16px]">
            {title}
         </DropdownMenuTrigger>
         <DropdownMenuContent
            className={`bg-white p-12 relative rounded-[20px] ${
               title === "Products" ? "w-[40rem]" : "w-fit"
            } left-0`}
         >
            <Image
               src={drop1}
               alt="ziba"
               className="absolute top-0 left-0"
               height={`${title === "Products" ? 100 : 60}`}
               width={`${title === "Products" ? 100 : 60}`}
            />
            <Image
               src={drop2}
               alt="ziba"
               className="absolute bottom-0 right-0"
               height={`${title === "Products" ? 100 : 60}`}
               width={`${title === "Products" ? 100 : 60}`}
            />
            {items.map((item, index) => (
               <DropdownMenuItem
                  key={index}
                  className="flex flex-col p-2 justify-start"
               >
                  {title === "Products" ? (
                     <div
                        className="flex items-start gap-0 "
                        onClick={handleItemClick}
                     >
                        <Image
                           src={item.img!}
                           alt={item.label}
                           width={80}
                           height={80}
                        />

                        <div className="flex flex-col">
                           <h4 className=" hover:text-main">
                              <Link href={item.href}>{item.label}</Link>
                           </h4>
                           <span className="text-sm">{item.description}</span>
                        </div>
                     </div>
                  ) : (
                     <Link
                        href={item.href}
                        className="w-full text-left hover:text-main my-1"
                        onClick={handleItemClick}
                     >
                        <h4> {item.label}</h4>
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
      <div className="fixed z-[80] top-0 left-0 w-full bg-background border-b border-black md:border-none">
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
                  <Link
                     href="/api-docs/start/introduction"
                     className="text-[16px]"
                     target="_blank"
                  >
                     Developer
                  </Link>
               </div>
            </div>
            <div className="hidden md:flex gap-3">
               <Link href="/login">
                  <Button
                     className="w-[107px] sm:w-[130px] p-6"
                     variant="outline"
                  >
                     Login
                  </Button>
               </Link>
               <Link
                  href="/sign-up"
                  className="md:hidden lg:block"
               >
                  <Button className="w-[107px] sm:w-[130px] p-6 ">
                     Create Account
                  </Button>
               </Link>
            </div>
            <div className="md:hidden flex items-center">
               <button
                  onClick={toggleMenu}
                  className="text-2xl"
               >
                  {isOpen ? (
                     <Image
                        src={close}
                        alt="close"
                     />
                  ) : (
                     <Image
                        src={hamburger}
                        alt="menu"
                     />
                  )}
               </button>
            </div>
            {isOpen && (
               <div className="absolute top-[100px] left-0 w-full bg-background md:hidden h-screen overflow-y-auto">
                  <div className="flex flex-col items-center p-4 gap-5 text-2xl">
                     {Object.entries(menuItems).map(([title, items]) => (
                        <Accordion
                           type="single"
                           collapsible
                           className="w-full "
                           key={title}
                        >
                           <AccordionItem value={title}>
                              <AccordionTrigger>{title}</AccordionTrigger>
                              <AccordionContent className="bg-[#3BD64A1A] w-full py-4">
                                 {items.map((item, index) => (
                                    <div
                                       key={index}
                                       className="py-2 flex items-start gap-2 "
                                    >
                                       <Link
                                          href={item.href}
                                          onClick={toggleMenu}
                                          className="text-[16px]"
                                       >
                                          {item.label}
                                       </Link>
                                    </div>
                                 ))}
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                     ))}
                     <Link
                        href="/api-docs/start/introduction"
                        className="block py-2"
                        onClick={toggleMenu}
                        target="_blank"
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
