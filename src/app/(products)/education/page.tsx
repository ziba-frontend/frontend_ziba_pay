import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import rect from "../../../../public/images/rect1.png";
import hospi1 from "../../../../public/images/hospi1.png";
import hospi2 from "../../../../public/images/hospi2.png";
import hospi3 from "../../../../public/images/hospi3.png";
import hospi4 from "../../../../public/images/hospi4.png";
import edu1 from "../../../../public/images/edu1.png";
import edu2 from "../../../../public/images/edu2.png";
import edu3 from "../../../../public/images/edu3.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Education Payment Solutions - Ziba Pay",
   description: "Streamline tuition and fees with Zibapay's education payment solutions.",
};

const Education = () => {
   return (
      <div className="md:pt-20">
         <div className="my-10 container">
            <div className="flex-col flex md:flex-row items-center justify-center gap-6">
               <div className="">
                  <h1 className="my-4">
                     The Payment platform for your Education
                  </h1>
                  <p>
                     Ziba Pay&apos;s education payment solutions streamline the
                     process of collecting tuition and managing fees for
                     educational institutions.
                  </p>{" "}
                  <Button className="w-fit my-6 p-6">
                     {" "}
                     <Link href="/sign-up">Get Started </Link>
                  </Button>
               </div>
               <Image
                  src={edu1}
                  alt="ziba pay"
                  className="md:w-[400px] xl:w-[500px] 2xl:w-[600px]"
               />
            </div>
         </div>

         <div className="bg-br pt-10 md:pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10">
               <div className="flex flex-col items-center justify-center gap-20 md:gap-0 md:flex-row py-6 container">
                  <div className="w-full md:w-1/2">
                     <h2 className="my-2 mb-4">Automated Tuition Collection</h2>
                     <p>
                        Eliminate manual processes and reduce administrative
                        burden by automating tuition collection. Our platform
                        allows educational institutions to set up recurring
                        payment schedules, ensuring timely and hassle-free
                        payments from students and their families.
                     </p>
                  </div>
                  <Image
                     src={edu2}
                     alt="ziba pay"
                     className="w-[400px]"
                  />
               </div>
            </div>
         </div>

         <div className="flex flex-col items-center justify-center gap-20 md:gap-0 md:flex-row py-6 container">
            <Image
               src={edu3}
               alt="ziba pay"
               className="w-[400px]"
            />
            <div className="w-full md:w-1/2">
               <h2 className="my-2 mb-4">Streamlined Fee Management</h2>
               <p>
                  Simplify fee management processes by centralizing fee
                  collection and tracking within a single platform. Ziba Pay
                  enables institutions to efficiently manage various fees, such
                  as registration fees, activity fees, and course fees, with
                  customizable payment options and automated reminders
               </p>
            </div>
         </div>

         <div className="bg-br pt-10 md:pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10">
               <div className=" py-10 container">
                  <div className="w-full md:w-1/2">
                     <h2 className="my-2 mb-4">
                        Enhanced Financial Transparency for Stakeholders
                     </h2>
                     <p>
                        Enhance transparency and accountability by providing
                        stakeholders, including administrators, faculty, and
                        parents, with real-time access to financial data and
                        reports. Ziba Pay&apos;s reporting capabilities offer
                        insights into revenue streams, outstanding balances, and
                        payment trends, facilitating informed decision-making
                        and fostering trust among stakeholders.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Education;
