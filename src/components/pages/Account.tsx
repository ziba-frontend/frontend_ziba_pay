//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
   useFetchUserProfile,
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
   ShoppingBag,
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
import { useGetOrdersByUserId } from "@/hooks/usePayment";
import { formatCurrency } from "@/utils/transaction";

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

// Status badge component
const StatusBadge = ({ status }) => {
  const getColor = () => {
    switch(status.toUpperCase()) {
      case "SUCCEEDED":
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "CANCELLED": 
      case "FAILED": return "bg-red-100 text-red-800";
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      {status}
    </span>
  );
};

const PaymentMethodBadge = ({ method }) => {
  const getColor = () => {
    switch(method) {
      case "CARD": return "bg-purple-100 text-purple-800";
      case "BANK": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      {method}
    </span>
  );
};

const Account = () => {
  const { data: user, isLoading } = useFetchUserProfile({
    enabled: true,
    staleTime: 60000
  });
  const { data: orders, isLoading: ordersLoading } = useGetOrdersByUserId();
   const updateProfileMutation = useUpdateProfile();
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState<Partial<UserProfile>>({});
   const [isDeveloper, setIsDeveloper] = useState(false);
   const [activeTab, setActiveTab] = useState("profile");

   const handleEditToggle = () => {
      if (isEditing) {
         setIsEditing(false);
         setFormData({});
      } else {
         setIsEditing(true);
         setFormData({
            firstName: user?.firstName,
            lastName: user?.lastName,
            businessName: user?.businessName || "",
            businessType: user?.businessType || "",
            country: user?.country || "",
         });
      }
   };

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

   // Format orders for the transactions table (only 5 most recent)
   const recentOrders = orders?.slice(0, 5).map(order => ({
      id: order.reference || order.id || order._id,
      customer: order.customer?.firstname ? `${order.customer.firstname} ${order.customer.lastname}` : "Customer",
      product: order.description || "Product Purchase",
      paymentMethod: order.cardPayment ? "CARD" : "BANK",
      amount: parseFloat(order.amount || 0),
      status: order.status || "PENDING",
      date: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    })) || [];

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
                     {isEditing && (
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
                     <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">
                           Recent Orders
                        </h2>
                     </div>
                     <CardDescription>
                        Your 5 most recent transactions
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {ordersLoading ? (
                           <div className="text-center py-4">Loading transactions...</div>
                        ) : recentOrders.length > 0 ? (
                           recentOrders.map((order) => (
                              <div
                                 key={order.id}
                                 className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                              >
                                 <div className="flex items-center gap-3">
                                    <div
                                       className={`p-2 rounded-md ${
                                          order.paymentMethod === "CARD"
                                             ? "bg-purple-100"
                                             : "bg-blue-100"
                                       }`}
                                    >
                                       {order.paymentMethod === "CARD" ? (
                                          <CreditCard className="h-4 w-4 text-purple-600" />
                                       ) : (
                                          <DollarSign className="h-4 w-4 text-blue-600" />
                                       )}
                                    </div>
                                    <div>
                                       <p className="font-medium">
                                          ${order.amount.toFixed(2)}
                                       </p>
                                       <p className="text-xs text-muted-foreground">
                                          {order.date} • {order.id}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <StatusBadge status={order.status} />
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="h-8 w-8"
                                    >
                                       <ChevronRight className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </div>
                           ))
                        ) : (
                           <div className="text-center py-4">No transactions found</div>
                        )}
                     </div>
                  </CardContent>
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
                           ${recentOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
                        </h3>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                           <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                           <span className="text-green-500 font-medium">
                              0.0%
                           </span>
                           <span className="ml-1">from last period</span>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader className="pb-2">
                        <CardDescription>Success Rate</CardDescription>
                        <h3 className="text-2xl font-bold">
                           {recentOrders.length > 0 
                              ? Math.round((recentOrders.filter(o => o.status === 'COMPLETED').length / recentOrders.length) * 100)
                              : 0}%
                        </h3>
                     </CardHeader>
                     <CardContent>
                        <Progress
                           value={recentOrders.length > 0 
                              ? Math.round((recentOrders.filter(o => o.status === 'COMPLETED').length / recentOrders.length) * 100)
                              : 0}
                           className="h-2"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                           {recentOrders.length} transactions shown
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader className="pb-2">
                        <CardDescription>Payment Methods</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-2">
                           <div className="flex justify-between items-center">
                              <span className="text-sm">Card Payments</span>
                              <span className="font-medium">
                                 {recentOrders.filter(o => o.paymentMethod === 'CARD').length}
                              </span>
                           </div>
                           <Progress
                              value={
                                 (recentOrders.filter(o => o.paymentMethod === 'CARD').length /
                                    recentOrders.length) *
                                 100
                              }
                              className="h-2"
                           />
                           <div className="flex justify-between items-center">
                              <span className="text-sm">Bank Transfers</span>
                              <span className="font-medium">
                                 {recentOrders.filter(o => o.paymentMethod === 'BANK').length}
                              </span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
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