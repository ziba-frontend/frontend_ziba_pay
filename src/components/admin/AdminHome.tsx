"use client";
import React, { useEffect, useState } from "react";
import AdminAreaChart from "./AdminAreaChart";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import Image from "next/image";
import admin1 from "../../../public/images/admin1.png";
import admin2 from "../../../public/images/admin2.png";
import admin3 from "../../../public/images/admin3.png";
import AdminPieChart from "../AdminPieChart";
import { getAllUsers } from "@/lib/api-calls/admin";

const AdminHome = () => {

   const [ users , setUsers]=  useState([]);

   useEffect(() => {

      const getAll = async() => {
         try{
            const data = await getAllUsers();
            console.log(data)
            setUsers(data);
         }catch(error){
            console.log("error while getting All users")
         }
      }

      getAll();
   }, [])

   
   return (
      <>
         <h1 className="ml-4 text-xl md:text-2xl">Dashboard Overview</h1>
         <div className="grid gap-4 md:gap-6 p-4 md:p-6 lg:p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            <div className="border p-4 md:p-6 lg:p-10 flex flex-col gap-2 items-start justify-between rounded-[20px] h-[180px] lg:h-[200px]">
               <p className="text-[#979797]">NUMBER OF USERS</p>
               <h1 className="text-xl md:text-2xl font-bold">{users && users.length}</h1>
            </div>
            <div className="border p-4 md:p-6 lg:p-10 flex flex-col gap-2 items-start justify-between rounded-[20px] h-[180px] lg:h-[200px]">
               <p className="text-[#979797]">TODAY'S USERS</p>
               <h1 className="text-xl md:text-2xl font-bold">5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">+3%</span> since last week
               </small>
            </div>
            <div className="border p-4 md:p-6 lg:p-10 flex flex-col gap-2 items-start justify-between rounded-[20px] h-[180px] lg:h-[200px]">
               <p className="text-[#979797]">NEW USERS</p>
               <h1 className="text-xl md:text-2xl font-bold">+5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">+3%</span> since last week
               </small>
            </div>
            <div className="border p-4 md:p-6 lg:p-10 flex flex-col gap-2 items-start justify-between rounded-[20px] h-[180px] lg:h-[200px]">
               <p className="text-[#979797]">WEBSITE VISITS</p>
               <h1 className="text-xl md:text-2xl font-bold">+5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">10%</span> Increase since
                  last month
               </small>
            </div>
            <div className="border p-4 md:p-6 lg:p-10 flex flex-col gap-2 items-start justify-between rounded-[20px] h-[180px] lg:h-[200px]">
               <p className="text-[#979797]">PENDING APPROVALS</p>
               <h1 className="text-xl md:text-2xl font-bold">+5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">10%</span> Increase since
                  last month
               </small>
            </div>
            <div className="border p-4 md:p-6 lg:p-10 flex flex-col gap-2 items-start justify-between rounded-[20px] h-[200px] lg:row-span-2 lg:h-[420px]">
               <p>System Health</p>
               <small className="text-[#979797]">
                  Check your site health score
               </small>
               <AdminPieChart />
            </div>
            <div className="border p-4 md:p-6 rounded-[20px] flex gap-4 items-end lg:col-span-2 h-[180px] lg:h-[200px] justify-between">
               <div className="flex flex-col gap-2 md:gap-4">
                  <div className="flex flex-col">
                     <small className="font-bold">Visitors Overview</small>
                     <small className="text-[#979797]">Aug 25- Sep 25 </small>
                  </div>
                  <div className="flex flex-col">
                     <small className="font-bold">Campaign</small>
                     <small>20%</small>
                  </div>
                  <div className="flex flex-col">
                     <small>Direct</small>
                     <small className="font-bold">20%</small>
                  </div>
               </div>
               <Image
                  src={admin1}
                  alt="ziba admin"
                  className="w-[80px] h-[80px]"
               />
               <div className="flex flex-col gap-1 md:gap-2">
                  <Image
                     src={admin2}
                     alt="views"
      
                  />
                  <p>15,980</p>
                  <small>Page Views</small>
               </div>
               <div className="flex flex-col gap-1 md:gap-2">
                  <Image
                     src={admin3}
                     alt="views"
      
                  />
                  <p>4,324</p>
                  <small>Contacted</small>
               </div>
               <div className="flex flex-col gap-1 md:gap-2">
                  <p>12</p>
                  <small>Advertisement</small>
               </div>
               <div className="flex flex-col gap-1 md:gap-2">
                  <p>4</p>
                  <small>Campaigns</small>
               </div>
               <div className="flex flex-col gap-1 md:gap-2">
                  <p>12,499</p>
                  <small>Emails Sent</small>
               </div>
            </div>
         </div>
         <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full mt-4 px-4 lg:px-6">
            <div className="border p-4 md:p-6 flex flex-col gap-4 rounded-[20px]">
               <div className="flex flex-col">
                  <small className="font-bold">Reviews</small>
                  <div className="flex flex-col gap-2 md:gap-4 my-4">
                     <div>
                        <div className="flex justify-between py-1 md:py-2">
                           <small className="text-[#979797]">
                              Positive Reviews
                           </small>
                           <small className="text-[#979797]">80%</small>
                        </div>
                        <Progress
                           value={80}
                           color="main"
                           className="h-1 md:h-2"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between py-1 md:py-2">
                           <small className="text-[#979797]">
                              Neutral Reviews
                           </small>
                           <small className="text-[#979797]">17%</small>
                        </div>
                        <Progress
                           value={17}
                           color="neutral"
                           className="h-1 md:h-2"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between py-1 md:py-2">
                           <small className="text-[#979797]">
                              Negative Reviews
                           </small>
                           <small className="text-[#979797]">3%</small>
                        </div>
                        <Progress
                           value={3}
                           color="destructive"
                           className="h-1 md:h-2"
                        />
                     </div>
                  </div>
               </div>
               <div className="flex justify-between py-2 items-center">
                  <small className="text-[#979797]">
                     More than 1,500,000 developers used Zibapay API and over
                     700,000 Users.
                  </small>
                  <Button>View all reviews</Button>
               </div>
            </div>
            <div className="border p-4 md:p-6 flex flex-col gap-4 rounded-[20px] md:w-1/2">
               <div className="flex flex-col">
                  <small className="font-bold">User overview</small>
                  <small className="text-[#979797]">
                     <span className="text-main mr-2">(+5) more</span> this week
                  </small>
                  <AdminAreaChart />
               </div>
            </div>
         </div>
      </>
   );
};

export default AdminHome;
