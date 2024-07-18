import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import careers1 from "../../../../public/images/careers1.png";
import careers2 from "../../../../public/images/careers2.png";
import careers3 from "../../../../public/images/careers3.png";
import careers4 from "../../../../public/images/careers4.png";
import careers5 from "../../../../public/images/careers5.png";
import careers6 from "../../../../public/images/careers6.png";
import careers7 from "../../../../public/images/careers7.png";
import rect from "../../../../public/images/rect1.png";

const Careers = () => {
   return (
      <div>
         <div className="flex items-center justify-center flex-col gap-5 mt-12 container py-10">
            <h1 className="text-center">Careers at Ziba pay</h1>
            <p className="text-center">
               We&apos;re looking for passionate individuals who are ready to
               join us in this <br /> journey of innovation and growth. If
               you&apos;re driven, creative, and eager to <br />
               make a difference, we want to hear from you!
            </p>
            <Button>Explore Job Openings</Button>
         </div>

         <div className="container flex items-center justify-center p-4 flex-col gap-8 pb-20">
            <Image
               src={careers1}
               alt="careers"
               className=""
            />
            <div className="w-full md:w-3/4">
               <h1 className="text-center my-4">
                  Craft Your Future with Ziba pay
               </h1>
               <p className="text-center">
                  Embark on a rewarding journey of shaping Africa&apos;s
                  connection to the global payment network. At Fincra,
                  we&apos;re committed to fostering diversity, promoting
                  teamwork, and fostering continuous growth. Join our passionate
                  team and be part of the transformative journey in the world of
                  payments.
               </p>
            </div>
            <h4>At the moment, we don&apos;t have any available positions</h4>
         </div>

         <div className=" bg-br relative">
            <Image
               src={rect}
               alt="rect"
               className="absolute w-full left-0 top-0"
            />
            <div className="flex flex-col gap-12 container py-20">
               <div className="mt-20 sm:mt-40">
                  <h2 className="mt-6 ">Benefits</h2>
                  <p className="mt-2 mb-2">
                     Ziba pay provides competitive salaries and a comprehensive
                     benefits package to <br />
                     support your professional growth and well-being.
                  </p>
               </div>
               <div className="flex items-center justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 gap-4 items-center justify-center  ">
                     <div className="flex gap-4 flex-col bg-white p-4 w-5/6 sm:w-3/4 md:w-[320px] lg:w-[380px] h-fit sm:h-[250px]  shadow-lg">
                        <Image
                           src={careers2}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Health Insurance </h4>
                        <p>
                           We offer comprehensive health insurance for all your
                           medical needs.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-4 w-5/6 sm:w-3/4 md:w-[320px] lg:w-[380px] h-fit sm:h-[250px]  shadow-lg">
                        <Image
                           src={careers3}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Life Insurance </h4>
                        <p>
                           All team members receive comprehensive life insurance
                           coverage.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-4 w-5/6 sm:w-3/4 md:w-[320px] lg:w-[380px] h-fit sm:h-[250px]  shadow-lg">
                        <Image
                           src={careers4}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Paid Annual Leave</h4>
                        <p>
                           All team members receive 20 days of paid annual
                           leave.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-4 w-5/6 sm:w-3/4 md:w-[320px] lg:w-[380px] h-fit sm:h-[250px]  shadow-lg">
                        <Image
                           src={careers5}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Professional Development</h4>
                        <p>
                           We invest in our people to ensure they can achieve
                           their short, medium, and long term professional
                           goals.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-4 w-5/6 sm:w-3/4 md:w-[320px] lg:w-[380px] h-fit sm:h-[250px]  shadow-lg">
                        <Image
                           src={careers6}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Remote Working Tools </h4>
                        <p>
                           We invest in our people to ensure they can achieve
                           their short, medium, and long term professional
                           goals.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-4 w-5/6 sm:w-3/4 md:w-[320px] lg:w-[380px] h-fit sm:h-[250px]  shadow-lg">
                        <Image
                           src={careers7}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Employee Pension </h4>
                        <p>
                           We provide all team members with an employee pension
                           plan.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container flex items-center justify-between min-h-[40vh]">
            <div>
               <h1 className="my-4">Take a Chance!</h1>
               <p>Send us your CV, and our team will review it</p>
            </div>
            <Button>Click to send CV</Button>
         </div>
      </div>
   );
};

export default Careers;
