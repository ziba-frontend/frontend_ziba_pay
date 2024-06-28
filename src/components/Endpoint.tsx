import React from "react";

const Endpoint = () => {
   return (
      <div className="bg-main rounded flex gap-4 items-center px-2">
         <span className="bg-background rounded-full px-2">GET</span>
         <p className="text-white">/v1/reporting/transactions</p>
      </div>
   );
};

export default Endpoint;
