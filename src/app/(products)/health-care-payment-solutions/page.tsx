import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import rect from "../../../../public/images/rect1.png";
import health1 from "../../../../public/images/health1.png";
import health2 from "../../../../public/images/health2.png";
import health3 from "../../../../public/images/health3.png";
import health4 from "../../../../public/images/health4.png";

const Healthcare = () => {
   return (
      <div>
         <div className='my-10 container'>
            <div className='flex-col flex md:flex-row items-center justify-center gap-6'>
               <div className=''>
                  <h1 className='my-4'>The Payment Platform for Health-Care</h1>
                  <p>
                     Ziba Pay streamlines healthcare payments, ensuring
                     compliance and enhancing efficiency for providers,
                     resulting in improved patient satisfaction.
                  </p>
                  <Button className='w-fit my-6'>Get Started</Button>
               </div>
               <Image
                  src={health1}
                  alt='ziba pay'
               />
            </div>
         </div>

         <div className='bg-br pt-40 relative mt-10'>
            <Image
               src={rect}
               alt='ziba pay'
               className='absolute left-0 top-0 w-full'
            />
            <div className='mt-10'>
               <div className='flex flex-col items-center justify-center gap-20 md:flex-row py-6 container'>
                  <div className='w-full md:w-1/2'>
                     <h3 className='my-2'>Reporting and Analytics</h3>
                     <p>
                        Gain valuable insights into your financial performance
                        with Ziba Pay's robust reporting and analytics
                        capabilities. Generate detailed reports, visualize data
                        trends, and make data-driven decisions to drive business
                        growth.
                     </p>
                  </div>
                  <Image
                     src={health2}
                     alt='ziba pay'
                     className='w-[400px]'
                  />
               </div>
            </div>
         </div>

         <div className='flex flex-col items-center justify-center gap-20 md:flex-row py-6 container'>
            <Image
               src={health3}
               alt='ziba pay'
               className='w-[400px]'
            />
            <div className='w-full md:w-1/2'>
               <h3 className='my-2'>
                  Faster Reimbursements and Revenue Cycles
               </h3>
               <p>
                  Expedite reimbursements and optimize revenue cycles with Ziba
                  Pay's efficient payment processing capabilities. By automating
                  billing and payment workflows, healthcare providers can
                  minimize delays, reduce administrative overhead, and
                  accelerate cash flow.
               </p>
            </div>
         </div>

         <div className='bg-br pt-40 relative mt-10'>
            <Image
               src={rect}
               alt='ziba pay'
               className='absolute left-0 top-0 w-full'
            />
            <div className='mt-10'>
               <div className='flex flex-col items-center justify-center gap-20 md:flex-row py-6 container'>
                  <div className='w-full md:w-1/2'>
                     <h3 className='my-2'>Enhanced Patient Satisfaction</h3>
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
                     alt='ziba pay'
                     className='w-[400px]'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Healthcare;
