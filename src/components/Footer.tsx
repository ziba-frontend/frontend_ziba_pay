import React from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { url } from "inspector";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/svg/logo.svg";
import zp from "../../public/svg/zp.svg";

const Footer = () => {
   const Links = [
      {
         title: "Products",
         links: [
            {
               name: "Payment processing solutions",
               link: "/payment-processing",
            },
            {
               name: "Invoicing and billing services",
               link: "/billing",
            },
            {
               name: "Financial management tools",
               link: "/financial-management-tools",
            },
            {
               name: "Custom solutions",
               link: "/custom-solution-for-business",
            },
         ],
      },
      {
         title: "Company",
         links: [
            {
               name: "About Us",
               link: "/about",
            },
            {
               name: "Blogs",
               link: "/blogs",
            },
            {
               name: "Partnership",
               link: "/partnership",
            },
            {
               name: "Careers",
               link: "/careers",
            },
         ],
      },
      {
         title: "Developers",
         links: [],
      },
      {
         title: "Support",
         links: [
            {
               name: "Help Center",
               link: "/help-center",
            },
            {
               name: "Contact",
               link: "/contact",
            },
            {
               name: "FAQs",
               link: "/help-center/ziba-pay-security",
            },
         ],
      },
   ];
   return (
      <div
         className="bg-center  bg-cover mt-40 h-auto bg-black/20"
         style={{
            backgroundImage: "url('/images/footer.png')",
         }}
      >
         <div className="  h-full py-20">
            <div className="flex flex-col gap-4 p-[52px] w-5/6 bg-white/80 mx-auto rounded-md my-2 relative items-center md:items-start">
               <h3 className="py-6  text-[32px]">Ready to get started ?</h3>
               <p className="text-xl text-center md:text-start md:w-5/6">
                  Create an account instantly and start accepting payments.Feel
                  free to reach out to us for tailored solutions designed
                  specifically for your business needs.
               </p>
               <div className="flex gap-6 py-6 flex-col items-center md:flex-row md:items-start  w-full">
                  <Button
                     variant="outline"
                     className="w-[60%] md:w-[130px] p-6"
                  >
                     <Link href="/login">Login</Link>
                  </Button>

                  <Button className="w-[60%] md:w-[130px] p-6">
                     <Link href="/sign-up">Create Account </Link>
                  </Button>
               </div>
               <Image
                  src={zp}
                  alt="zp"
                  className="absolute  w-[50px] md:w-[78px] top-2 right-2 md:top-16 md:right-16 "
               />
            </div>
            <div className="container mx-auto px-4 border-b border-black py-6 flex  items-start ">
               <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center items-start mt-4">
                  <div className="flex flex-col justify-between  h-full">
                     <div>
                        <Image
                           src={logo}
                           alt="zibaPay"
                        />
                        <p>
                           <span className="text-[#3BD64A]">
                              Simplifying payments
                           </span>{" "}
                           for Businesses in Africa
                        </p>
                     </div>
                     <div className="flex gap-2">
                        <Link href="">
                           <FaFacebook />
                        </Link>
                        <Link href="">
                           <FaInstagram />
                        </Link>
                        <Link href="">
                           <FaGithub />
                        </Link>
                     </div>
                  </div>
                  {Links.map((link, index) => (
                     <div key={index}>
                        <h3 className="text-xl font-medium mb-4">
                           {link.title}
                        </h3>
                        <ul className="text-sm space-y-3">
                           {link.links.map((text, subIndex) => (
                              <li key={subIndex}>
                                 <Link
                                    href={text.link}
                                    className="hover:underline"
                                 >
                                    {text.name}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>
            <p className="text-center my-3 mt-6 ">
               &copy;<span className="mx-2">Copyright 2024</span>All rights
               reserved by Ziba Pay
            </p>
         </div>
      </div>
   );
};

export default Footer;
