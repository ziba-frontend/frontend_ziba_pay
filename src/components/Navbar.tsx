"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { getUserProfile } from "@/lib/api-calls/auth-server";

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
      setIsDropdownOpen(false);
      onOpenChange(false); // Notify parent to close
   };

   return (
      <DropdownMenu
         open={isDropdownOpen}
         onOpenChange={(isOpen) => {
            setIsDropdownOpen(isOpen);
            onOpenChange(isOpen);
         }}
      >
         <DropdownMenuTrigger
            className="cursor-pointer text-[16px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
         >
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
                     <div className="flex items-start gap-0 ">
                        <Image
                           src={item.img!}
                           alt={item.label}
                           width={80}
                           height={80}
                        />
                        <div className="flex flex-col">
                           <h4 className=" hover:text-main">
                              <Link
                                 href={item.href}
                                 onClick={handleItemClick}
                              >
                                 {item.label}
                              </Link>
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
                        <h4>{item.label}</h4>
                     </Link>
                  )}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

interface User {
   name: string | null;
   email: string | null;
   businessType: string | null;
   password: string | null;
}
const Navbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const userProfile = await getUserProfile();
            setUser(userProfile);
         } catch (error) {
            setUser(null);
         } finally {
            setLoading(false);
         }
      };
      fetchUserProfile();
   }, []);

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
            <div className="hidden md:flex gap-6">
               {loading ? null : user ? (
                  <Link href="/dashboard">
                     <Button className="w-[107px] sm:w-[130px] p-6">
                        Dashboard
                     </Button>
                  </Link>
               ) : (
                  <>
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
                        <Button className="w-[107px] sm:w-[130px] p-6">
                           Create Account
                        </Button>
                     </Link>
                  </>
               )}
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
                        width={40}
                     />
                  ) : (
                     <Image
                        src={hamburger}
                        alt="menu"
                        width={40}
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
                              <AccordionContent className="bg-[#3D3939] text-[16px]">
                                 {items.map((item, index) => (
                                    <Link
                                       key={index}
                                       href={item.href}
                                       className="flex items-center gap-2 p-2 hover:text-main"
                                       onClick={toggleMenu}
                                    >
                                       {item.img && (
                                          <Image
                                             src={item.img}
                                             alt={item.label}
                                             width={40}
                                             height={40}
                                          />
                                       )}
                                       <span>{item.label}</span>
                                    </Link>
                                 ))}
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                     ))}
                     <Link
                        href="/api-docs/start/introduction"
                        target="_blank"
                        className="hover:text-main"
                        onClick={toggleMenu}
                     >
                        Developer
                     </Link>
                     {loading ? null : user ? (
                        <Link
                           href="/dashboard"
                           className="text-[16px] p-6 w-full text-center border border-primary text-primary rounded"
                        >
                           Dashboard
                        </Link>
                     ) : (
                        <>
                           <Link
                              href="/login"
                              className="text-[16px] p-6 w-full text-center border border-primary text-primary rounded"
                              onClick={toggleMenu}
                           >
                              Login
                           </Link>
                           <Link
                              href="/sign-up"
                              className="text-[16px] p-6 w-full text-center border border-primary text-primary rounded"
                              onClick={toggleMenu}
                           >
                              Create Account
                           </Link>
                        </>
                     )}
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
