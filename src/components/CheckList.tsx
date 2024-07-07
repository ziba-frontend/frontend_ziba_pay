import Image, { StaticImageData } from "next/image";
import React from "react";

interface CheckListProps {
  items: { text: string; img: StaticImageData }[];
}

const CheckList: React.FC<CheckListProps> = ({ items }) => {
  return (
    <ul className="list-none space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-main mr-2 mt-1.5">
            <Image src={item.img} alt="check mark" />
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default CheckList;
