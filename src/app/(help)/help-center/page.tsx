import Link from "next/link";
import React from "react";

const HelpCenter = () => {
   return (
      <div className='container flex items-center justify-center  min-h-[80vh] '>
         <div>
            <h1>General</h1>
            <h4>FAQ</h4>
            <Link href='help-center/ziba-pay-security'>
               <p>How secure is Ziba pay?</p>
            </Link>
            <Link href='help-center/virtual-accounts'>
               <p>Virtual Accounts</p>
            </Link>
            <Link href='help-center/ziba-pay-apis'>
               {" "}
               <p>Ziba pay APIs</p>
            </Link>
         </div>
      </div>
   );
};

export default HelpCenter;
