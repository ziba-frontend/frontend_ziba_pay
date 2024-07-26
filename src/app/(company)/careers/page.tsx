"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";
import careers1 from "../../../../public/images/careers1.png";
import careers2 from "../../../../public/images/careers2.png";
import careers3 from "../../../../public/images/careers3.png";
import careers4 from "../../../../public/images/careers4.png";
import careers5 from "../../../../public/images/careers5.png";
import careers6 from "../../../../public/images/careers6.png";
import careers7 from "../../../../public/images/careers7.png";
import rect from "../../../../public/images/rect1.png";

const Careers = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [cvUploaded, setCvUploaded] = useState(false);
   const [cvName, setCvName] = useState("");
   const positionsRef = useRef<HTMLHeadingElement | null>(null);
   const drawerRef = useRef<HTMLDivElement | null>(null);

   const handleScrollToPositions = () => {
      if (positionsRef.current) {
         positionsRef.current.scrollIntoView({ behavior: "smooth" });
      }
   };

   const handleSendCVClick = () => {
      setIsDrawerOpen(true);
   };

   const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
      setCvUploaded(false);
      setCvName("");
   };

   const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setCvUploaded(true);
         setCvName(file.name);
      }
   };

   const handleOutsideClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
         handleCloseDrawer();
      }
   };

   React.useEffect(() => {
      if (isDrawerOpen) {
         document.addEventListener("click", handleOutsideClick);
      } else {
         document.removeEventListener("click", handleOutsideClick);
      }
      return () => {
         document.removeEventListener("click", handleOutsideClick);
      };
   }, [isDrawerOpen]);

   return (
      <div>
         <div className="flex items-center justify-center flex-col gap-5 mt-12 container py-10">
            <h1 className="text-center">Careers at Ziba Pay</h1>
            <p className="text-center">
               We&apos;re looking for passionate individuals who are ready to
               join us in this <br /> journey of innovation and growth. If
               you&apos;re driven, creative, and eager to <br />
               make a difference, we want to hear from you!
            </p>
            <Button onClick={handleScrollToPositions}>
               Explore Job Openings
            </Button>
         </div>

         <div className="container flex items-center justify-center p-4 flex-col gap-8 pb-20">
            <Image
               src={careers1}
               alt="careers"
               width={950}
            />
            <div
               className="w-full md:w-3/4"
               ref={positionsRef}
            >
               <h1 className="text-center my-4">
                  Craft Your Future with Ziba Pay
               </h1>
               <p className="text-center">
                  Embark on a rewarding journey of shaping Africa&apos;s
                  connection to the global payment network. At Ziba Pay,
                  we&apos;re committed to fostering diversity, promoting
                  teamwork, and fostering continuous growth. Join our passionate
                  team and be part of the transformative journey in the world of
                  payments.
               </p>
            </div>
            <h4>At the moment, we don&apos;t have any available positions</h4>
         </div>

         <div className="bg-br relative">
            <Image
               src={rect}
               alt="rect"
               className="absolute w-full left-0 top-0"
            />
            <div className="flex flex-col gap-12 container py-20 relative z-10">
               <div className="mt-20 sm:mt-40">
                  <h2 className="mt-6">Benefits</h2>
                  <p className="mt-2 mb-2">
                     Ziba Pay provides competitive salaries and a comprehensive
                     benefits package to support your professional growth and
                     well-being.
                  </p>
               </div>
               <div className="flex items-center justify-center xl:justify-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[25px]">
                     <div className="flex gap-4 flex-col bg-white p-[26px] w-full md:w-[320px] lg:w-[383px] h-fit sm:h-[250px] shadow-lg">
                        <Image
                           src={careers2}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Health Insurance</h4>
                        <p>
                           We offer comprehensive health insurance for all your
                           medical needs.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-[26px] w-full md:w-[320px] lg:w-[383px] h-fit sm:h-[250px] shadow-lg">
                        <Image
                           src={careers3}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Life Insurance</h4>
                        <p>
                           All team members receive comprehensive life insurance
                           coverage.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-[26px] w-full md:w-[320px] lg:w-[383px] h-fit sm:h-[250px] shadow-lg">
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
                     <div className="flex gap-4 flex-col bg-white p-[26px] w-full md:w-[320px] lg:w-[383px] h-fit sm:h-[250px] shadow-lg">
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
                     <div className="flex gap-4 flex-col bg-white p-[26px] w-full md:w-[320px] lg:w-[383px] h-fit sm:h-[250px] shadow-lg">
                        <Image
                           src={careers6}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Remote Working Tools</h4>
                        <p>
                           We provide the tools you need to excel in a remote
                           working environment.
                        </p>
                     </div>
                     <div className="flex gap-4 flex-col bg-white p-[26px] w-full md:w-[320px] lg:w-[383px] h-fit sm:h-[250px] shadow-lg">
                        <Image
                           src={careers7}
                           alt="health Insurance"
                           width={40}
                           height={40}
                           className="bg-[#3BD64A1A] rounded-full p-2"
                        />
                        <h4>Employee Pension</h4>
                        <p>
                           We provide all team members with an employee pension
                           plan.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container flex flex-col md:flex-row items-center justify-between min-h-[40vh]">
            <div className="text-center md:text-left">
               <h1 className="my-4">Take a Chance!</h1>
               <p>Send us your CV, and our team will review it</p>
            </div>
            <Button onClick={handleSendCVClick}>Click to send CV</Button>
         </div>

         {isDrawerOpen && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-50">
               <div
                  className="bg-white p-6 rounded-lg w-96"
                  ref={drawerRef}
               >
                  <h2 className="text-xl mb-4">Send your CV</h2>

                  <form>
                     {cvUploaded ? (
                        <p className="text-main">
                           {cvName} uploaded successfully
                        </p>
                     ) : (
                        <div className="mb-4 p-6 border-dashed border border-black">
                           <label
                              htmlFor="cv"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Upload CV (PDF)
                           </label>
                           <input
                              type="file"
                              id="cv"
                              accept="application/pdf"
                              className="mt-1 block cursor-pointer w-full text-sm text-gray-900 bg-gray-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={handleCvUpload}
                           />
                        </div>
                     )}
                     <div className="flex justify-end mt-6">
                        <Button
                           type="button"
                           onClick={handleCloseDrawer}
                           className="bg-destructive"
                        >
                           Cancel
                        </Button>
                        <Button
                           type="submit"
                           className="ml-2"
                        >
                           Submit
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default Careers;
