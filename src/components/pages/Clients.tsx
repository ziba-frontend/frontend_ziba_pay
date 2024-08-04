"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
   day: z.date({
      required_error: "Pick a date please",
   }),
});

const Clients = () => {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data);
   }

   const router = useRouter();
   const handleRefresh = () => {
      router.refresh();
   };
   return (
      <div>
         <div className=" flex flex-col gap-4 md:flex-row md:items-center md:justify-between my-2">
            <div>
               <h2>Clients</h2>
               <p>Today: 13th January 2023</p>
            </div>
            <div className="flex gap-3">
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-8"
                  >
                     <FormField
                        control={form.control}
                        name="day"
                        render={({ field }) => (
                           <FormItem className="flex flex-col">
                              <Popover>
                                 <PopoverTrigger asChild>
                                    <FormControl>
                                       <Button
                                          variant={"outline"}
                                          className={cn(
                                             "min-w-[150px] p-6 text-left font-normal bg-white",
                                             !field.value &&
                                                "text-muted-foreground"
                                          )}
                                       >
                                          {field.value ? (
                                             format(field.value, "PPP")
                                          ) : (
                                             <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-6 h-4 w-4 opacity-50" />
                                       </Button>
                                    </FormControl>
                                 </PopoverTrigger>
                                 <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                 >
                                    <Calendar
                                       mode="single"
                                       selected={field.value}
                                       onSelect={field.onChange}
                                       disabled={(date) =>
                                          date > new Date() ||
                                          date < new Date("1900-01-01")
                                       }
                                       initialFocus
                                    />
                                 </PopoverContent>
                              </Popover>
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>

               <div
                  className="bg-black flex  items-center justify-center rounded p-2 text-white cursor-pointer"
                  onClick={handleRefresh}
               >
                  <p>Refresh</p>
               </div>
            </div>
         </div>

         <div className="flex items-center justify-center p-12 bg-br my-6">
            <p>No Clients found at the moment.</p>
         </div>
      </div>
   );
};

export default Clients;
