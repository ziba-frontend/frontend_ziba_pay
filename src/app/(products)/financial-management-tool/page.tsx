import React from "react";
import Image from "next/image";
import rect from "../../../../public/images/rect1.png";
import fin1 from "../../../../public/images/fin1.png";
import fin2 from "../../../../public/images/fin2.png";
import fin3 from "../../../../public/images/fin3.png";
import fin4 from "../../../../public/images/fin4.png";
import fin5 from "../../../../public/images/fin5.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";


export const metadata: Metadata = {
   title: "Financial Management Tool",
   description: "Optimize finances with Zibapay's comprehensive financial management tool.",
};

const FinancialManagement = () => {
   return (
      <div className="my-20">
         <div className="flex flex-col items-center md:items-start justify-center gap-6 md:flex-row container">
            <div className="w-full md:w-1/2">
               <h1 className=" mb-4">
                  Gain better control over your finances and make informed
                  decisions with our suite of financial management tools.{" "}
               </h1>
               <p>
                  Whether you&apos;re a small business or a large enterprise,
                  Ziba Pay provides the tools you need to manage your finances
                  effectively.
               </p>
            </div>
            <Image
               src={fin1}
               alt="ziba"
               width={500}
               className="md:w-[400px]  2xl:w-[600px]"
            />
         </div>

         <div className="bg-br pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10">
               <h2 className="text-center my-6">Features</h2>
               <div className="flex flex-col items-center justify-center gap-20 md:flex-row py-16 container ">
                  <Image
                     src={fin2}
                     alt="ziba pay"
                     width={400}
                  />
                  <div className="md:w-1/2">
                     <h2 className="my-2">Expense Tracking</h2>
                     <p>
                        Track your expenses easily and efficiently with Ziba
                        Pay&apos;s intuitive expense tracking feature.
                        Categorize expenses, set budgets, and monitor spending
                        trends to stay on top of your financial health.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex flex-col items-center justify-center  gap-6 md:flex-row container py-10 md:py-20">
            <div className="w-full sm:w-5/6 md:w-1/2">
               <h1 className=" mb-4">Budgeting Tools</h1>
               <p>
                  Take control of your finances and plan for the future with
                  Ziba Pay&apos;s powerful budgeting tools. Set customizable
                  budgets for various expense categories, track progress, and
                  receive alerts when you&apos;re nearing your limits.
               </p>
            </div>
            <Image
               src={fin3}
               alt="ziba"
               width={400}
            />
         </div>

         <div className="bg-br pt-40 relative mt-10">
            <Image
               src={rect}
               alt="ziba pay"
               className="absolute left-0 top-0 w-full"
            />
            <div className="mt-10 pb-6">
               <div className="flex flex-col items-center justify-center gap-20 md:flex-row py-6 container">
                  <Image
                     src={fin4}
                     alt="ziba pay"
                     className="w-[400px]"
                  />
                  <div className="">
                     <h3 className="my-2">Reporting and Analytics</h3>
                     <p>
                        Gain valuable insights into your financial performance
                        with Ziba Pay&apos;s robust reporting and analytics
                        capabilities. Generate detailed reports, visualize data
                        trends, and make data-driven decisions to drive business
                        growth.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="py-10 md:py-40">
            <div className=" flex  container flex-col items-center md:items-start  justify-center gap-6 md:flex-row">
               <Image
                  src={fin5}
                  alt="ziba pay"
                  className="sm:w-[300px] lg:w-[468px]"
               />
               <div className="">
                  <h2 className="my-4">
                     Ready to take control of your finances? Sign up for Ziba
                     Pay now and unlock a suite of powerful financial management
                     tools to streamline your operations and drive success.
                  </h2>

                  <Button className="w-[120px] sm:w-[130px] p-6">
                     <Link href="/sign-up">Create Account</Link>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FinancialManagement;
