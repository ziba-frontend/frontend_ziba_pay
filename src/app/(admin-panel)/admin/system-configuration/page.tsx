import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
const page = () => {
   return (
      <div className="p-4">
         <h2 className="mb-6">System Configuration</h2>
         <h4>Manage your system settings</h4>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col gap-2">
               <p>Payment Gateway Settings Panel</p>
               <div className="border p-4 flex flex-col gap-4 shadow-md rounded-lg ">
                  <div className="flex flex-col">
                     <small>API Key</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Callback URL</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Environment</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Enable Gateway</small>
                     <Switch />
                  </div>
                  <Button className="bg-main w-fit px-6">Save</Button>
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <p>Transaction limit</p>
               <div className="border p-4 flex flex-col gap-4 shadow-md rounded-lg ">
                  <div className="flex flex-col">
                     <small>Minimum Transaction Amount</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Maximum Transaction Amount</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Fixed Transaction Fee</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Fixed Percentage Fee</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Enable Limits</small>
                     <Switch />
                  </div>
                  <Button className="bg-main w-fit px-6">Save</Button>
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <p>Third Party Integration</p>
               <div className="border p-4 flex flex-col gap-4 shadow-md rounded-lg ">
                  <div className="flex flex-col">
                     <small>API Key</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Callback URL</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Environment</small>
                     <input className="border w-full p-2 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                     <small>Enable Gateway</small>
                     <Switch />
                  </div>
                  <Button className="bg-main w-fit px-6">Save</Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default page;
