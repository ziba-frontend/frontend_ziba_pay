import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import sol2 from "../../../../public/images/sol2.png";
import sol3 from "../../../../public/images/sol3.png";
import sol4 from "../../../../public/images/sol4.png";
import sol5 from "../../../../public/images/sol5.png";

const Solution = () => {
   return (
      <div className="py-20 container">
         <div className="flex-col flex md:flex-row items-center justify-center">
            <div className="">
               <h1 className="my-4">
                  Tailored solutions designed to meet the unique needs of your
                  industry or business, whether you&apos;re in e-commerce,
                  healthcare, hospitality, or education.
               </h1>
               <p>
                  Ziba Pay offers customizable payment solutions to address the
                  specific challenges and requirements of your industry.
               </p>
            </div>
            {/* <Image src={} alt="ziba pay"/> */}
         </div>

         <div className="flex my-10 flex-col gap-6 md:flex-row">
            <div className="flex flex-col gap-4">
               <h2>E-commerce Solutions</h2>
               <p>
                  Unlock the full potential of your online store with Ziba Pay&apos;s
                  e-commerce solutions. Seamlessly integrate payment processing,
                  manage transactions, and enhance the checkout experience for
                  your customers.
               </p>
               <Button className="w-fit">Learn More</Button>
               <Image
                  src={sol2}
                  alt="ziba"
               />
            </div>
            <div className="flex flex-col gap-4 md:mt-[200px]">
               <h2>Healthcare Payment Solutions</h2>
               <p>
                  Simplify medical billing and streamline payment processes with
                  Ziba Pay&apos;s healthcare payment solutions. Ensure compliance,
                  improve patient satisfaction, and accelerate revenue cycles
                  with our secure and efficient payment platform
               </p>
               <Button className="w-fit">Learn More</Button>
               <Image
                  src={sol3}
                  alt="ziba"
               />
            </div>
         </div>

         <div className="flex my-20 flex-col gap-6 md:flex-row ">
            <div className="flex flex-col gap-4">
               <h2>Hospitality Payment Solutions</h2>
               <p>
                  Enhance guest experiences and optimize revenue streams with
                  Ziba Pay&apos;s hospitality payment solutions. From mobile check-in
                  to integrated POS systems, we provide the tools you need to
                  streamline operations and deliver exceptional service.
               </p>
               <Button className="w-fit">Learn More</Button>
               <Image
                  src={sol4}
                  alt="ziba"
               />
            </div>
            <div className="flex flex-col gap-4 md:mt-[200px]">
               <h2>Education Payment Solutions</h2>
               <p>
                  Transform tuition collection and student billing with Ziba
                  Pay&apos;s education payment solutions. Simplify fee management,
                  automate recurring payments, and improve financial
                  transparency for educational institutions of all sizes.
               </p>
               <Button className="w-fit">Learn More</Button>
               <Image
                  src={sol5}
                  alt="ziba"
               />
            </div>
         </div>
      </div>
   );
};

export default Solution;
