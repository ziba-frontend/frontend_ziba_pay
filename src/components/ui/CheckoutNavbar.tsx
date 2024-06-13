import Image from "next/image";
import logo from "../../../public/svg/logo.svg";
import React from "react";

const CheckoutNavbar = () => {
   return (
      <div className="flex justify-between items-center border-b-2 mb-4">
         <div className="mb-4">
            <Image
               src={logo}
               alt="zibaPay"
               width={210}
            />
         </div>
         <div>
            <h1 className="text-[#9E9E9E]">Chrisdon@gmail.com
            Pay <span className="text-main">RWF 350</span></h1>
         </div>
      </div>
   );
};

export default CheckoutNavbar;
