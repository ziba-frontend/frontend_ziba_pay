import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Page = () => {
   return (
      <div className="flex flex-col  justify-center items-center mb-60 mt-20 ">
         <div className="p-6">
            <ClipLoader color="green" />
         </div>
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
