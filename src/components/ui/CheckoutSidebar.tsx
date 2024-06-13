import React from "react";
import Image from "next/image";
import im1 from "../../../public/images/mobile_checkout.svg";
const CheckoutSidebar = () => {
   return (
      <div className=" bg-[#F4F4F4] fixed top-0 left-0  bottom-0 w-[300px] border-r p-4 transition-width duration-300 space-y-10 text-start">
         <h1 className="text-2xl text-[#4C4C4C] font-semibold">
            PAY WITH
         </h1>
         <div className="flex items-center space-x-2">
            <Image
               src={im1}
               alt="mobile chekout"
               width={30}
               height={30}
            />
            <h1 className="text-main text-sm">Mobile Money</h1>
         </div>
      </div>
   );
};

export default CheckoutSidebar;
