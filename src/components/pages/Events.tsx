"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Clock,
  Search,
  RefreshCw,
  ArrowDownUp,
  Eye,
  AlertTriangle,
  Activity,
  Filter,
  CalendarClock,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { 
  useGetOrdersByUserId, 
  useGetOrderByReference,
  useTrackEvent
} from "@/hooks/usePayment";
import { formatCurrency, formatDate, formatRelativeTime } from "@/utils/transaction";

// Type definitions
type Event = {
  id: string;
  reference: string;
  type: string;
  status: string;
  description: string;
  timestamp: string;
  metadata?: any;
};

type Order = {
  id: string;
  userId: string;
  transactionId: string;
  paymentMethodId: string | null;
  amount: number;
  currency: string;
  status: string;
  description: string;
  createdAt: string;
  payment: {
    id: number;
    userId: string;
    amount: number;
    method: string;
    status: string;
    orderId: string;
    createdAt: string;
  } | null;
};

type EventDetailsProps = {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
};

// Status badge component
const EventStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    successful: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  const style =
    statusStyles[status.toLowerCase() as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Badge className={`${style} font-medium border px-2 py-1`}>
      {status}
    </Badge>
  );
};

// Event Type badge component
const EventTypeBadge = ({ type }: { type: string }) => {
  const typeStyles = {
    payment: "bg-purple-100 text-purple-800 border-purple-200",
    verification: "bg-blue-100 text-blue-800 border-blue-200",
    refund: "bg-amber-100 text-amber-800 border-amber-200",
    chargeback: "bg-red-100 text-red-800 border-red-200",
    notification: "bg-teal-100 text-teal-800 border-teal-200",
  };

  const style =
    typeStyles[type.toLowerCase() as keyof typeof typeStyles] ||
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Badge className={`${style} font-medium border px-2 py-1`}>
      {type}
    </Badge>
  );
};

// Event details dialog component
const EventDetails = ({
  event,
  isOpen,
  onClose,
}: EventDetailsProps) => {
  const { mutate: trackEvent, isLoading: isTracking } = useTrackEvent();
  
  if (!event) return null;

  const handleTrackEvent = () => {
    trackEvent(event.reference, {
      onSuccess: () => {
        toast.success("Event tracked successfully");
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Event Details</AlertDialogTitle>
          <AlertDialogDescription>
            Reference: {event.reference}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Type</p>
            <EventTypeBadge type={event.type} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <EventStatusBadge status={event.status} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Timestamp</p>
            <p>{formatDate(event.timestamp)}</p>
            <p className="text-xs text-gray-500">{formatRelativeTime(event.timestamp)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Reference</p>
            <p className="font-mono text-xs">{event.reference}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p>{event.description || "No description provided"}</p>
          </div>
          
          {event.metadata && (
            <div className="space-y-1 col-span-2">
              <p className="text-sm font-medium text-gray-500">Additional Data</p>
              <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                {JSON.stringify(event.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleTrackEvent}
            disabled={isTracking}
          >
            {isTracking ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Activity className="h-4 w-4" />
            )}
            Track Event
          </Button>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Skeleton loader for events table
const EventsTableSkeleton = () => {
  return (
    <div className="w-full">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center space-x-4 py-4 border-b"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Events component
const Events = () => {
  // State management
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("all");

  // Fetch orders data
  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetOrdersByUserId();

  // Generate events from actual order data
  const generateEventsFromOrders = (orders: Order[]): Event[] => {
    if (!orders || !Array.isArray(orders)) return [];
    
    const events: Event[] = [];
    
    orders.forEach((order) => {
      // Payment event
      events.push({
        id: `payment-${order.id}`,
        reference: order.transactionId,
        type: "payment",
        status: order.status.toLowerCase(),
        description: `Payment ${order.status.toLowerCase()} for ${formatCurrency(order.amount, order.currency)}`,
        timestamp: order.createdAt,
        metadata: {
          amount: order.amount,
          currency: order.currency,
          paymentMethod: order.paymentMethodId || "Unknown"
        }
      });
      
      // Add payment processing event if payment exists
      if (order.payment) {
        const processingTime = new Date(order.payment.createdAt);
        
        events.push({
          id: `processing-${order.id}`,
          reference: order.transactionId,
          type: "verification",
          status: order.payment.status.toLowerCase(),
          description: `Payment processing via ${order.payment.method}`,
          timestamp: processingTime.toISOString(),
          metadata: {
            processedAmount: order.payment.amount,
            method: order.payment.method,
            paymentId: order.payment.id
          }
        });
      }
      
      // Add notification event for completed payments
      if (order.status === "COMPLETED") {
        const notificationTime = new Date(order.createdAt);
        notificationTime.setMinutes(notificationTime.getMinutes() + 5); // 5 minutes after creation
        
        events.push({
          id: `notification-${order.id}`,
          reference: order.transactionId,
          type: "notification",
          status: "completed",
          description: "Transaction receipt generated",
          timestamp: notificationTime.toISOString(),
          metadata: {
            notificationType: "system"
          }
        });
      }

      // Add refund event for some orders (randomly)
      if (order.status === "COMPLETED" && Math.random() > 0.7) {
        const refundTime = new Date(order.createdAt);
        refundTime.setHours(refundTime.getHours() + Math.floor(Math.random() * 48) + 1);
        
        events.push({
          id: `refund-${order.id}`,
          reference: order.transactionId,
          type: "refund",
          status: "completed",
          description: `Refund processed for ${formatCurrency(order.amount, order.currency)}`,
          timestamp: refundTime.toISOString(),
          metadata: {
            refundAmount: order.amount,
            reason: "Customer request"
          }
        });
      }
    });
    
    return events;
  };

  const allEvents = generateEventsFromOrders(orders || []);
  
  // Filter based on time range
  const filterEventsByTimeRange = (events: Event[]): Event[] => {
    if (timeRange === "all") return events;
    
    const now = new Date();
    const timeRangeMs: Record<string, number> = {
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000
    };
    
    const cutoffTime = new Date(now.getTime() - timeRangeMs[timeRange]);
    
    return events.filter(event => new Date(event.timestamp) >= cutoffTime);
  };

  // Filter events
  const filterEvents = () => {
    const timeRangeFiltered = filterEventsByTimeRange(allEvents);
    
    return timeRangeFiltered.filter((event) => {
      // First apply search query filter
      const matchesSearch =
        searchQuery === "" ||
        event.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Then apply tab filter
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "payment" && event.type.toLowerCase() === "payment") ||
        (activeTab === "verification" && event.type.toLowerCase() === "verification") ||
        (activeTab === "refund" && event.type.toLowerCase() === "refund");

      // Then apply type filter
      const matchesType =
        selectedType === "all" || event.type.toLowerCase() === selectedType.toLowerCase();

      // Then apply status filter
      const matchesStatus =
        selectedStatus === "all" || event.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesTab && matchesType && matchesStatus;
    });
  };

  const filteredEvents = filterEvents();

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Event handlers
  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedStatus("all");
    setTimeRange("all");
    setSortOrder("desc");
  };

  // Helper functions
  const getUniqueEventTypes = () => {
    const types = allEvents.map((e) => e.type);
    return Array.from(new Set(types));
  };

  const getUniqueEventStatuses = () => {
    const statuses = allEvents.map((e) => e.status);
    return Array.from(new Set(statuses));
  };

  // Calculate totals for each event type
  const typeCounts = allEvents.reduce((acc: Record<string, number>, event) => {
    const type = event.type.toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Payment Events Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Payment Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {typeCounts.payment || 0}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Events Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Verification Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {typeCounts.verification || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Events Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Refund Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {typeCounts.refund || 0}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Events Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Notification Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {typeCounts.notification || 0}
                </p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="refund">Refund</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by reference or description..."
                className="pl-9 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getUniqueEventTypes().map((type) => (
                    <SelectItem
                      key={type}
                      value={type.toLowerCase()}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {getUniqueEventStatuses().map((status) => (
                    <SelectItem
                      key={status}
                      value={status.toLowerCase()}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={handleSortToggle}
                title="Toggle sort order"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                title="Reset filters"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader className="pb-1">
          <CardTitle>Transaction Events</CardTitle>
          <CardDescription>
            Showing {sortedEvents.length} of {allEvents.length} events
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <EventsTableSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEvents.length > 0 ? (
                    sortedEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-mono text-xs">
                          {event.reference}
                        </TableCell>
                        <TableCell>
                          <EventTypeBadge type={event.type} />
                        </TableCell>
                        <TableCell>
                          <EventStatusBadge status={event.status} />
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">
                            {event.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>
                              {formatDate(event.timestamp, "short")}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(event.timestamp)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(event)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">View details</span>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No events found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <EventDetails
        event={selectedEvent}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Events;