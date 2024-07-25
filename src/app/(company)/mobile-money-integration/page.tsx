import React from "react";
import Image from "next/image";
import integ1 from "../../../../public/images/integ1.png";
import rect from "../../../../public/images/rect1.png";
import integ2 from "../../../../public/images/integ2.gif";
import integ3 from "../../../../public/images/integ3.gif";
import integ4 from "../../../../public/images/integ4.gif";
import integ5 from "../../../../public/images/integ5.gif";
import integ6 from "../../../../public/images/integ6.png";
import airtel from "../../../../public/images/airtel.png";
import ball1 from "../../../../public/images/ball1.png";
import momo from "../../../../public/images/momo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Integration = () => {
   return (
      <div>
         <div className="container flex flex-col gap-6 items-center justify-center py-6">
            <h1 className="text-center text-[48px]">
               Send and Receive Money Easily
            </h1>
            <p className="text-center text-[20px]">
               Send and receive money effortlessly with Ziba Pay&apos;s
               integration of MTN Mobile Money and Airtel Mobile Money. Offer
               your customers the convenience of seamless mobile wallet
               payments.
            </p>
            <div className="relative my-10">
               <Image
                  src={integ1}
                  alt="ziba momo integration "
                  width={996}
               />
               <Image
                  src={momo}
                  alt="ziba momo integration"
                  className="absolute bottom-10 md:-left-[35px] lg:-left-20 w-[90px] -left-[30px] lg:w-[200px] md:w-[150px]"
               />
               <Image
                  src={airtel}
                  alt="ziba momo integration"
                  className="absolute bottom-10 md:-right-[35px] lg:-right-20 w-[90px] -right-[30px] lg:w-[200px] md:w-[150px]"
               />
            </div>
         </div>

         <div className="bg-br relative py-20 mt-6">
            <Image
               src={rect}
               alt="ziba"
               className="absolute top-0 left-0 w-full"
            />

            <div className="container pt-20 mt-10 relative z-20">
               <Image
                  src={ball1}
                  alt="ball"
                  className="absolute z-10 top-40 left-80 hidden md:block"
               />
               <Image
                  src={ball1}
                  alt="ball"
                  className="absolute z-10 top-40 right-80 hidden md:block"
               />
               <Image
                  src={ball1}
                  alt="ball"
                  className="absolute z-10 top-[28rem] right-20 hidden md:block"
               />
               <Image
                  src={ball1}
                  alt="ball"
                  className="absolute z-10 bottom-[28rem] left-80 hidden md:block"
               />
               <Image
                  src={ball1}
                  alt="ball"
                  className="absolute z-10 bottom-[10rem] right-[38rem] hidden md:block"
               />
               <h1 className="text-center my-12 text-[48px]">How It Works</h1>
               <div className="flex flex-col gap-0 items-center justify-center lg:items-start ">
                  <div className="flex items-center gap-8 flex-row-reverse md:flex-row">
                     <div className="flex flex-col gap-4 bg-white rounded-[15px] sm:w-[388px] p-4">
                        <div>
                           <h3 className="text-[40px]">Sign Up</h3>
                           <p className="text-[20px]">
                              Create an account with Ziba pay
                           </p>
                        </div>
                        <Image
                           width={250}
                           height={250}
                           src={integ2}
                           alt="sign up"
                           className="ml-[50%] -translate-x-[50%]"
                        />
                     </div>
                     <h1 className="text-xl md:text-3xl">1</h1>
                  </div>
                  <div className="flex items-center gap-8 flex-row-reverse md:flex-row">
                     <div className="flex flex-col gap-4 bg-white rounded-[15px] sm:w-[388px] p-4 my-8 2xl:ml-[300px] xl:ml-[200px] lg:ml-[100px]">
                        <div>
                           <h3 className="text-[40px]">Choose Provider</h3>
                           <p className="text-[20px]">
                              Select MTN Mobile Money, Airtel Mobile Money, or
                              both
                           </p>
                        </div>
                        <Image
                           width={298}
                           height={217}
                           src={integ3}
                           alt="sign up"
                           className="ml-[50%] -translate-x-[50%]"
                        />
                     </div>
                     <h1 className="text-xl md:text-3xl">2</h1>
                  </div>
                  <div className="flex items-center gap-8 2xl:ml-[600px] xl:ml-[400px] lg:ml-[200px]">
                     <h1 className="text-xl md:text-3xl">3</h1>
                     <div className="flex flex-col gap-4 bg-white rounded-[15px] sm:w-[388px] p-4 my-8 ">
                        <div>
                           <h3 className="text-[40px]">Link Accounts</h3>
                           <p className="text-[20px]">
                              Link your mobile money number
                           </p>
                        </div>
                        <Image
                           width={217}
                           height={217}
                           src={integ4}
                           alt="sign up"
                           className="ml-[50%] -translate-x-[50%]"
                        />
                     </div>
                  </div>
                  <div className="flex items-center gap-8 2xl:ml-[800px] xl:ml-[600px] lg:ml-[400px]">
                     <h1 className="text-xl md:text-3xl">4</h1>
                     <div className="flex flex-col gap-4 bg-white rounded-[15px] sm:w-[388px] p-4 my-8">
                        <div>
                           <h3 className="text-[40px]">Start Transacting</h3>
                           <p className="text-[20px]">
                              Begin sending and receiving payments instantly
                           </p>
                        </div>
                        <Image
                           width={298}
                           height={217}
                           src={integ5}
                           alt="sign up"
                           className="ml-[50%] -translate-x-[50%]"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative py-20">
            <Image
               src={rect}
               alt="ziba"
               className="absolute top-0 left-0 w-full"
            />

            <div className="container pt-20 mt-10 flex flex-col  justify-center gap-6 md:flex-row items-start">
               <div className=" w-full md:w-fit flex items-center justify-center">
                  {" "}
                  <Image
                     src={integ6}
                     alt="ziba pay"
                     className="w-5/6 md:w-[400px]"
                  />
               </div>

               <div>
                  <h2 className="my-8">Get Started with Mobile Money Today</h2>
                  <Link href="/sign-up">
                     <Button>Create a free account</Button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Integration;
