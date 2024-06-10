import Image from "next/image";
import React from "react";

export type SalesProps = {
   name: string;
   email: string;
   saleAmount: string;
};

export default function SalesCard(props: SalesProps) {
   return (
      <div className="  flex flex-wrap justify-between gap-3 ">
         <section className="flex justify-between gap-3 ">
            <div className=" h-12 w-12 rounded-full bg-white p-1">
               <Image
                  width={200}
                  height={200}
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${props.name}`}
                  alt="avatar"
               />
            </div>
            <div className="text-sm">
               <p>{props.name}</p>
               <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                  {props.email}
               </div>
            </div>
         </section>
         <p>{props.saleAmount}</p>
      </div>
   );
}
