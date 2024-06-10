import React from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { url } from "inspector";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/svg/logo.svg";

const Footer = () => {
   const Links = [
      {
         title: "Products",
         links: [
            {
               name: "Payment processing solutions",
               link: "/",
            },
            {
               name: "Invoicing and billing services",
               link: "/about",
            },
            {
               name: "Financial management tools",
               link: "/posts",
            },
            {
               name: "Custom solutions",
               link: "/posts",
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
               link: "/help",
            },
            {
               name: "Contact",
               link: "/contact",
            },
            {
               name: "FAQs",
               link: "/contact",
            },
         ],
      },
   ];
   return (
      <div
         className="bg-center  bg-cover mt-40"
         style={{
            backgroundImage: "url('/images/footerImg.png')",
         }}
      >
         <div className="bg-white/50 py-6">
            <div className="flex flex-col gap-4 p-6 w-5/6 bg-white/80 mx-auto rounded-md my-2 ">
               <h3 className="py-2 prose">Ready to get started ?</h3>
               <p>
                  Create an account instantly and start accepting payments.Feel
                  free to reach out to us for tailored solutions designed
                  specifically for your business needs.
               </p>
               <div className="flex gap-2 py-2">
                  <Link href="/login">
                     <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/sign-up">
                     <Button>Create Account</Button>
                  </Link>
               </div>
            </div>
            <div className="container mx-auto px-4 border-b py-6 flex justify-center items-center">
               <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center items-center">
                  <div className="flex flex-col justify-between">
                     <div>
                        <Image
                           src={logo}
                           alt="zibaPay"
                        />
                        <p>Simplifying payments for Businesses in Africa</p>
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
            <p className="text-center my-3">
               &copy;<span className="mx-2">Copyright 2024</span>All rights
               reserved by Ziba Pay
            </p>
         </div>
      </div>
   );
};

export default Footer;
