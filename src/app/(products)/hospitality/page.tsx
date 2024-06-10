import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import rect from "../../../../public/images/rect1.png";
import hospi1 from "../../../../public/images/hospi1.png";
import hospi2 from "../../../../public/images/hospi2.png";
import hospi3 from "../../../../public/images/hospi3.png";
import hospi4 from "../../../../public/images/hospi4.png";

const Healthcare = () => {
   return (
      <div>
         <div className="my-10 container">
            <div className="flex-col flex md:flex-row items-center justify-center gap-6">
               <div className="">
                  <h1 className="my-4">
                     The Payment platform for Travel and Hotels
                  </h1>
                  <p>
                     Ziba pay provides easy online payment solutions for travel
                     and hospitality businesses, covering everything from
                     booking flights and hotels to dining, spa visits, and
                     check-out.
                  </p>
                  <Button className="w-fit my-6">Get Started</Button>
               </div>
               <Image
                  src={hospi1}
                  alt="ziba pay"
                  width={500}
                  
               />
            </div>
         </div>

         <div className="flex items-center justify-center gap-20 md:flex-row py-6 container flex-col-reverse">
            <Image
               src={hospi2}
               alt="ziba pay"
               className="w-[400px]"
            />
            <div className="w-full md:w-1/2">
               <h3 className="my-2">Welcome Guests Worldwide</h3>
               <p>
                  Welcome guests from around the globe and accept payments in
                  both local and international currencies. Seamlessly integrate
                  payments with your online booking systems.
               </p>
            </div>
         </div>

         <div className="bg-br pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10 py-20">
               <div className=" py-6 container">
                  <div className="w-full md:w-1/2">
                     <h3 className="my-2">
                        Enhance Passenger Payment Experience
                     </h3>
                     <p>
                        Ziba pay ensures a smooth payment journey for passengers
                        with flexible options. Our Pay-In solutions offer
                        various online payment methods like Virtual Accounts,
                        Payment Links, and Checkout to optimize the experience.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className=" py-10  mt-10">
            <div className="mt-10">
               <div className="flex flex-col items-center  justify-center gap-20 md:flex-row py-6 container">
                  <Image
                     src={hospi3}
                     alt="ziba"
                     className="sm:w-[300px] lg:w-[400px]"
                  />
                  <div className="">
                     <h3 className="my-2">
                        For a Smooth In-Person Payment Experience
                     </h3>
                     <p>
                        We strategically position Ziba pay POS Terminals to make
                        paying in person a breeze. Whether you&apos;re at
                        reception, the spa, restaurant, bar, or elsewhere,
                        making payments is quick and easy.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-br pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10">
               <div className="flex flex-col items-center justify-center gap-20 md:flex-row py-6 container">
                  <div className="w-full md:w-1/2">
                     <h3 className="my-2">
                        Handle Different Currencies and Send Money Back Home
                     </h3>
                     <p>
                        Use our treasury solution to manage and send funds
                        abroad in different currencies. This helps you meet
                        obligations to partners in other countries more easily.
                     </p>
                  </div>
                  <Image
                     src={hospi4}
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
