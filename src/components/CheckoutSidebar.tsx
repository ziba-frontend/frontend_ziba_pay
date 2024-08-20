import React from "react";
import Image from "next/image";
import im1 from "../../public/images/mobile_checkout.svg";
const CheckoutSidebar = () => {
   return (
      <div className=" bg-[#F4F4F4] hidden sm:block w-[100px] md:w-[280px] border-r p-4 transition-width duration-300 space-y-10 text-start mr-4">
         <h1 className="text-sm md:text-2xl text-[#4C4C4C] font-semibold  ">PAY WITH</h1>
         <div className="flex items-center space-x-2 border-t pt-4">
            <Image
               src={im1}
               alt="mobile chekout"
               width={30}
               height={30}
               className="hidden sm:block"
            />
            <h1 className="text-main text-sm">Mobile Money</h1>
         </div>
      </div>
   );
};

export default CheckoutSidebar;
