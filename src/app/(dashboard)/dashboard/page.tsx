/** @format */

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";

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

const uesrSalesData: SalesProps[] = [
   {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      saleAmount: "+$1,999.00",
   },
   {
      name: "Jackson Lee",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$1,999.00",
   },
   {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$39.00",
   },
   {
      name: "William Kim",
      email: "will@email.com",
      saleAmount: "+$299.00",
   },
   {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      saleAmount: "+$39.00",
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

               <BarChart />
            </CardContent>
            <CardContent>
               <p className="p-4 font-semibold">Cash-in Account</p>

               <BarChart />
            </CardContent>
            <CardContent>
               <p className="p-4 font-semibold">Cash-out Account</p>

               <BarChart />
            </CardContent>
         </section>
      </div>
   );
}
