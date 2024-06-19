import Image from "next/image";
import logo from "../../public/svg/logo.svg";
import React from "react";

const CheckoutNavbar = () => {
   return (
      <div className="flex justify-between items-center border-b-2 mb-4">
         <div className="mb-4">
            <Image
               src={logo}
               alt="zibaPay"
            />
         </div>
         <div>
            <p className="text-[#9E9E9E]">
               Chrisdon@gmail.com <br /> Pay{" "}
               <span className="text-main">RWF 350</span>
            </p>
         </div>
      </div>
   );
};

export default CheckoutNavbar;
