import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import { CloudUpload, Settings } from "lucide-react";
import intuit from "../../../../../public/images/intuit.png";
import bigcommerce from "../../../../../public/images/bigcommerce.png";
import netsuite from "../../../../../public/images/netsuite.png";
import mailchimp from "../../../../../public/images/mailchimp.png";
import excel from "../../../../../public/images/excel.png";
import salesforce from "../../../../../public/images/salesforce.png";
import { FaPlus } from "react-icons/fa";

const Page = () => {
  return (
    <div className="p-4">
      <h2 className="mb-6">System Configuration</h2>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full bg-transparent sm:pb-10 border-b pb-[120px]">
          <TabsTrigger 
            value="payment" 
            className="flex-1 p-2 text-center relative data-[state=active]:after:w-1/2 data-[state=active]:after:left-1/4 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-main">
            1. Payment Gateway Settings
          </TabsTrigger>
          <TabsTrigger 
            value="transaction" 
            className="flex-1 p-2 text-center relative data-[state=active]:after:w-1/2 data-[state=active]:after:left-1/4 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-main">
            2. Transaction Limit
          </TabsTrigger>
          <TabsTrigger 
            value="integration" 
            className="flex-1 p-2 text-center relative data-[state=active]:after:w-1/2 data-[state=active]:after:left-1/4 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-main">
            3. Third Party Integration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment" className="w-full mt-4 pt-10">
          <h4>Manage your system settings</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <p>Payment Gateway Settings Panel</p>
              <div className="border p-4 flex flex-col gap-4 shadow-md rounded-lg">
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
              <div className="border p-4 flex flex-col gap-4 shadow-md rounded-lg">
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
              <div className="border p-4 flex flex-col gap-4 shadow-md rounded-lg">
             <div className="flex justify-between items-end p-4 border rounded-lg">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                Service Name
              </div>
              <div className="flex items-end gap-2">
                <small className="text-main">Configure</small>
                <small className="text-destructive">Disconnect</small>
              </div>
             </div>
             <div className="flex justify-between items-end p-4 border rounded-lg">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                Service Name
              </div>
              <div className="flex items-end gap-2">
                <small className="text-main">Configure</small>
                <small className="text-destructive">Disconnect</small>
              </div>
             </div>
             <div className="flex justify-between items-end p-4 border rounded-lg">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                Service Name
              </div>
              <div className="flex items-end gap-2">
                <small className="text-main">Configure</small>
                <small className="text-destructive">Disconnect</small>
              </div>
             </div>
             <div className="flex justify-between items-end p-4 border rounded-lg">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                Service Name
              </div>
              <div className="flex items-end gap-2">
                <small className="text-main">Configure</small>
                <small className="text-destructive">Disconnect</small>
              </div>
             </div>
                <Button className="bg-main w-fit px-6 text-white"><FaPlus className="mr-2"/>Add Integration</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transaction" className="w-full mt-4 pt-10">
       <h4>Transaction limit</h4>
        </TabsContent>
        
        <TabsContent value="integration" className="w-full mt-4 pt-10">
          <h2>Integrations</h2>
          <p className="my-2">
            Select and connect tools you use to integrate with your workflow
          </p>
          <Button className="bg-main my-4">
            All Integrations
            <span className="text-xl font-bold bg-white rounded-[12px] px-3 text-main ml-2">
              6
            </span>
          </Button>

          <div className="border rounded-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 shadow-lg">
            <div className="border p-4 flex flex-col gap-4 border-t-transparent border-l-transparent">
              <Image src={intuit} alt="integ" />
              <h3>Intuit Quickbooks</h3>
              <p>
                QuickBooks is an accounting software package developed and
                marketed by Intuit
              </p>
              <div className="flex gap-4 items-end">
                <Button className="bg-transparent shadow-md border text-black">
                  Connect
                  <CloudUpload className="ml-2" />
                </Button>
                <small className="text-destructive">Disconnect</small>
              </div>
            </div>
            <div className="border p-4 flex flex-col gap-4">
              <Image src={bigcommerce} alt="integ" />
              <h3>BigCommerce</h3>
              <p>
              BigCommerce is a leading e-commerce software platform that provides startups and established companies
              </p>
              <div className="flex gap-4 items-end">
                <Button className="bg-transparent shadow-md border text-black">
                  Connect
                  <CloudUpload className="ml-2" />
                </Button>
                <small className="text-destructive">Disconnect</small>
              </div>
            </div>
            <div className="border p-4 flex flex-col gap-4">
              <Image src={netsuite} alt="integ" />
              <h3>NetSuite</h3>
              <p>
              Make smarter, faster decisions using the world's most deployed cloud ERP solution.
              </p>
              <div className="flex gap-4 items-end">
                <Button className="bg-main shadow-md  white">
                  Connected
                  <Settings className="ml-2" />
                </Button>
                <small className="text-destructive">Disconnect</small>
              </div>
            </div>
            <div className="border p-4 flex flex-col gap-4">
              <Image src={mailchimp} alt="integ" />
              <h3>Mailchimp</h3>
              <p>
              Mailchimp makes it easy to sell stuff online, even if you don't have an e-commerce store.
              </p>
              <div className="flex gap-4 items-end">
                <Button className="bg-transparent shadow-md border text-black">
                  Connect
                  <CloudUpload className="ml-2" />
                </Button>
                <small className="text-destructive">Disconnect</small>
              </div>
            </div>
            <div className="border p-4 flex flex-col gap-4">
              <Image src={excel} alt="integ" />
              <h3>Microsoft Excel</h3>
              <p>
              Excel learns your patterns, organizing your data to save you time.
              </p>
              <div className="flex gap-4 items-end">
                <Button className="bg-transparent shadow-md border text-black">
                  Connect
                  <CloudUpload className="ml-2" />
                </Button>
                <small className="text-destructive">Disconnect</small>
              </div>
            </div>
            <div className="border p-4 flex flex-col gap-4 border-b-transparent border-r-transparent">
              <Image src={salesforce} alt="integ" />
              <h3>Salesforce</h3>
              <p>
              Salesforce offers a wide variety of CRM categories and systems to meet your needs, including Sales Cloud,
              </p>
              <div className="flex gap-4 items-end">
                <Button className="bg-transparent shadow-md border text-black">
                  Connect
                  <CloudUpload className="ml-2" />
                </Button>
                <small className="text-destructive">Disconnect</small>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
