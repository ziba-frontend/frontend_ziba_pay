"use client";
import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { updateUser, deleteUser } from "@/lib/api-calls/admin";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import ProfileForm from "../form/ProfileForm";
import { getUserProfile, logoutApi } from "@/lib/api-calls/auth-server";

interface UserProfile {
   id: string;
   name: string;
   email: string;
   businessType: string;
}

const Account = () => {
   const [user, setUser] = useState<UserProfile>({
      id: "",
      name: "",
      email: "",
      businessType: "",
   });
   const [loading, setLoading] = useState<boolean>(true);
   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
      useState(false);

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const userData = await getUserProfile();
            setUser(userData);
         } catch (error) {
            console.error("Error fetching user profile:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchUserProfile();
   }, []);

   const handleUpdateProfile = async (updatedData: any) => {
      try {
         await updateUser(user.id, updatedData);
         toast.success("Profile updated successfully");
         setUser(updatedData);
         setIsUpdateModalOpen(false);
      } catch (error) {
         toast.error("Failed to update profile");
      }
   };

   const handleDeleteProfile = async () => {
      try {
         await deleteUser(user.id);
         await logoutApi();
         toast.success("Profile deleted successfully");
         window.location.href = "/login";
      } catch (error) {
         toast.error("Failed to delete profile");
      } finally {
         setIsDeleteConfirmationOpen(false);
      }
   };

   if (loading) {
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
               <Button
                  onClick={() => setIsDeleteConfirmationOpen(true)}
                  variant="destructive"
               >
                  Delete Profile
               </Button>
            </div>
         </div>
         <div className="border-b py-2">
            <p className="font-semibold">General Information</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div className="flex flex-col gap-2">
               <h3 className="font-semibold">Name</h3>
               <p>{user.name}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3 className="font-semibold">Email</h3>
               <p>{user.email}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h3 className="font-semibold">Business Type</h3>
               <p>{user.businessType}</p>
            </div>
         </div>

         {/* Update Profile Modal */}
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

         {/* Delete Profile Confirmation Dialog */}
         <Dialog
            open={isDeleteConfirmationOpen}
            onOpenChange={() => setIsDeleteConfirmationOpen(false)}
         >
            <DialogContent className="max-w-sm">
               <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
               </DialogHeader>
               <p>
                  Are you sure you want to delete your profile? This action
                  cannot be undone.
               </p>
               <div className="flex justify-end space-x-4 mt-4">
                  <Button
                     variant="outline"
                     onClick={() => setIsDeleteConfirmationOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="destructive"
                     onClick={handleDeleteProfile}
                  >
                     Delete
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default Account;
