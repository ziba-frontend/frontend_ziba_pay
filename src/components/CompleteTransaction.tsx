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
import SubmitButton from "./SubmitButton";
import { cancelTransaction, completeTransaction } from "@/lib/api-calls/transaction";


const CompleteTransaction = ({
  type,
  transactionId,
  userId,
}: {
  type: "complete" | "cancel";
  transactionId: string;
  userId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let response;
      if (type === "complete") {
        response = await completeTransaction(transactionId);
      } else if (type === "cancel") {
        response = await cancelTransaction(transactionId);
      }
      setOpen(false);
    } catch (error) {
      console.error(`Error while ${type}ing transaction:`, error);
    } finally {
      setIsLoading(false);
    }
  };



  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Transaction";
      break;
    case "complete":
      buttonLabel = "Complete Transaction";
      break;
    default:
      return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`capitalize ${type === "complete" && "text-green-500"}`}>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>{buttonLabel}</DialogTitle>
          <DialogDescription>
            Are you sure you want to {type} the transaction with ID: {transactionId}?
          </DialogDescription>
        </DialogHeader>
        <SubmitButton
          onClick={handleSubmit}
          isLoading={isLoading}
          className={`${type === "cancel" ? "bg-red-700 text-white" : "bg-green-500 text-white"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteTransaction;
