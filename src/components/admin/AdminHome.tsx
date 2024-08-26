"use client"
import React , { useState , useEffect} from "react";
import { Button } from "../ui/button";
import {
   ArrowDown,
   ArrowUp,
   Download,
   Eye,
   Plus,
   Star,
   User,
   ViewIcon,
} from "lucide-react";
import {  AdminVisitorsChart } from "./AdminVisitorsChart";
import { AdminBarChart} from "./AdminBarChart";
import { AdminToolsChart } from "./AdminToolsChart";
import { HealthChart } from "./HealthChart";
import { getAllUsers } from "@/lib/api-calls/admin";
import { getNewUsers, getPageVisits } from "@/lib/api-calls/analytics";

const AdminHome = () => {

   const [ users , setUsers]=  useState([]);
   const [ pageviews , setPageViews ] = useState(0);
   const [ newUsers , setNewUsers] = useState(0);

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

      const fetchAnalyticsData = async() => {
         try{
            const pageVisitsData = await getPageVisits();
            console.log("Here are the page visits tracked", pageVisitsData)
            setPageViews(pageVisitsData.length ? pageVisitsData[0].metricValues[0].value : 0)

            const newUsersData = await getNewUsers();
            console.log("Here are all users that signed up: ", newUsers);
            setNewUsers(newUsersData.length ? newUsersData[0].metricValues[0].value : 0);
         }catch(error: any){
            console.log("Error while fetching analytics data: ", error);
         }
      }

      fetchAnalyticsData();
      getAll();
   }, [])

   
   return (
      <div className="p-4">
         <div className="mb-6 flex flex-col lg:flex-row md:justify-between gap-4">
            <div>
               <h2>Welcome back, Admin</h2>
               <p>You should see what's happening on the site today</p>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
               <Button className="w-fit">
                  Export data <ArrowDown/>
               </Button>
               <Button className="bg-main w-fit">Create report</Button>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border p-4 rounded-md flex flex-col gap-4">
               <div className="flex justify-between">
                  <span className="flex gap-1 items-center">
                     <Eye />
                     Pageviews
                  </span>
                  <span>...</span>
               </div>
               <p className="flex items-center gap-1 text-2xl font-semibold">
                  {pageviews}
                  <small className="text-main p-1 flex items-center">
                     28.4% <ArrowUp />
                  </small>
               </p>
            </div>
            <div className="border p-4 rounded-md flex flex-col gap-4">
               <div className="flex justify-between">
                  <span className="flex gap-1 items-center">
                     <User />
                     Monthly users
                  </span>
                  <span>...</span>
               </div>
               <p className="flex items-center gap-1 text-2xl font-semibold">
                  23.6K
                  <small className="text-destructive px-1 flex items-center text-sm bg-red-200 rounded-lg">
                     12.6% <ArrowDown />
                  </small>
               </p>
            </div>
            <div className="border p-4 rounded-md flex flex-col gap-4">
               <div className="flex justify-between">
                  <span className="flex gap-1 items-center">
                     <Plus />
                     New sign ups
                  </span>
                  <span>...</span>
               </div>
               <p className="flex items-center gap-1 text-2xl font-semibold">
                  756
                  <small className="text-main p-1 flex items-center">
                     3.1% <ArrowUp />
                  </small>
               </p>
            </div>
            <div className="border p-4 rounded-md flex flex-col gap-4">
               <div className="flex justify-between">
                  <span className="flex gap-1 items-center">
                     <Star />
                     Pending approvals
                  </span>
                  <span>...</span>
               </div>
               <p className="flex items-center gap-1 text-2xl font-semibold">
                  2.3K
                  <small className="text-main px-1 flex items-center text-sm bg-green-200 rounded-lg">
                     11.3% <ArrowUp />
                  </small>
               </p>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-6 my-6">
            <div className="p-6 border rounded-lg flex flex-col gap-4 md:w-full lg:w-1/2">
               <div className="flex justify-between items-center">
                  <small>Website Visitors</small>
                  <Button >
                     Export
                     <ArrowDown />
                  </Button>
               </div>
               <AdminVisitorsChart/>
            </div>
            <div className="p-6 border rounded-lg flex flex-col gap-4 lg:w-[80%]">
               <small>Users overview</small>
               <AdminBarChart />
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="my-6 flex flex-col md:flex-row md:justify-between gap-4">
               <div>
                  <h3>Reports overview</h3>
                  <Button className="my-2">Select date</Button>
               </div>
               <div className="flex gap-4 flex-col md:flex-row">
                  <Button className="w-fit">
                     Export data <ArrowDown/>
                  </Button>
                  <Button className="bg-main w-fit">Create report</Button>
               </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
               <div className="p-6 border rounded-lg flex flex-col lg:w-1/2">
                  <AdminToolsChart />
               </div>
               <div className="p-6 border rounded-lg flex flex-col lg:w-1/2">
                  <span>Website Health</span>
                  <HealthChart />
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminHome;
