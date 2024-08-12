import React from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface User {
   id: string;
   name: string;
   email: string;
   role: string;
   isEmailVerified: boolean;
   createdAt: string;
}

interface UserDetailsModalProps {
   user: User | null;
   onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
   user,
   onClose,
}) => {
   if (!user) {
      return null;
   }

   const createdAtDate = user.createdAt ? new Date(user.createdAt) : null;
   const formattedCreatedAt =
      createdAtDate && !isNaN(createdAtDate.getTime())
         ? format(createdAtDate, "PPpp")
         : "Invalid Date";
   return (
      <Dialog
         open={Boolean(user)}
         onOpenChange={onClose}
      >
         <DialogContent>
            <DialogHeader>
               <DialogTitle>User Details Panel</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
               <div>
                  <p className="mb-2 text-[#979797]">Name</p>
                  <div className="p-3 border border-black w-full">
                     {user.name}
                  </div>
               </div>
               <div>
                  <p className="mb-2 text-[#979797]">Email</p>
                  <div className="p-3 border border-black w-full">
                     {user.email}
                  </div>
               </div>
               <div>
                  <p className="mb-2 text-[#979797]">Role</p>
                  <div className="p-3 border border-black w-full">
                     {user.role}
                  </div>
               </div>
               <div>
                  <p className="mb-2 text-[#979797]">KYC Status</p>
                  <div className="p-3 border border-black w-full">
                     {user.isEmailVerified ? "Verified" : "Not Verified"}
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <small>Last Login: {user.createdAt}</small>
                  <small>Date Joined: {user.createdAt}</small>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default UserDetailsModal;
