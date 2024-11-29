//@ts-nocheck

"use client";
import React, { useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import ProfileForm from "../form/ProfileForm";
import { useFetchUserProfile, useLogout } from "@/hooks/useAuth";
import { useDeleteUser, useUpdateUser } from "@/hooks/useAdmin";

interface UserProfile {
   id: string;
   name: string;
   email: string;
   businessType: string;
}

const Account = () => {
   const { data: user, isLoading } = useFetchUserProfile();
   const updateUserMutation = useUpdateUser();
   const deleteUserMutation = useDeleteUser();
   const logoutMutation = useLogout();

   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

   const handleUpdateProfile = async (updatedData: UserProfile) => {
      try {
         await updateUserMutation.mutateAsync({
            userId: user?.id,
            userData: updatedData,
         });
         toast.success("Profile updated successfully");
         setIsUpdateModalOpen(false);
      } catch {
         toast.error("Failed to update profile");
      }
   };

   if (isLoading) {
      return (
         <div className="w-full h-screen flex items-center justify-center">
            <RiseLoader color="#3BD64A" />
         </div>
      );
   }

   return (
      <div>
         <div className="flex items-center justify-between my-2">
            <h2 className="text-xl font-bold">Profile</h2>
            <div className="flex space-x-2">
               <Button onClick={() => setIsUpdateModalOpen(true)}>
                  Update Profile
               </Button>
            </div>
         </div>
         <div className="border-b py-2">
            <p className="font-semibold">General Information</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div className="flex flex-col gap-2">
               <h3 className="font-semibold">Name</h3>
               <p>{user?.name}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3 className="font-semibold">Email</h3>
               <p>{user?.email}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3 className="font-semibold">Business Type</h3>
               <p>{user?.businessType}</p>
            </div>
         </div>

         <Dialog
            open={isUpdateModalOpen}
            onOpenChange={() => setIsUpdateModalOpen(false)}
         >
            <DialogContent className="max-w-2xl">
               <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
               </DialogHeader>
               <ProfileForm
                  user={user}
                  onSubmit={handleUpdateProfile}
                  onClose={() => setIsUpdateModalOpen(false)}
               />
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default Account;
