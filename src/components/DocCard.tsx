import React, { ReactNode } from "react";
import styles from "./DocCard.module.css";

interface DocCardProps {
   title:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Promise<React.AwaitedReactNode>
      | null
      | undefined;
   content:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Promise<React.AwaitedReactNode>
      | null
      | undefined;
   bgColor?: string; // Add the bgColor prop
   className?: string; // Add the className prop
   children?: ReactNode;
}

const DocCard = ({ title, content, bgColor, className, children }: DocCardProps) => {
   return (
      <div
         className={`${styles["resp-card"]} ${className}`}
         style={{ backgroundColor: bgColor }}
      >
         {title && <h4>{title}</h4>}
         <div>
            {content && <p>{content}</p>}
            {children}
         </div>
      </div>
   );
};

export default DocCard;
