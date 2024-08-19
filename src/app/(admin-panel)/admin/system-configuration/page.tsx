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

const Page = () => {
  return (
    <div className="p-4">
      <h2 className="mb-6">System Configuration</h2>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full bg-transparent">
          <TabsTrigger 
            value="payment" 
            className="w-full text-center data-[state=active]:border-b-2 data-[state=active]:border-main ">
            1. Payment Gateway Settings
          </TabsTrigger>
          <TabsTrigger 
            value="transaction" 
            className="w-full text-center data-[state=active]:border-b-2 data-[state=active]:border-main ">
            2. Transaction Limit
          </TabsTrigger>
          <TabsTrigger 
            value="integration" 
            className="w-full text-center data-[state=active]:border-b-2 data-[state=active]:border-main ">
            3. Third Party Integration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment" className="w-full mt-4">
          <h4>Manage your system settings</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
        </TabsContent>
        
        <TabsContent value="transaction" className="w-full mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration" className="w-full mt-4">
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
