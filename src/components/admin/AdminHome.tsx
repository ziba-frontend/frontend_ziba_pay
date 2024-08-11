"use client";
import React from "react";
import AdminAreaChart from "./AdminAreaChart";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import Image from "next/image";
import admin1 from "../../../public/images/admin1.png";
import admin2 from "../../../public/images/admin2.png";
import admin3 from "../../../public/images/admin3.png";

const AdminHome = () => {
   return (
      <div className="flex flex-col gap-6 p-6 md:p-8">
         <div className="flex gap-6 pb-4 flex-wrap">
            <div className="border p-6 md:p-10 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[280px]">
               <p className="text-[#979797]">NUMBER OF USERS</p>
               <h1>5,000</h1>
            </div>
            <div className="border p-6 md:p-10 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[280px]">
               <p className="text-[#979797]">TODAY'S USERS</p>
               <h1>5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">+3%</span> since last week
               </small>
            </div>
            <div className="border p-6 md:p-10 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[280px]">
               <p className="text-[#979797]">NEW USERS</p>
               <h1>+5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">+3%</span> since last week
               </small>
            </div>
            <div className="border p-6 md:p-10 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[280px]">
               <p className="text-[#979797]">WEBSITE VISITS</p>
               <h1>+5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">10%</span> Increase since
                  last month
               </small>
            </div>
         </div>

         <div className="flex gap-6 pb-4 flex-wrap">
            <div className="border p-4 md:p-6 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[40%]">
               <div className="flex flex-col">
                  <small className="font-bold">User overview</small>
                  <small className="text-[#979797]">
                     <span className="text-main mr-2">(+5) more</span> this week
                  </small>
                  {/* area chart */}
                  <div>
                     <AdminAreaChart />
                  </div>
               </div>
            </div>
            <div className="border p-4 md:p-6 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[55%]">
               <div className="flex flex-col">
                  <small className="font-bold">Reviews</small>

                  <div className="flex flex-col gap-4 my-4">
                     <div>
                        <div className="flex justify-between py-2">
                           <small className="text-[#979797]">
                              Positive Reviews
                           </small>
                           <small className="text-[#979797]">80%</small>
                        </div>
                        <Progress
                           value={80}
                           color="main"
                           className="h-2"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between py-2">
                           <small className="text-[#979797]">
                              Neutral Reviews
                           </small>
                           <small className="text-[#979797]">17%</small>
                        </div>
                        <Progress
                           value={17}
                           color="neutral"
                           className="h-2"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between py-2">
                           <small className="text-[#979797]">
                              Negative Reviews
                           </small>
                           <small className="text-[#979797]">3%</small>
                        </div>
                        <Progress
                           value={3}
                           color="destructive"
                           className="h-2"
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
         </div>

         <div className="flex gap-6 pb-4 flex-wrap">
            <div className="border p-4 md:p-6 rounded-[8px] flex gap-4 items-end">
               <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                     <small className="font-bold">Visitors Overview</small>
                     <small className="text-[#979797]">Aug 25- Sep 25 </small>
                  </div>
                  <div className="flex flex-col">
                     <small className="font-bold">Compain</small>
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
               />
               <div className="flex flex-col gap-2">
                  <Image
                     src={admin2}
                     alt="views"
                  />
                  <p>1 5.980</p>
                  <small>Page Views</small>
               </div>
               <div className="flex flex-col gap-2">
                  <Image
                     src={admin3}
                     alt="views"
                  />
                  <p>4.324</p>
                  <small>Contacted</small>
               </div>
               <div className="flex flex-col gap-2">
                  <p>12</p>
                  <small>Advertisement</small>
               </div>
               <div className="flex flex-col gap-2">
                  <p>4</p>
                  <small>Campaigns</small>
               </div>
               <div className="flex flex-col gap-2">
                  <p>12,499</p>
                  <small>Emails Sent</small>
               </div>
            </div>

            <div className="border p-6 md:p-10 flex flex-col gap-4 rounded-[20px] w-full sm:w-5/6 md:w-[280px]">
               <p className="text-[#979797] md:text-[16px]">PENDING APPROVALS</p>
               <h1>5,000</h1>
               <small className="text-[#979797]">
                  <span className="text-main mr-2">+3%</span> since last week
               </small>
            </div>
         </div>
      </div>
   );
};

export default AdminHome;
