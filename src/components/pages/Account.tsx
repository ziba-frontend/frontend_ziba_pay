//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
   useFetchUserProfile,
   useLogout,
   useUpdateProfile,
} from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import {
   Card,
   CardContent,
   CardHeader,
   CardFooter,
   CardDescription,
} from "@/components/ui/card";
import {
   User,
   Settings,
   LogOut,
   Briefcase,
   Mail,
   MapPin,
   PhoneCall,
   Save,
   X,
   CreditCard,
   BarChart2,
   ExternalLink,
   FileText,
   Code,
   DollarSign,
   TrendingUp,
   ChevronRight,
   BookOpen,
   ToggleLeft,
   Github,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserProfile {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   businessName?: string;
   businessType?: string;
   country?: string;
   phoneNumber?: Array<{ number: string }>;
}

// Mock data for transactions and stats
const mockTransactions = [
   {
      id: "tr_123456",
      amount: 1250.0,
      status: "completed",
      date: "2025-03-28",
      paymentMethod: "card",
   },
   {
      id: "tr_123457",
      amount: 799.5,
      status: "completed",
      date: "2025-03-25",
      paymentMethod: "bank",
   },
   {
      id: "tr_123458",
      amount: 350.0,
      status: "pending",
      date: "2025-03-30",
      paymentMethod: "card",
   },
];

const mockStats = {
   totalTransactions: 76,
   successRate: 98.2,
   totalVolume: 12750.5,
   thisMonth: 4950.75,
   lastMonth: 3840.25,
   growthRate: 28.9,
};

const Account = () => {
  const { data: user, isLoading } = useFetchUserProfile({
    // Force refetch when navigating to the account page
    enabled: true,
    // You might want to keep a reasonable staleTime to avoid too many requests
    staleTime: 60000 // 1 minute
  });
   const updateProfileMutation = useUpdateProfile();
   const logoutMutation = useLogout();
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState<Partial<UserProfile>>({});
   const [isDeveloper, setIsDeveloper] = useState(false);
   const [activeTab, setActiveTab] = useState("profile");

   const handleLogout = async () => {
      try {
         await logoutMutation.mutateAsync();
         toast.success("Logged out successfully");
      } catch {
         toast.error("Failed to logout");
      }
   };

   const handleEditToggle = () => {
      if (isEditing) {
         setIsEditing(false);
         // Reset form data if canceling
         setFormData({});
      } else {
         setIsEditing(true);
         // Initialize form data with current user data
         setFormData({
            firstName: user?.firstName,
            lastName: user?.lastName,
            businessName: user?.businessName || "",
            businessType: user?.businessType || "",
            country: user?.country || "",
         });
      }
   };

   console.log("Mana mfasha kbx", user);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSelectChange = (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSaveChanges = async () => {
      try {
         await updateProfileMutation.mutateAsync(formData);
         setIsEditing(false);
      } catch (error) {
         toast.error("Failed to update profile");
      }
   };

   if (isLoading) {
      return <ProfileSkeleton />;
   }

   return (
      <div className="w-full mx-auto pt-6">
         <Tabs
            defaultValue="profile"
            onValueChange={setActiveTab}
            className="mb-6"
         >
            <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="profile">Profile</TabsTrigger>
               <TabsTrigger value="transactions">Transactions</TabsTrigger>
               <TabsTrigger value="stats">Stats</TabsTrigger>
               <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent
               value="profile"
               className="space-y-6 mt-6"
            >
               <div className="flex items-center justify-between mb-6 flex-col gap-6 sm:flex-row">
                  <div className="flex items-center gap-3">
                     <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                        {user?.firstName?.charAt(0) || "?"}
                     </div>
                     <div>
                        <h1 className="text-2xl font-bold">
                           {user?.firstName} {user?.lastName}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                           {user?.email}
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button
                        variant={isEditing ? "secondary" : "outline"}
                        size="sm"
                        onClick={handleEditToggle}
                        className="flex items-center gap-1"
                     >
                        {isEditing ? <X size={16} /> : <Settings size={16} />}
                        <span className="hidden sm:inline">
                           {isEditing ? "Cancel" : "Edit Profile"}
                        </span>
                     </Button>
                     {isEditing ? (
                        <Button
                           variant="default"
                           size="sm"
                           onClick={handleSaveChanges}
                           disabled={updateProfileMutation.isPending}
                           className="flex items-center gap-1"
                        >
                           <Save size={16} />
                           <span className="hidden sm:inline">
                              Save Changes
                           </span>
                        </Button>
                     ) : (
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={handleLogout}
                           className="flex items-center gap-1 text-destructive"
                        >
                           <LogOut size={16} />
                           <span className="hidden sm:inline">Logout</span>
                        </Button>
                     )}
                  </div>
               </div>

               <Card className="mb-6">
                  <CardHeader className="border-b pb-3">
                     <h2 className="text-lg font-semibold flex items-center gap-2">
                        <User size={18} /> Personal Information
                     </h2>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                     {isEditing ? (
                        <>
                           <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                 id="firstName"
                                 name="firstName"
                                 value={formData.firstName || ""}
                                 onChange={handleInputChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                 id="lastName"
                                 name="lastName"
                                 value={formData.lastName || ""}
                                 onChange={handleInputChange}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="country">Country</Label>
                              <Select
                                 value={formData.country || ""}
                                 onValueChange={(value) =>
                                    handleSelectChange("country", value)
                                 }
                              >
                                 <SelectTrigger
                                    id="country"
                                    className="w-full"
                                 >
                                    <SelectValue placeholder="Select a country" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="">
                                       Select a country
                                    </SelectItem>
                                    <SelectItem value="USA">
                                       United States
                                    </SelectItem>
                                    <SelectItem value="UK">
                                       United Kingdom
                                    </SelectItem>
                                    <SelectItem value="Canada">
                                       Canada
                                    </SelectItem>
                                    <SelectItem value="Australia">
                                       Australia
                                    </SelectItem>
                                    <SelectItem value="Germany">
                                       Germany
                                    </SelectItem>
                                    <SelectItem value="France">
                                       France
                                    </SelectItem>
                                    <SelectItem value="Japan">Japan</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                 Full Name
                              </p>
                              <p className="font-medium">
                                 {user?.firstName} {user?.lastName}
                              </p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                 Email Address
                              </p>
                              <p className="font-medium flex items-center gap-1">
                                 <Mail
                                    size={16}
                                    className="text-muted-foreground"
                                 />
                                 {user?.email}
                              </p>
                           </div>
                           {user?.country && (
                              <div className="space-y-1">
                                 <p className="text-sm text-muted-foreground">
                                    Country
                                 </p>
                                 <p className="font-medium flex items-center gap-1">
                                    <MapPin
                                       size={16}
                                       className="text-muted-foreground"
                                    />
                                    {user?.country}
                                 </p>
                              </div>
                           )}
                           {user?.phoneNumber?.length > 0 && (
                              <div className="space-y-1">
                                 <p className="text-sm text-muted-foreground">
                                    Phone Number
                                 </p>
                                 <p className="font-medium flex items-center gap-1">
                                    <PhoneCall
                                       size={16}
                                       className="text-muted-foreground"
                                    />
                                    {user?.phoneNumber[0]?.number}
                                 </p>
                              </div>
                           )}
                        </>
                     )}
                  </CardContent>
               </Card>

               <Card className="mb-6">
                  <CardHeader className="border-b pb-3">
                     <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Briefcase size={18} /> Business Information
                     </h2>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                     {isEditing ? (
                        <>
                           <div className="space-y-2">
                              <Label htmlFor="businessName">
                                 Business Name
                              </Label>
                              <Input
                                 id="businessName"
                                 name="businessName"
                                 value={formData.businessName || ""}
                                 onChange={handleInputChange}
                                 placeholder="Enter business name"
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="businessType">
                                 Business Type
                              </Label>
                              <Select
                                 value={formData.businessType || ""}
                                 onValueChange={(value) =>
                                    handleSelectChange("businessType", value)
                                 }
                              >
                                 <SelectTrigger
                                    id="businessType"
                                    className="w-full"
                                 >
                                    <SelectValue placeholder="Select business type" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="">
                                       Select business type
                                    </SelectItem>
                                    <SelectItem value="Retail">
                                       Retail
                                    </SelectItem>
                                    <SelectItem value="Technology">
                                       Technology
                                    </SelectItem>
                                    <SelectItem value="Healthcare">
                                       Healthcare
                                    </SelectItem>
                                    <SelectItem value="Finance">
                                       Finance
                                    </SelectItem>
                                    <SelectItem value="Education">
                                       Education
                                    </SelectItem>
                                    <SelectItem value="Real Estate">
                                       Real Estate
                                    </SelectItem>
                                    <SelectItem value="Hospitality">
                                       Hospitality
                                    </SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                 Business Name
                              </p>
                              <p className="font-medium">
                                 {user?.businessName || "Not provided"}
                              </p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                 Business Type
                              </p>
                              <p className="font-medium">
                                 {user?.businessType || "Not provided"}
                              </p>
                           </div>
                        </>
                     )}
                  </CardContent>
                  {isEditing && (
                     <CardFooter className="flex justify-end gap-2 pt-4 border-t mt-6">
                        <Button
                           variant="outline"
                           onClick={handleEditToggle}
                        >
                           Cancel
                        </Button>
                        <Button
                           onClick={handleSaveChanges}
                           disabled={updateProfileMutation.isPending}
                        >
                           {updateProfileMutation.isPending
                              ? "Saving..."
                              : "Save Changes"}
                        </Button>
                     </CardFooter>
                  )}
               </Card>

               {/* Payment Methods Section */}
               <Card className="mb-6">
                  <CardHeader className="border-b pb-3">
                     <h2 className="text-lg font-semibold flex items-center gap-2">
                        <CreditCard size={18} /> Payment Methods
                     </h2>
                     <CardDescription>
                        Methods you've enabled to receive payments from
                        customers
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-md">
                                 <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                 <p className="font-medium">
                                    Credit & Debit Cards
                                 </p>
                                 <p className="text-sm text-muted-foreground">
                                    Accept Visa, Mastercard, Amex
                                 </p>
                              </div>
                           </div>
                           <Switch checked={true} />
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-md">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 rounded-md">
                                 <DollarSign className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                 <p className="font-medium">Bank Transfers</p>
                                 <p className="text-sm text-muted-foreground">
                                    ACH and wire transfers
                                 </p>
                              </div>
                           </div>
                           <Switch checked={true} />
                        </div>
                     </div>

                     <div className="mt-4 text-sm text-muted-foreground">
                        <p>
                           Transaction fee: 2.9% + $0.30 per successful card
                           charge
                        </p>
                        <p>Bank transfers: 0.8% (capped at $5.00)</p>
                     </div>
                  </CardContent>
               </Card>

               {/* Developer Resources Section */}
               <Card>
                  <CardHeader className="border-b pb-3">
                     <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                           <Code size={18} /> Developer Resources
                        </h2>
                        <div className="flex items-center gap-2">
                           <span className="text-sm text-muted-foreground">
                              I'm a developer
                           </span>
                           <Switch
                              checked={isDeveloper}
                              onCheckedChange={setIsDeveloper}
                           />
                        </div>
                     </div>
                     <CardDescription>
                        {isDeveloper
                           ? "Access API keys, documentation and integration resources"
                           : "Enable developer mode to access API documentation and tools"}
                     </CardDescription>
                  </CardHeader>
                  {isDeveloper ? (
                     <CardContent className="pt-6">
                        <div className="space-y-6">
                           <div className="border rounded-md p-4 bg-slate-50">
                              <div className="flex justify-between items-center mb-2">
                                 <h3 className="font-medium">API Keys</h3>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                 >
                                    Create new key
                                 </Button>
                              </div>
                              <div className="space-y-3">
                                 <div className="flex justify-between items-center text-sm border-b pb-2">
                                    <div className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                                       pk_test_51ABC...XYZ
                                    </div>
                                    <span className="text-green-600 font-medium">
                                       Test
                                    </span>
                                 </div>
                                 <div className="flex justify-between items-center text-sm">
                                    <div className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                                       pk_live_51DEF...UVW
                                    </div>
                                    <span className="text-blue-600 font-medium">
                                       Live
                                    </span>
                                 </div>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Button
                                 variant="outline"
                                 className="justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <BookOpen size={16} />
                                    <span>API Documentation</span>
                                 </div>
                                 <ExternalLink size={14} />
                              </Button>
                              <Button
                                 variant="outline"
                                 className="justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <Github size={16} />
                                    <span>Code Samples</span>
                                 </div>
                                 <ExternalLink size={14} />
                              </Button>
                           </div>

                           <div className="border rounded-md p-4">
                              <h3 className="font-medium mb-2">
                                 Webhook Configuration
                              </h3>
                              <div className="space-y-3">
                                 <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="webhookUrl">
                                       Webhook URL
                                    </Label>
                                    <div className="flex">
                                       <Input
                                          id="webhookUrl"
                                          placeholder="https://your-domain.com/webhook"
                                       />
                                       <Button className="ml-2">Save</Button>
                                    </div>
                                 </div>
                                 <div className="text-sm text-muted-foreground">
                                    We'll send notifications to this URL when
                                    events occur in your account.
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  ) : (
                     <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground mb-4">
                           Turn on developer mode to access API keys,
                           documentation, and integration tools
                        </p>
                        <Button onClick={() => setIsDeveloper(true)}>
                           Enable Developer Mode
                        </Button>
                     </CardContent>
                  )}
               </Card>
            </TabsContent>

            <TabsContent
               value="transactions"
               className="space-y-6 mt-6"
            >
               <Card>
                  <CardHeader>
                     <h2 className="text-lg font-semibold">
                        Recent Transactions
                     </h2>
                     <CardDescription>
                        Your most recent payment transactions
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {mockTransactions.map((transaction) => (
                           <div
                              key={transaction.id}
                              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                           >
                              <div className="flex items-center gap-3">
                                 <div
                                    className={`p-2 rounded-md ${
                                       transaction.paymentMethod === "card"
                                          ? "bg-purple-100"
                                          : "bg-green-100"
                                    }`}
                                 >
                                    {transaction.paymentMethod === "card" ? (
                                       <CreditCard
                                          className={`h-4 w-4 ${
                                             transaction.paymentMethod ===
                                             "card"
                                                ? "text-purple-600"
                                                : "text-green-600"
                                          }`}
                                       />
                                    ) : (
                                       <DollarSign className="h-4 w-4 text-green-600" />
                                    )}
                                 </div>
                                 <div>
                                    <p className="font-medium">
                                       ${transaction.amount.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       {new Date(
                                          transaction.date
                                       ).toLocaleDateString()}{" "}
                                       • {transaction.id}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                       transaction.status === "completed"
                                          ? "bg-green-100 text-green-600"
                                          : "bg-yellow-100 text-yellow-600"
                                    }`}
                                 >
                                    {transaction.status}
                                 </span>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                 >
                                    <ChevronRight className="h-4 w-4" />
                                 </Button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-center">
                     <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                     >
                        View All Transactions
                     </Button>
                  </CardFooter>
               </Card>
            </TabsContent>

            <TabsContent
               value="stats"
               className="space-y-6 mt-6"
            >
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                     <CardHeader className="pb-2">
                        <CardDescription>Total Volume</CardDescription>
                        <h3 className="text-2xl font-bold">
                           ${mockStats.totalVolume.toLocaleString()}
                        </h3>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                           <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                           <span className="text-green-500 font-medium">
                              {mockStats.growthRate}%
                           </span>
                           <span className="ml-1">from last month</span>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader className="pb-2">
                        <CardDescription>Success Rate</CardDescription>
                        <h3 className="text-2xl font-bold">
                           {mockStats.successRate}%
                        </h3>
                     </CardHeader>
                     <CardContent>
                        <Progress
                           value={mockStats.successRate}
                           className="h-2"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                           {mockStats.totalTransactions} transactions processed
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader className="pb-2">
                        <CardDescription>Monthly Comparison</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-2">
                           <div className="flex justify-between items-center">
                              <span className="text-sm">This Month</span>
                              <span className="font-medium">
                                 ${mockStats.thisMonth.toLocaleString()}
                              </span>
                           </div>
                           <Progress
                              value={
                                 (mockStats.thisMonth /
                                    (mockStats.thisMonth +
                                       mockStats.lastMonth)) *
                                 100
                              }
                              className="h-2"
                           />
                           <div className="flex justify-between items-center">
                              <span className="text-sm">Last Month</span>
                              <span className="font-medium">
                                 ${mockStats.lastMonth.toLocaleString()}
                              </span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <Card>
                  <CardHeader>
                     <h2 className="text-lg font-semibold">
                        Payment Method Distribution
                     </h2>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <div className="flex justify-between">
                              <span>Credit Card</span>
                              <span>68%</span>
                           </div>
                           <Progress
                              value={68}
                              className="h-2"
                           />
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between">
                              <span>Bank Transfer</span>
                              <span>32%</span>
                           </div>
                           <Progress
                              value={32}
                              className="h-2"
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent
               value="settings"
               className="space-y-6 mt-6"
            >
               <Card>
                  <CardHeader>
                     <h2 className="text-lg font-semibold">
                        Account Preferences
                     </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">Email Notifications</p>
                           <p className="text-sm text-muted-foreground">
                              Receive emails about transactions, system updates
                           </p>
                        </div>
                        <Switch checked={true} />
                     </div>
                     <Separator />
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">
                              Two-Factor Authentication
                           </p>
                           <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                           </p>
                        </div>
                        <Button
                           variant="outline"
                           size="sm"
                        >
                           Enable
                        </Button>
                     </div>
                     <Separator />
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">Developer Mode</p>
                           <p className="text-sm text-muted-foreground">
                              Access API keys and developer resources
                           </p>
                        </div>
                        <Switch
                           checked={isDeveloper}
                           onCheckedChange={setIsDeveloper}
                        />
                     </div>
                  </CardContent>
               </Card>

               {/* <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            </CardHeader>
            <CardContent className="space-y-4 flex gap-6 items-center">
              <Button variant="outline" className="border-destructive text-destructive">
                Reset API Keys
              </Button>
              <Button variant="destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card> */}
            </TabsContent>
         </Tabs>
      </div>
   );
};

const ProfileSkeleton = () => (
   <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
         <Skeleton className="h-12 w-12 rounded-full" />
         <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
         </div>
      </div>

      <Skeleton className="h-64 w-full mb-6 rounded-lg" />
      <Skeleton className="h-48 w-full rounded-lg" />
   </div>
);

export default Account;
