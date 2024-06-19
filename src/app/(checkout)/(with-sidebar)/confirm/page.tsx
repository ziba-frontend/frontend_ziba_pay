import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
   return (
      <div className="flex flex-col  justify-center items-center mb-60 mt-20 ">
         <h1 className=" text-gray-200">loader.......</h1>
         <p className="text-center text-[#535353]  ">
            Please complete the authorisation process by inputting your PIN on
            your mobile device
         </p>
         <Link
            href="/"
            className="mt-6"
         >
            Cancel
         </Link>
      </div>
   );
};

export default Page;
