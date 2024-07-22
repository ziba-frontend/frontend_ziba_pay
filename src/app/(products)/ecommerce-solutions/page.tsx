import { Button } from "@/components/ui/button";
import React from "react";
import comm1 from "../../../../public/images/comm1.png";
import Image from "next/image";
import comm2 from "../../../../public/images/comm2.png";
import comm3 from "../../../../public/images/comm3.png";
import comm4 from "../../../../public/images/comm4.png";
import comm5 from "../../../../public/images/comm5.png";
import comm6 from "../../../../public/images/comm6.png";
import Link from "next/link";

const Ecommerce = () => {
   return (
      <div className="pt-20">
         <div className="my-10 container">
            <div className="flex-col flex md:flex-row items-center justify-center gap-6">
               <div className="">
                  <h1 className="my-4">
                     Simplifying Payments for Online Businesses
                  </h1>
                  <p>
                     Your e-commerce platform can accept payments online from
                     customers anywhere in the world in several currencies.
                  </p>
                  <Link href="/sign-up">
                     {" "}
                     <Button className="w-fit my-6">Get Started</Button>
                  </Link>
               </div>
               <Image
                  src={comm1}
                  alt="ziba pay"
                  width={500}
                  className="md:w-[400px] xl:w-[600px]"
               />
            </div>
         </div>
         <div className="flex items-center justify-center  container">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto py-20 gap-6  items-center justify-center ">
               <div className="flex flex-col gap-4  bg-white rounded-[15px] p-4 lg:w-[384px] md:h-[598px] h-[459px]">
                  <p className="text-center">
                     Easily accept payments from your customers using a variety
                     of methods, including virtual accounts, payment links,
                     checkout, and direct charge via API.
                  </p>
                  <Image
                     src={comm2}
                     alt="ziba e-commerce"
                     className="transform ml-[50%] -translate-x-1/2"
                     width={223}
                     height={223}
                  />
               </div>
               <div className="flex flex-col gap-4  bg-[#d3eafaa5] rounded-[15px] p-4 lg:w-[384px] h-[459px] md:h-[598px]">
                  <p className="text-center">
                     {" "}
                     E-commerce platform offers virtual account issuance in four
                     currencies, allowing customers to make payments
                     conveniently via bank transfers.
                  </p>
                  <Image
                     src={comm3}
                     alt="ziba e-commerce"
                     className="transform ml-[50%] -translate-x-1/2"
                  />
               </div>
               <div className="flex flex-col gap-4  bg-[#c4c3c3] rounded-[15px] p-4 lg:w-[384px] h-[459px] md:h-[598px]">
                  <p className="text-center">
                     Ziba pay checkout enables customers to finalize purchases
                     effortlessly, making payments seamlessly through bank
                     transfers, card transactions, or a single API integration
                     directly into your platform
                  </p>
                  <Image
                     src={comm4}
                     alt="ziba e-commerce"
                     className="transform ml-[50%] -translate-x-1/2"
                  />
               </div>
            </div>
         </div>

         <div className="flex flex-col md:flex-row py-20 gap-6 items-center justify-center container">
            <Image
               src={comm5}
               alt="ziba"
            />
            <p>
               Ziba pay checkout simplifies the purchasing process, allowing
               your customers to easily complete transactions and make payments
               via bank transfers, card payments, or a single API integration
               seamlessly integrated into your platform.
            </p>
         </div>
         <div className="bg-br">
            <div className="flex flex-col md:flex-row py-20 gap-6 items-center justify-center container">
               <div className="">
                  <h2 className="my-4">Streamlined Merchant Payments</h2>
                  <p>
                     Effortlessly settle merchants on your online marketplace
                     with Ziba pay Pay-Out solutions for efficient
                     disbursements.
                  </p>
               </div>

               <Image
                  src={comm6}
                  alt="ziba"
                  width={580}
                  className="lg:w-[600px]"
               />
            </div>
         </div>

         <div className="py-40 container">
            <h2 className="my-4">
               Improve customer experience and retention with easy payments and
               quick conversions using Ziba pay Pay-In solutions.
            </h2>
            <Button>
               <Link href="/checkout">Go To Checkout</Link>
            </Button>
         </div>
      </div>
   );
};

export default Ecommerce;
