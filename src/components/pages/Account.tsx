"use client";
import { getUserProfile } from "@/lib/api-calls/auth-server";
import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";

const Account = () => {
   const [user, setUser] = useState({
      name: "",
      email: "",
      businessType: "",
   });
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const userData = await getUserProfile();
            setUser(userData);
         } catch (error) {
            console.error("Error fetching user profile:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchUserProfile();
   }, []);

   if (loading) {
      return (
         <div className="w-full h-screen flex items-center justify-center">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2>Profile</h2>
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
               <h3>Business Type</h3>
               <p>{user.businessType}</p>
            </div>
         </div>
      </div>
   );
};

export default Account;
