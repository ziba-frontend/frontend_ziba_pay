import Image from "next/image";
import React from "react";
import tick from "../../public/images/checkmark.png";

interface CheckListProps {
   items: string[];
}

const CheckList: React.FC<CheckListProps> = ({ items }) => {
   return (
      <ul className='list-none space-y-2'>
         {items.map((item, index) => (
            <li
               key={index}
               className='flex items-start'
            >
               <span className='text-main mr-2 mt-1.5'>
                  <Image
                     src={tick}
                     alt='check mark'
                  />
               </span>
               <span>{item}</span>
            </li>
         ))}
      </ul>
   );
};

export default CheckList;
