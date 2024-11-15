import Image from "next/image";
import React from "react";
import about1 from "../../../../public/images/about1.png";
import rect from "../../../../public/images/rect1.png";
import about2 from "../../../../public/images/about2.png";
import about3 from "../../../../public/images/about3.png";
import about4 from "../../../../public/images/about4.png";
import about5 from "../../../../public/images/about5.png";
import aboutball from "../../../../public/images/aboutball.png";
import CheckList from "@/components/CheckList";
import checkMark from "../../../../public/images/check.png";
import logo from "../../../../public/svg/logo.svg";
import { Metadata } from "next";


export const metadata: Metadata = {
   title: "About",
   description: "Learn more about Ziba Pay and our mission.",
};
const AboutUs = () => {
   const checkListItems = [
      { text: "Innovation", img: checkMark },
      { text: "Security", img: checkMark },
      { text: "Customer Service", img: checkMark },
      { text: "Affordability", img: checkMark },
   ];


   return (
      <div>
         <div className="flex items-center justify-center gap-6 flex-col container md:py-10 pb-20">
            <h1 className="text-center my-6 md:w-3/4">
               We&apos;re changing how businesses handle their money with
               payment solutions made just for them. It&apos;s like a party for
               your finances
            </h1>
            <Image
               src={about1}
               alt="about1"
               width={1100}
            />
         </div>
         <div className="relative py-10 md:py-20 bg-br">
            <Image
               src={rect}
               alt="rect"
               className="absolute top-0 left-0 w-full "
            />

            <div className="flex flex-col container items-center justify-center gap-4 mt-10 md:mt-20">
               <h2 className="lg:text-3xl mt-10">
                  Ziba Pay is a team of passionate professionals dedicated to
                  delivering excellence in payment technology. With a wealth of
                  experience and expertise in the fintech industry, our team
                  works tirelessly to develop cutting-edge solutions that meet
                  the evolving needs of businesses in Africa and beyond.
               </h2>
               <Image
                  src={about2}
                  alt="ziba"
                  width={700}
                  className="mt-4"
               />
            </div>
         </div>

         <div className="flex flex-col container items-center justify-center gap-4 md:mt-20  pb-20">
            <div className="flex flex-col container items-center justify-center gap-4 mt-6 md:mt-20 py-6">
               <h2 className="my-4 lg:text-3xl">
                  At Ziba Pay, we offer a comprehensive suite of payment
                  solutions designed to streamline operations, enhance customer
                  experiences, and drive business growth. From online payment
                  processing to invoicing and financial management tools, our
                  platform provides businesses with the tools they need to
                  succeed in today&apos;s competitive marketplace.
               </h2>
               <div className="relative">
                  <Image
                     src={about3}
                     alt="ziba"
                     width={800}
                       className="mt-4"
                  />
                  <Image
                     src={logo}
                     alt="zibapay"
                     className="absolute bottom-20 left-1/2 transform -translate-x-1/2 "
                  />
               </div>
            </div>
         </div>

         <div className="relative py-20 bg-br">
            <Image
               src={rect}
               alt="rect"
               className="absolute top-0 left-0 w-full "
            />

            <div className="flex flex-col container items-start justify-start gap-6 md:mt-20 py-10 relative">
               <h2 className="text-start md:mt-20 ">
                  We offer our full suite of products through an API, empowering
                  developers to innovate and businesses to scale up, providing
                  top-notch payment solutions.
               </h2>
               <Image
                     src={aboutball}
                     alt="about"
                     className="absolute -left-2 hidden md:block"
                  />
               <p>
                  We&apos;ve made these products with care so businesses can
                  grow without limits.
               </p>
            </div>
         </div>

         <div className="bg-[#efeeee] py-16">
            <div className="flex items-center justify-center p-6 container gap-[28px] flex-col md:flex-row">
               <div className="flex flex-col gap-6  bg-white rounded-2xl md:w-[400px] md:h-[900px]  lg:w-[586px] lg:h-[1153px] sm:w-5/6 w-[90%] h-[800px]">
                  <div className="p-6">
                     <h2 className="mb-4">Our Mission</h2>
                     <p>Making payment process for businesses easy</p>
                  </div>
                  <Image
                     src={about4}
                     alt="mission"
                  />
               </div>
               <div
                  className="flex flex-col gap-6 p-4 bg-white rounded-2xl md:w-[400px] md:h-[900px] lg:w-[586px] lg:h-[1153px] sm:w-5/6 w-[90%] h-[800px] text-white"
                  style={{
                     backgroundImage: "url(/images/about6.png)",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                  }}
               >
                  <h2>Our Vision</h2>
                  <p>
                     To be Africa&apos;s top provider of customizable payment
                     solutions, empowering businesses to streamline operations
                     and improve customer experiences.
                  </p>
               </div>
            </div>
         </div>
         <div className="container bg-br md:bg-background pt-10 md:pt-40 relative ">
         <Image
               src={rect}
               alt="rect"
               className="absolute top-0 left-0 w-full block md:hidden"
            />
            <div className="flex items-center justify-center py-16  gap-6 flex-col md:flex-row w-full md:bg-br lg:w-[90%] mx-auto ">
               <Image
                  src={about5}
                  alt="about"
                  className=" md:w-[400px] lg:w-[500px] 2xl:w-[600px]"
               />
               <div className="flex flex-col gap-6 p-4  justify-center ">
                  <h2>Why Choose Ziba Pay</h2>
                  <p>
                     At Ziba Pay, we embrace creativity, innovation, and
                     independence, focusing on customer needs and teamwork to
                     help them succeed.
                  </p>
                  <div>
                     <CheckList items={checkListItems} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
