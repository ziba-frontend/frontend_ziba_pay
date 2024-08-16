"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteUser, getAllUsers } from "@/lib/api-calls/admin";
import UserModal from "@/components/modals/UserModal";
import { getUserProfile } from "@/lib/api-calls/auth-server";
import { Button } from "@/components/ui/button";
import UserDetailsModal from "../modals/UserDetailsModal";
import ConfirmDialog from "../modals/ConfirmDeleteUser";
import { ArrowDown, Heart, Pen, Trash, User, Users } from "lucide-react";
import { FaSearch } from "react-icons/fa";

type User = {
   isEmailVerified: any;
   role: string;
   id: string;
   name: string;
   email: string;
   createdAt: string;
};

const columns: ColumnDef<User>[] = [
   {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
         const user = row.original;
         const { setDetailsUser, setDetailsModalOpen } =
            React.useContext(UsersPageContext);

         const handleNameClick = () => {
            setDetailsUser(user);
            setDetailsModalOpen(true);
         };

         return (
            <div>
               <p
                  className="cursor-pointer "
                  onClick={handleNameClick}
               >
                  {user.name}
               </p>
            </div>
         );
      },
   },
   {
      accessorKey: "email",
      header: "Email",
   },
   {
      accessorKey: "role",
      header: "Role",
   },
   {
      accessorKey: "isEmailVerified",
      header: "KYC STATUS",
      cell: ({ row }) => (
         <span>
            {row.original.isEmailVerified ? "Verified" : "Not Verified"}
         </span>
      ),
   },
   {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
         const user = row.original;
         return <ActionButtons user={user} />;
      },
   },
];

const ActionButtons: React.FC<{ user: User }> = ({ user }) => {
   const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
   const router = useRouter();
   const { setModalOpen, setCurrentUser, isAdmin } =
      React.useContext(UsersPageContext);

   if (isAdmin) {
      return null;
   }

   const handleUpdate = () => {
      setCurrentUser(user);
      setModalOpen(true);
   };

   const handleDelete = async () => {
      try {
         await deleteUser(user.id);
         toast.success("User deleted successfully");
         router.refresh();
      } catch (error) {
         toast.error("Failed to delete user");
      }
   };

   const openConfirmDialog = () => {
      setConfirmDialogOpen(true);
   };

   const closeConfirmDialog = () => {
      setConfirmDialogOpen(false);
   };

   return (
      <div className="flex gap-2">
         {user.role !== "admin" && (
            <>
               <button
                  onClick={handleUpdate}
                  className="text-blue-500"
               >
                  <Pen />
               </button>
               <button
                  onClick={openConfirmDialog}
                  className="text-red-500"
               >
                  <Trash />
               </button>
            </>
         )}
         <ConfirmDialog
            open={isConfirmDialogOpen}
            onClose={closeConfirmDialog}
            onConfirm={handleDelete}
            message={`Are you sure you want to delete user ${user.name}? This action cannot be undone.`}
         />
      </div>
   );
};

const UsersPageContext = React.createContext<{
   setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
   setDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setDetailsUser: React.Dispatch<React.SetStateAction<User | null>>;
   isAdmin: boolean;
}>({
   setModalOpen: () => {},
   setCurrentUser: () => {},
   setDetailsModalOpen: () => {},
   setDetailsUser: () => {},
   isAdmin: false,
});

export default function AdminTransactionManagement() {
   const [data, setData] = useState<User[]>([]);
   const [isModalOpen, setModalOpen] = useState(false);
   const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [detailsUser, setDetailsUser] = useState<User | null>(null);
   const [isAdmin, setIsAdmin] = useState(false);
   const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const users = await getAllUsers();
            setData(users);
         } catch (error) {
            toast.error("Failed to fetch users");
         }
      };
      fetchData();
   }, []);

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   const handleCloseDetailsModal = () => {
      setDetailsModalOpen(false);
   };

   const handleSuccess = () => {
      const fetchData = async () => {
         try {
            const users = await getAllUsers();
            setData(users);
            const currentUser = await getUserProfile();
            setCurrentUser(currentUser);
            setIsAdmin(currentUser.role === "admin");
         } catch (error) {
            toast.error("Failed to fetch users");
         }
      };

      fetchData();
   };

   return (
      <UsersPageContext.Provider
         value={{
            setModalOpen,
            setCurrentUser,
            setDetailsModalOpen,
            setDetailsUser,
            isAdmin,
         }}
      >
         <div className="mb-6 flex flex-col md:flex-row md:justify-between gap-4 w-full">
            <form
               className={`flex gap-4 items-center bg-white p-[15px] rounded-lg transition-all ${
                  isInputFocused ? "border-2 border-main" : "border"
               }`}
            >
               <FaSearch color="gray" />
               <input
                  className="outline-none flex-1"
                  placeholder="Search for..."
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
               />
            </form>
            <Button className=" w-full md:w-auto">
               Export
               <ArrowDown />
            </Button>
         </div>
         <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Transactions" />
            
            <DataTable
               columns={columns}
               data={data}
            />
            {isModalOpen && (
               <UserModal
                  user={currentUser}
                  onClose={handleCloseModal}
                  onSuccess={handleSuccess}
               />
            )}
            {isDetailsModalOpen && (
               <UserDetailsModal
                  user={detailsUser}
                  onClose={handleCloseDetailsModal}
               />
            )}
         </div>
      </UsersPageContext.Provider>
   );
}
