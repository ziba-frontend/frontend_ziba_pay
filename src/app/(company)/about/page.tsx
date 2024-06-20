import Image from "next/image";
import React from "react";
import about1 from "../../../../public/images/about1.png";
import rect from "../../../../public/images/rect1.png";
import about2 from "../../../../public/images/about2.png";
import about3 from "../../../../public/images/about3.png";
import about4 from "../../../../public/images/about4.png";
import about5 from "../../../../public/images/about5.png";
import CheckList from "@/components/CheckList";

const AboutUs = () => {
   return (
      <div>
         <div className="flex items-center justify-center gap-6 flex-col container py-6">
            <h1 className="text-center">
               We&apos;re changing how businesses handle their money with
               payment solutions made just for them. It&apos;s like a party for
               your finances
            </h1>
            <Image
               src={about1}
               alt="about1"
            />
         </div>
         <div className="relative py-20 bg-br">
            <Image
               src={rect}
               alt="rect"
               className="absolute top-0 left-0 w-full "
            />

            <div className="flex flex-col container items-center justify-center gap-4 mt-20">
               <h3 className="text-center mt-10">
                  Ziba Pay is a team of passionate professionals dedicated to
                  delivering excellence in payment technology. With a wealth of
                  experience and expertise in the fintech industry, our team
                  works tirelessly to develop cutting-edge solutions that meet
                  the evolving needs of businesses in Africa and beyond.
               </h3>
               <Image
                  src={about2}
                  alt="ziba"
                  className="w-[200px] md:w-[400px]"
               />
            </div>
         </div>

         <div className="flex flex-col container items-center justify-center gap-4 mt-20">
            <div className="flex flex-col container items-center justify-center gap-4 mt-20 py-6">
               <h3 className="text-center ">
                  At Ziba Pay, we offer a comprehensive suite of payment
                  solutions designed to streamline operations, enhance customer
                  experiences, and drive business growth. From online payment
                  processing to invoicing and financial management tools, our
                  platform provides businesses with the tools they need to
                  succeed in today&apos;s competitive marketplace.
               </h3>

               <Image
                  src={about3}
                  alt="ziba"
                  className="w-[200px] md:w-[400px]"
               />
            </div>
         </div>

         <div className="relative py-20 bg-br">
            <Image
               src={rect}
               alt="rect"
               className="absolute top-0 left-0 w-full "
            />

            <div className="flex flex-col container items-center justify-center gap-4 mt-20">
               <h3 className="text-center mt-10">
                  We offer our full suite of products through an API, empowering
                  developers to innovate and businesses to scale up, providing
                  top-notch payment solutions.
               </h3>
               <p>
                  We&apos;ve made these products with care so businesses can
                  grow without limits.
               </p>
            </div>
         </div>

         <div className="bg-[#efeeee]">
            <div className="flex items-center justify-center p-6 container gap-6 flex-col sm:flex-row">
               <div className="flex flex-col gap-6  bg-white rounded-2xl md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[600px] w-5/6 h-[400px]">
                  <div className="p-6">
                     <h2>Our Mission</h2>
                     <p>Making payment process for businesses easy</p>
                  </div>
                  <Image
                     src={about4}
                     alt="mission"
                  />
               </div>
               <div
                  className="flex flex-col gap-6 p-4 bg-white rounded-2xl md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[600px] w-5/6 h-[400px] text-white"
                  style={{ backgroundImage: "url(/images/about6.png)",backgroundSize:"cover", backgroundPosition:"center" }}
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
         <div className="bg-br">
            <div className="flex items-center justify-center p-6 container gap-6 flex-col sm:flex-row">
               <Image
                  src={about5}
                  alt="about"
                  className="w-[300px] md:w-[500px]"
               />
               <div className="flex flex-col gap-6 p-4  justify-center md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[600px] w-5/6 h-[400px]">
                  <h2>Why Choose Ziba Pay</h2>
                  <p>
                     At Ziba Pay, we embrace creativity, innovation, and
                     independence, focusing on customer needs and teamwork to
                     help them succeed.
                  </p>
                  <div>
                     <CheckList
                        items={[
                           "Innovation",
                           "Security",
                           "Customer Service",
                           "Affordability",
                        ]}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
