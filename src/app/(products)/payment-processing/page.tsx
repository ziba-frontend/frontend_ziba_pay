import Image from "next/image";
import React from "react";
import paypro1 from "../../../../public/images/processing1.png";
import paypro2 from "../../../../public/images/processing2.png";
import paypro3 from "../../../../public/images/processing3.png";
import paypro4 from "../../../../public/images/processing4.png";
import payp from "../../../../public/svg/payp.svg";
import rect from "../../../../public/images/rect1.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Payment Processing Solutions - Ziba Pay",
   description: "Efficient and secure payment processing solutions with Zibapay.",
};

const PaymentProcessing = () => {
   return (
      <div className="py-4 md:py-10">
         <div className="container flex items-center justify-center flex-col gap-4 py-[50px] md:py-[150px]">
            <h4>
               At Ziba <span className="text-main">Pay</span>
            </h4>
            <h1 className="text-center  md:w-5/6 lg:w-3/4">
               We are dedicated to simplifying payments for businesses in
               Africa.{" "}
            </h1>
            <p className="text-center  mb-6 md:w-5/6">
               Our comprehensive payment processing solutions empower businesses
               of all sizes to streamline operations and drive growth. From
               online transactions to mobile payments and in-person sales.
            </p>
            <Image
               src={paypro1}
               alt="ziba"
            />
            <div className="relative flex items-center justify-center mt-[75px]">
               <h2 className="text-center  md:w-5/6">
                  Let’s Explore how Ziba pay can transform your business
               </h2>
               <Image
                  src={payp}
                  alt="ziba"
                  className="absolute -bottom-12 -z-10"
               />
            </div>
         </div>
         <div className="relative py-20  bg-[#E0E0E0]">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-center pt-20 container ">
               <div className="flex flex-col gap-4">
                  <h2>Online Payment Processing</h2>
                  <p>
                     Ziba pay’s online payment processing solutions empowers
                     businesses to accept payments securely through their
                     website or online store. whether you’re selling products,
                     services, or digital goods, our platform provides a
                     seamless checkout experience for your customers.
                  </p>
               </div>
               <Image
                  src={paypro2}
                  alt="ziba"
               />
            </div>
         </div>
         <div className="">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center pt-20 container ">
               <div className="flex flex-col gap-4">
                  <h2>Mobile Payment Solutions</h2>
                  <p>
                     Ziba Pay&apos;s mobile payment solutions enable businesses
                     to easily accept payments on-the-go using a mobile device
                     or smartphone. Whether you&apos;re at a trade show, a
                     pop-up event, or making deliveries, our mobile app provides
                     a convenient way to process transactions anytime, anywhere.
                  </p>
               </div>
               <Image
                  src={paypro3}
                  alt="ziba"
               />
            </div>
         </div>

         <div className="relative py-20  bg-[#E0E0E0]">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-center py-20 container ">
               <div className="flex flex-col gap-4">
                  <h2>Point-of-Sale (POS) Systems</h2>
                  <p>
                     Ziba Pay&apos;s point-of-sale (POS) systems are designed to
                     streamline in-person transactions with integrated POS
                     solutions. Whether you operate a retail store, a
                     restaurant, or a salon, our POS systems provide a
                     comprehensive solution to manage sales, inventory, and
                     customer interactions efficiently.
                  </p>
               </div>
               <Image
                  src={paypro4}
                  alt="ziba"
                  className="md:-ml-10 lg:-ml-40 lg:-mb-[140px]"
               />
            </div>
         </div>
         <div className="">
            <div className="container flex flex-col gap-8  justify-center min-h-[40vh]">
               <h1 className="md:w-5/6 lg:w-3/4">
                  Get started with Ziba Pay&apos;s online payment processing{" "}
                  solution today!
               </h1>{" "}
               <Button className="w-[107px] sm:w-[130px] p-6">
                  <Link href="/sign-up">Create Account</Link>
               </Button>
            </div>
         </div>
      </div>
   );
};

export default PaymentProcessing;
