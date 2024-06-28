import React from "react";

const BEndpoint = () => {
   return (
      <div className="bg-[#434141] w-full rounded flex gap-4 items-center px-2 my-4">
         <span className="bg-background rounded-full px-2">Get</span>
         <p className="text-white">/refunds/{`{refund_id}`}</p>
      </div>
   );
};

export default BEndpoint;
