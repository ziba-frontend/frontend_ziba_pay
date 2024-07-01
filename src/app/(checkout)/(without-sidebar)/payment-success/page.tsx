import { LockKeyhole } from "lucide-react";
import successIm from "../../../../../public/images/success.png";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <div className=" mx-auto w-full md:w-5/6 lg:w-[50%]"> <div className="flex flex-col gap-4 items-center justify-center">
         <Image
            src={successIm}
            alt="success"
         />
         <p className="text-2xl">Payment Successful</p>
         <small className="text-gray-500">
            You paid RWF 350 to Kigali Mart
         </small>
         <Link href="/">Go Back to Homepage</Link>
      </div></div>
         <div className="flex gap-2 mt-12">
            <LockKeyhole />{" "}
            <p>
               Secured by{" "}
               <Link
                  href="/"
                  className="font-bold"
               >
                  ZibaPay
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Layout;
