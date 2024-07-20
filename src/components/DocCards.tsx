import React, { Children, ReactNode } from "react";

const DocCards = ({ children }: { children: ReactNode }) => {
   return <div className="flex flex-wrap gap-[24px] items-start">{children}</div>;
};

export default DocCards;
