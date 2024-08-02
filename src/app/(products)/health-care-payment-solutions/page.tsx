import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import rect from "../../../../public/images/rect1.png";
import health1 from "../../../../public/images/health1.png";
import health2 from "../../../../public/images/health2.png";
import health3 from "../../../../public/images/health3.png";
import health4 from "../../../../public/images/health4.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Health Care Payment Solutions - Ziba Pay",
   description: "Secure and efficient payment solutions tailored for healthcare providers.",
};

const Healthcare = () => {
   return (
      <div className="md:pt-20">
         <div className="my-10 container">
            <div className="flex-col flex md:flex-row items-center justify-center gap-6">
               <div className="">
                  <h1 className="my-4">The Payment Platform for Health-Care</h1>
                  <p>
                     Ziba Pay streamlines healthcare payments, ensuring
                     compliance and enhancing efficiency for providers,
                     resulting in improved patient satisfaction.
                  </p>
                  
                     <Button className="w-fit my-6 p-6"><Link href="/sign-up">Get Started</Link></Button>
                  
               </div>
               <Image
                  src={health1}
                  alt="ziba pay"
                  width={620}
                  className="md:w-[400px] xl:w-[600px] 2xl:w-[638px]"
               />
            </div>
         </div>

         <div className="bg-br pt-20 md:pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="md:mt-10">
               <div className="flex flex-col items-center justify-center gap-10 md:flex-row py-6 container">
                  <div className="w-full md:w-1/2">
                     <h2 className="my-2">HIPAA-Compliant Payment Processing</h2>
                     <p>
                     Safeguard patient privacy and confidentiality with HIPAA-compliant payment processing. Our platform adheres to the highest security standards, protecting sensitive healthcare data and maintaining compliance with regulatory requirements.
                     </p>
                  </div>
                  <Image
                     src={health2}
                     alt="ziba pay"
                     className="w-[400px]"
                  />
               </div>
            </div>
         </div>

         <div className="flex flex-col items-center justify-center gap-20 md:flex-row py-10 container">
            <Image
               src={health3}
               alt="ziba pay"
               className="w-[400px]"
            />
            <div className="w-full md:w-1/2">
               <h2 className="my-2 mb-4">
                  Faster Reimbursements and Revenue Cycles
               </h2>
               <p>
                  Expedite reimbursements and optimize revenue cycles with Ziba
                  Pay&apos;s efficient payment processing capabilities. By
                  automating billing and payment workflows, healthcare providers
                  can minimize delays, reduce administrative overhead, and
                  accelerate cash flow.
               </p>
            </div>
         </div>

         <div className="bg-br pt-10 md:pt-40 relative mt-10 pb-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10">
               <div className="flex flex-col items-center justify-center gap-20 md:flex-row py-6 container">
                  <div className="w-full md:w-1/2">
                     <h2 className="my-2">Enhanced Patient Satisfaction</h2>
                     <p>
                        Improve patient satisfaction by offering flexible
                        payment options and transparent billing practices. With
                        Ziba Pay, patients can easily understand their financial
                        obligations, choose convenient payment methods, and
                        experience seamless transactions, resulting in a
                        positive healthcare journey.
                     </p>
                  </div>
                  <Image
                     src={health4}
                     alt="ziba pay"
                     className="w-[400px]"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Healthcare;
