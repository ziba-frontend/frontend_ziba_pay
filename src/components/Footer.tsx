import React from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
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
          link: "/financial-management-tool",
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
      links: [
        {
          name: "Api-docs",
          link: "/api-docs/start/introduction",
        },
      ],
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
    <div className="bg-center bg-cover mt-20 bg-[#27AE602d]">
      <div className="h-full ">
        <div className="container mx-auto px-4 border-b border-black py-6 flex items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center items-start mt-4">
            <div className="flex flex-col justify-between h-full">
              <div>
                <Image src={logo} alt="zibaPay" />
                <p>
                  <span className="text-[#3BD64A]">Simplifying payments</span>{" "}
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
                <h3 className="font-medium mb-4">{link.title}</h3>
                <ul className="space-y-3">
                  {link.links.map((text, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={text.link}
                        target={text.name === "Api-docs" ? "_blank" : undefined}
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
        <p className="text-center py-4 text-sm font-bold">
          &copy;<span className="mx-2">Copyright 2024</span>All rights reserved
          by Ziba Pay
        </p>
      </div>
    </div>
  );
};

export default Footer;
