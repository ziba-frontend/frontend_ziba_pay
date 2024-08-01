import Image from "next/image";
import React from "react";
import partn1 from "../../../../public/images/partnership1.png";
import { Button } from "@/components/ui/button";
import partn2 from "../../../../public/images/partnership2.png";
import rect from "../../../../public/images/rect1.png";
import partn3 from "../../../../public/images/partnership3.png";
import CheckList from "@/components/CheckList";
import checkMark from "../../../../public/images/check.png";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Partnership - Ziba Pay",
   description:
      "Join forces with Ziba Pay and unlock new opportunities for growth and innovation",
};

const Partnership = () => {
   const checkListItems = [
      { text: "Earn Commissions", img: checkMark },
      { text: "Additional Revenue Streams", img: checkMark },
      { text: "Expand Your Reach", img: checkMark },
      { text: "Trusted Partnership", img: checkMark },
      { text: "Marketing Support", img: checkMark },
   ];
   return (
      <div>
         <div className="flex flex-col py-6 md:flex-row gap-6 container items-center ">
            <Image
               src={partn1}
               alt="partnership"
               className="md:w-[400px] lg:w-[500px]"
            />
            <div className="flex flex-col gap-2  justify-center">
               <h1>Unlock Growth Opportunities with Ziba Pay Partnerships</h1>
               <p>
                  we believe in the power of collaboration to drive mutual
                  success. Partnering with us opens the door to a wide range of
                  benefits and opportunities for your business.
               </p>
               <Button className="w-fit p-6">Become a partner</Button>
            </div>
         </div>
         <div className="bg-br py-6 relative">
            <Image
               src={rect}
               alt="ziba"
               className="absolute top-0 left-0 w-full "
            />
            <div className="flex container pt-6 md:pt-20 flex-col md:flex-row gap-6 items-center justify-center ">
               <div className="  pt-10">
                  <h2 className="my-4">
                     Start your journey towards becoming a Ziba pay partner
                     today.
                  </h2>
                  <p>
                     Explore our diverse partner programs and find the one that
                     best fits you.
                  </p>
                  <div className="flex flex-col my-4 md:justify-between lg:flex-row gap-4">
                     <div>
                        <h4 className="my-2">Strategic Partner</h4>
                        <p>
                           A Ziba pay Strategic Partner is a business or
                           enterprise entity specializing in technology
                           solutions or general services that enhance
                           operational efficiency and drive business growth for
                           Merchants within Fincra’s expanding ecosystem.
                        </p>
                     </div>
                     <div>
                        <h4 className="my-2">Incentive Partner</h4>
                        <p>
                           A Ziba pay Incentive Partner is a business,
                           individual, or corporate entity that earns
                           commissions for every qualified lead and successfully
                           converted business referred to Ziba pay. Referrals
                           present an excellent opportunity to generate income
                           with Ziba pay.
                        </p>
                     </div>
                  </div>
               </div>

               <Image
                  src={partn2}
                  alt="partnership"
                  className="md:w-[400px] lg:w-[500px]"
               />
            </div>
         </div>
         <div className="bg-white">
            <div className="py-20 container">
               <h2 className="mb-8">
                  Boost Your Earnings as a Strategic Partner
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col w-5/6 sm:w-[300px]">
                     <h4 className="my-3">1. Exclusive Offers</h4>
                     <p>
                        Attract new customers by offering special discounts,
                        perks, and rewards through Ziba pay
                     </p>
                  </div>
                  <div className="flex flex-col w-5/6 sm:w-[300px]">
                     <h4 className="my-3">2. Enhanced Customer Trust</h4>
                     <p>
                        Build customer loyalty and credibility by aligning your
                        brand with Ziba pay trusted reputation.
                     </p>
                  </div>
                  <div className="flex flex-col w-5/6 sm:w-[300px]">
                     <h4 className="my-3">3. Business Referrals</h4>
                     <p>
                        Expand your customer base and revenue opportunities with
                        referrals from Ziba pay to people in need of your
                        solutions.
                     </p>
                  </div>
                  <div className="flex flex-col w-5/6 sm:w-[300px]">
                     <h4 className="my-3">4. Increased Brand Visibility</h4>
                     <p>
                        Gain exposure through prominent placement on our
                        website, marketing materials, and digital channels,
                        reaching potential customers within our ecosystem.
                     </p>
                  </div>
                  <div className="flex flex-col w-5/6 sm:w-[300px]">
                     <h4 className="my-3">5. Networking Opportunities</h4>
                     <p>
                        Connect with other esteemed Ziba pay Partners for
                        collaboration and business development within our
                        vibrant community.
                     </p>
                  </div>
               </div>
               <Button className="mt-20 p-6">Become A Strategic Partner</Button>
            </div>
         </div>
         <div className="relative py-10 md:py-20">
            <Image
               src={rect}
               alt="ziba"
               className="absolute top-0 left-0 w-full"
            />
            <div className="my-6 py-4">
               <div className="flex flex-col md:items-center justify-center md:flex-row gap-6 container">
                  <Image
                     src={partn3}
                     alt="ziba"
                     className="hidden md:block"
                  />
                  <div className="">
                     <h2 className="my-2">
                        Boost Your Earnings as a Strategic <br /> Partner
                     </h2>
                     <div className="my-4">
                        <CheckList items={checkListItems} />
                     </div>

                     <Button className="mt-4 p-6">
                        Become an incentive partner
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Partnership;
