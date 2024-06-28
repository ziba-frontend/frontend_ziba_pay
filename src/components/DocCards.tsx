import React, { Children, ReactNode } from "react";

const DocCards = ({ children }: { children: ReactNode }) => {
   return <div className="flex flex-wrap gap-4 items-start">{children}</div>;
};

export default DocCards;
