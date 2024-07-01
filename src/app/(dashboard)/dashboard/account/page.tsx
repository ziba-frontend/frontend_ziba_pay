"use client"
import { getUserProfile } from "@/lib/api-calls/action";
import React, { useEffect, useState } from "react";

const Account = () => {
   const [user, setUser] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      businessName: "",
      businessType: "",
      country: "",
   });

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const userData = await getUserProfile();
            setUser(userData);
         } catch (error) {
            console.error("Error fetching user profile:", error);
         }
      };

      fetchUserProfile();
   }, []);

   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Testing Numbers</h2>
            <div className="bg-black flex items-center justify-center rounded p-2 text-white">
               <p>Refresh</p>
            </div>
         </div>
         <div className="border-b py-2">
            <p>General Information</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div className="flex flex-col gap-2">
               <h3>Name</h3>
               <p>{user.name}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Email</h3>
               <p>{user.email}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Phone Number</h3>
               <p>{user.phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Business Name</h3>
               <p>{user.businessName}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Business Type</h3>
               <p>{user.businessType}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3>Country</h3>
               <p>{user.country}</p>
            </div>
         </div>
      </div>
   );
};

export default Account;
