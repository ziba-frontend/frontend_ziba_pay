"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import {
   useCompleteTransaction,
   useCancelTransaction,
} from "@/hooks/useTransaction";
import { useDeleteApiKey } from "@/hooks/useDeveloper";

const CompleteTransaction = ({
   type,
   transactionId,
   userId,
   onSuccess,
   gatewayId,
}: {
   type: "complete" | "cancel" | "delete" | "configure";
   transactionId?: string;
   gatewayId?: string;
   userId?: string;
   onSuccess?: () => void;
}) => {
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const completeTransactionMutation = useCompleteTransaction();
   const cancelTransactionMutation = useCancelTransaction();
   const deleteApiKeyMutation = useDeleteApiKey();

   const handleSubmit = async () => {
      setIsLoading(true);
      try {
         let response;

         // Complete transaction logic
         if (type === "complete" && transactionId) {
            response = await completeTransactionMutation.mutateAsync(
               transactionId
            );
         }

         // Cancel transaction logic
         else if (type === "cancel" && transactionId) {
            response = await cancelTransactionMutation.mutateAsync(
               transactionId
            );
         }

         // Delete gateway API key logic
         else if (type === "delete" && gatewayId) {
            response = await deleteApiKeyMutation.mutateAsync(gatewayId);
         }

         // Refresh the page and call onSuccess if defined
         router.refresh();
         setOpen(false);
         if (onSuccess) onSuccess();
      } catch (error) {
         console.error(`Error while ${type}ing transaction:`, error);
      } finally {
         setIsLoading(false);
      }
   };

   let buttonLabel;
   switch (type) {
      case "cancel":
         buttonLabel = "Cancel";
         break;
      case "complete":
         buttonLabel = "Complete";
         break;
      case "delete":
         buttonLabel = "Delete";
         break;
      case "configure":
         buttonLabel = "Configure";
         break;
      default:
         return null;
   }

   return (
      <Dialog
         open={open}
         onOpenChange={setOpen}
      >
         <DialogTrigger asChild>
            <Button
               className={`capitalize ${
                  type === "complete" && "text-green-500"
               }`}
            >
               {buttonLabel}
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader className="mb-4 space-y-3">
               <DialogTitle>{buttonLabel}</DialogTitle>
               <DialogDescription>
                  Are you sure you want to {type} the{" "}
                  {transactionId ? "transaction" : "gateway keys"} with ID:{" "}
                  {transactionId ? transactionId : gatewayId}?
               </DialogDescription>
            </DialogHeader>
            <SubmitButton
               onClick={handleSubmit}
               isLoading={isLoading}
               className={`${
                  type === "cancel" || type === "delete"
                     ? "bg-red-700 text-white"
                     : "bg-green-500 text-white"
               } w-full`}
            >
               {buttonLabel}
            </SubmitButton>
         </DialogContent>
      </Dialog>
   );
};

export default CompleteTransaction;
