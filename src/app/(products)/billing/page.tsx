import Image from "next/image";
import React from "react";
import rect from "../../../../public/images/rect1.png";
import billing1 from "../../../../public/images/billing1.png";
import billing2 from "../../../../public/images/billing2.png";
import billing3 from "../../../../public/images/billing3.png";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Invoicing And Billing",
   description: "Streamline invoicing and billing with Zibapay's automated solutions.",
};

const Billing = () => {
   return (
      <div className="md:py-20">
         <div className="container my-16 ">
            <p className="text-center">
               At Ziba <span className="text-main">pay</span>{" "}
            </p>
            <h1 className="my-4  text-center md:text-start md:w-5/6">
               We understand the importance of efficient invoicing and billing
               for businesses.
            </h1>
            <p className="text-center md:text-start md:w-5/6">
               Our Invoicing and Billing Services are designed to streamline
               your financial processes, saving you time and effort. Explore our
               comprehensive solutions below.
            </p>
         </div>

         <div className="bg-br relative md:pt-20">
            <Image
               src={rect}
               alt="ziba"
               className="absolute left-0 top-0 w-full"
            />
            <div className="container py-20 flex items-left justify-center flex-col gap-6">
               <div className="mt-10 flex flex-col gap-4 w-full md:w-5/6 pt-8">
                  <h2>Automated Invoicing</h2>
                  <p>
                     Say goodbye to manual invoicing with Ziba Pay&apos;s
                     automated invoicing feature. Generate and send invoices to
                     your clients automatically, reducing the need for
                     repetitive tasks and minimizing human error. With automated
                     invoicing, you can focus on growing your business while we
                     handle the paperwork.
                  </p>
               </div>
               <Image
                  src={billing1}
                  alt="ziba billing"
                  width={500}
                  className="md:my-6"
               />
            </div>
         </div>

         <div className="container py-10 md:py-20 flex items-left justify-center flex-col gap-6">
            <div className="mt-10 flex flex-col gap-4 w-full md:w-5/6">
               <h2>Recurring Billing</h2>
               <p>
                  Simplify subscription-based services or memberships with Ziba
                  Pay&apos;s recurring billing feature. Set up recurring payment
                  schedules for your clients, ensuring timely payments without
                  the hassle of manual reminders. Whether it&apos;s monthly,
                  quarterly, or annually, our recurring billing solution has you
                  covered.
               </p>
            </div>
            <Image
               src={billing2}
               alt="ziba billing"
               width={500}
               className="md:my-6"
            />
         </div>

         <div className="bg-br relative pt-20">
            <Image
               src={rect}
               alt="ziba"
               className="absolute left-0 top-0 w-full"
            />
            <div className="container py-10 md:py-20 flex items-left justify-center flex-col gap-6">
               <div className="mt-10 flex flex-col gap-4 w-full md:w-5/6 pt-8">
                  <h2>
                     Customizable Invoice Templates
                  </h2>
                  <p>
                     Make a lasting impression on your clients with personalized
                     invoices using Ziba Pay&apos;s customizable templates.
                     Tailor your invoices to reflect your branding and business
                     information, adding a professional touch to every
                     transaction. With customizable invoice templates, you can
                     showcase your brand identity while delivering a seamless
                     billing experience.
                  </p>
               </div>
               <Image
                  src={billing3}
                  alt="ziba billing"
                  width={500}
                  className="md:my-6"
               />
            </div>
         </div>
      </div>
   );
};

export default Billing;
