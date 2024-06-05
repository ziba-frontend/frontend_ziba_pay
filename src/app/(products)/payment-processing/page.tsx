import Image from "next/image";
import React from "react";
import paypro1 from "../../../../public/images/processing1.png";
import paypro2 from "../../../../public/images/processing2.png";
import paypro3 from "../../../../public/images/processing3.png";
import paypro4 from "../../../../public/images/processing4.png";
import rect from "../../../../public/images/rect1.png";
import { Button } from "@/components/ui/button";

const PaymentProcessing = () => {
   return (
      <div className='py-10'>
         <div className='container flex items-center justify-center flex-col gap-4 pt-6'>
            <h4>
               At Ziba <span className='text-main'>Pay</span>
            </h4>
            <h1 className='text-center'>
               We are dedicated to simplifying payments for <br />
               businesses in Africa.{" "}
            </h1>
            <p className='text-center'>
               Our comprehensive payment processing solutions empower businesses
               of all sizes to streamline operations and drive
               <br /> growth. From online transactions to mobile payments and
               in-person sales.
            </p>
            <Image
               src={paypro1}
               alt='ziba'
            />
            <h2 className='text-center'>
               Let’s Explore how Ziba pay can transform <br /> your business
            </h2>
         </div>
         <div className='relative py-10 my-10'>
            <Image
               src={rect}
               alt='ziba pay'
               className='absolute left-0 top-0 w-full'
            />
            <div className='flex flex-col md:flex-row gap-6 items-center justify-center pt-20 container'>
               <div className='flex flex-col gap-4'>
                  <h2>
                     Let’s Explore how Ziba pay can transform your business
                  </h2>
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
                  alt='ziba'
               />
            </div>
         </div>
         <div className='bg-white'>
            <div className='flex flex-col md:flex-row gap-6 items-center justify-center pt-20 container '>
               <div className='flex flex-col gap-4'>
                  <h2>Mobile Payment Solutions</h2>
                  <p>
                     Ziba Pay's mobile payment solutions enable businesses to
                     easily accept payments on-the-go using a mobile device or
                     smartphone. Whether you're at a trade show, a pop-up event,
                     or making deliveries, our mobile app provides a convenient
                     way to process transactions anytime, anywhere.
                  </p>
               </div>
               <Image
                  src={paypro3}
                  alt='ziba'
               />
            </div>
         </div>

         <div className='relative py-10 my-10'>
            <Image
               src={rect}
               alt='ziba pay'
               className='absolute left-0 top-0 w-full'
            />
            <div className='flex flex-col md:flex-row gap-6 items-center justify-center pt-20 container'>
               <div className='flex flex-col gap-4'>
                  <h2>Point-of-Sale (POS) Systems</h2>
                  <p>
                     Ziba Pay's point-of-sale (POS) systems are designed to
                     streamline in-person transactions with integrated POS
                     solutions. Whether you operate a retail store, a
                     restaurant, or a salon, our POS systems provide a
                     comprehensive solution to manage sales, inventory, and
                     customer interactions efficiently.
                  </p>
               </div>
               <Image
                  src={paypro4}
                  alt='ziba'
               />
            </div>
         </div>

         <div className='container flex flex-col gap-4  justify-center min-h-[40vh]'>
            <h2>
               Get started with Ziba Pay's online payment processing <br />{" "}
               solution today!
            </h2>
            <Button className='w-fit'>Create Account</Button>
         </div>
      </div>
   );
};

export default PaymentProcessing;
