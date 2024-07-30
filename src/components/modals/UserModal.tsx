"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createUser, updateUser } from "@/lib/api-calls/admin";
import { toast } from "react-hot-toast";
import UserForm from "../form/UserForm";

type User = {
  id: string;
  name: string;
  email: string;
};

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSuccess }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [user]);

  const handleSubmit = async (data: { name: string; email: string; role: string }) => {
    try {
      if (user) {
        await updateUser(user.id, data);
        toast.success("User updated successfully");
      } else {
        await createUser(data);
        toast.success("User created successfully");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save user");
    } finally {
      setOpen(false); // Close the modal
      onClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>{user ? "Update User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <UserForm user={user} onSubmit={handleSubmit} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
