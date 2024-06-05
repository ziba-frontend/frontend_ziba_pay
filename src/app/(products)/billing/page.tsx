import Image from "next/image";
import React from "react";
import rect from "../../../../public/images/rect1.png";
import billing1 from "../../../../public/images/billing1.png";

const Billing = () => {
   return (
      <div className='py-20'>
         <div className='container my-10'>
            <p className='text-center'>
               At Ziba <span className='text-main'>pay</span>{" "}
            </p>
            <h1 className='my-4'>
               We understand the importance of efficient invoicing and billing
               for businesses.
            </h1>
            <p>
               Our Invoicing and Billing Services are designed to streamline
               your financial processes, saving you time and effort. Explore our
               comprehensive solutions below.
            </p>
         </div>

         <div className='bg-br relative pt-20'>
            <Image
               src={rect}
               alt='ziba'
               className='absolute left-0 top-0 w-full'
            />
            <div className='container py-20 flex items-left justify-center flex-col gap-6'>
               <div className='mt-10 flex flex-col gap-4 w-full md:w-5/6'>
                  <h2>Automated Invoicing</h2>
                  <p>
                     Say goodbye to manual invoicing with Ziba Pay's automated
                     invoicing feature. Generate and send invoices to your
                     clients automatically, reducing the need for repetitive
                     tasks and minimizing human error. With automated invoicing,
                     you can focus on growing your business while we handle the
                     paperwork.
                  </p>
               </div>
               <Image
                  src={billing1}
                  alt='ziba billing'
               />
            </div>
         </div>

         <div className='container py-20 flex items-left justify-center flex-col gap-6'>
            <div className='mt-10 flex flex-col gap-4 w-full md:w-5/6'>
               <h2>Recurring Billing</h2>
               <p>
                  Simplify subscription-based services or memberships with Ziba
                  Pay's recurring billing feature. Set up recurring payment
                  schedules for your clients, ensuring timely payments without
                  the hassle of manual reminders. Whether it's monthly,
                  quarterly, or annually, our recurring billing solution has you
                  covered.
               </p>
            </div>
            <Image
               src={billing1}
               alt='ziba billing'
            />
         </div>

         <div className='bg-br relative pt-20'>
            <Image
               src={rect}
               alt='ziba'
               className='absolute left-0 top-0 w-full'
            />
            <div className='container py-20 flex items-left justify-center flex-col gap-6'>
               <div className='mt-10 flex flex-col gap-4 w-full md:w-5/6'>
                  <h2>Customizable Invoice Templates</h2>
                  <p>
                     Make a lasting impression on your clients with personalized
                     invoices using Ziba Pay's customizable templates. Tailor
                     your invoices to reflect your branding and business
                     information, adding a professional touch to every
                     transaction. With customizable invoice templates, you can
                     showcase your brand identity while delivering a seamless
                     billing experience.
                  </p>
               </div>
               <Image
                  src={billing1}
                  alt='ziba billing'
               />
            </div>
         </div>
      </div>
   );
};

export default Billing;
