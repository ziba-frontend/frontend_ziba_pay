"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ApplicationForm from "../form/ApplicationForm";

const ApplicationModal = ({ onSuccess } : { onSuccess?: any}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="capitalize text-green-500 p-6">Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>CREATE APPLICATION</DialogTitle>
        </DialogHeader>
        <ApplicationForm onSuccess={onSuccess} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
