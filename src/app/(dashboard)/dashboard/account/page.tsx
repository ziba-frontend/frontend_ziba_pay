import React from "react";

const Account = () => {
   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Testing Numbers</h2>

            <div className="bg-black flex  items-center justify-center rounded p-2 text-white">
               <p>Refresh</p>
            </div>
         </div>

         <div className="border-b py-2">
            <p>General Information</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div className="flex flex-col gap-2">
               <h3>Name</h3>
               <p>Chris Don</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Email</h3>
               <p>Chrisdon@gmail.com</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Account Balance</h3>
               <p>RWF0</p>
            </div>
         </div>
      </div>
   );
};

export default Account;
