/** @format */
"use client";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import LineChartComponent from "@/components/LineChart";
import AreaChartComponent from "@/components/AreaChartComponent";

const cardData: CardProps[] = [
   {
      label: "Total Revenue",
      amount: "$45,231.89",
      discription: "+20.1% from last month",
      icon: DollarSign,
   },
   {
      label: "Subscriptions",
      amount: "+2350",
      discription: "+180.1% from last month",
      icon: Users,
   },
   {
      label: "Sales",
      amount: "+12,234",
      discription: "+19% from last month",
      icon: CreditCard,
   },
   {
      label: "Active Now",
      amount: "+573",
      discription: "+201 since last hour",
      icon: Activity,
   },
];

export default function Dashboard() {
   return (
      <div className="flex flex-col gap-5  w-full  pr-10">
         <h2>Dashboard</h2>
         <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardContent>
               <p className="p-4 font-semibold">Transaction Rate</p>

               <BarChart />
            </CardContent>
            <CardContent>
               <p className="p-4 font-semibold">Total fees</p>

               <PieChart />
            </CardContent>
            <CardContent>
               <p className="p-4 font-semibold">Cash-in Account</p>

               <LineChartComponent />
            </CardContent>
            <CardContent>
               <p className="p-4 font-semibold">Cash-out Account</p>

               <AreaChartComponent />
            </CardContent>
         </section>
      </div>
   );
}
