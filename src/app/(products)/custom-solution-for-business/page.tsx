import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import sol1 from "../../../../public/images/sol1.png";
import sol2 from "../../../../public/images/sol2.png";
import sol3 from "../../../../public/images/sol3.png";
import sol4 from "../../../../public/images/sol4.png";
import sol5 from "../../../../public/images/sol5.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Custom Solution For Businesses - Ziba Pay",
   description: "Tailored payment solutions designed specifically for your business needs.",
};

const Solution = () => {
   return (
      <div className="py-10 md:py-20 container">
         <div className="flex-col flex md:flex-row items-center md:items-start justify-center gap-6">
            <div className="w-full md:w-1/2 mt-6">
               <h1 className="my-4 ">
                  Tailored solutions designed to meet the unique needs of your
                  industry or business, whether you&apos;re in e-commerce,
                  healthcare, hospitality, or education.
               </h1>
               <p>
                  Ziba Pay offers customizable payment solutions to address the
                  specific challenges and requirements of your industry.
               </p>
            </div>
            <Image
               src={sol1}
               alt="ziba pay"
               width={500}
               className="md:w-[300px] xl:w-[500px] "
            />
         </div>

         <div className="flex my-10 flex-col gap-6 md:flex-row">
            <div className="flex flex-col gap-4">
               <h2>E-commerce Solutions</h2>
               <p>
                  Unlock the full potential of your online store with Ziba
                  Pay&apos;s e-commerce solutions. Seamlessly integrate payment
                  processing, manage transactions, and enhance the checkout
                  experience for your customers.
               </p>

               <Button className="w-[107px] sm:w-[130px] p-6 mb-4">
                  <Link href="ecommerce-solutions">Learn More</Link>
               </Button>

               <Image
                  src={sol2}
                  alt="ziba"
               />
            </div>
            <div className="flex flex-col gap-4 md:mt-[200px]">
               <h2>Healthcare Payment Solutions</h2>
               <p>
                  Simplify medical billing and streamline payment processes with
                  Ziba Pay&apos;s healthcare payment solutions. Ensure
                  compliance, improve patient satisfaction, and accelerate
                  revenue cycles with our secure and efficient payment platform
               </p>
               <Button className="w-[107px] sm:w-[130px] p-6 mb-4">
                  <Link href="/health-care-payment-solutions">Learn More</Link>
               </Button>
               <Image
                  src={sol3}
                  alt="ziba"
               />
            </div>
         </div>

         <div className="flex my-20 flex-col gap-6 md:flex-row ">
            <div className="flex flex-col gap-4">
               <h2>Hospitality Payment Solutions</h2>
               <p>
                  Enhance guest experiences and optimize revenue streams with
                  Ziba Pay&apos;s hospitality payment solutions. From mobile
                  check-in to integrated POS systems, we provide the tools you
                  need to streamline operations and deliver exceptional service.
               </p>
               <Button className="w-[107px] sm:w-[130px] p-6 mb-4">
                  <Link href="/hospitality">Learn More</Link>
               </Button>
               <Image
                  src={sol4}
                  alt="ziba"
               />
            </div>
            <div className="flex flex-col gap-4 md:mt-[200px]">
               <h2>Education Payment Solutions</h2>
               <p>
                  Transform tuition collection and student billing with Ziba
                  Pay&apos;s education payment solutions. Simplify fee
                  management, automate recurring payments, and improve financial
                  transparency for educational institutions of all sizes.
               </p>
               <Button className="w-[107px] sm:w-[130px] p-6 mb-4">
                  <Link href="/education">Learn More</Link>
               </Button>
               <Image
                  src={sol5}
                  alt="ziba"
               />
            </div>
         </div>
      </div>
   );
};

export default Solution;
