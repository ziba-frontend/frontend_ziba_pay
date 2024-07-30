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

type User = {
   id: string;
   name: string;
   email: string;
};

const columns: ColumnDef<User>[] = [
   {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
         return (
            <div>
               <p>{row.getValue("name")} </p>
            </div>
         );
      },
   },
   {
      accessorKey: "email",
      header: "Email",
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

   return (
      <div className="flex gap-2">
         <button
            onClick={handleUpdate}
            className="text-blue-500"
         >
            Update
         </button>
         <button
            onClick={handleDelete}
            className="text-red-500"
         >
            Delete
         </button>
      </div>
   );
};

const UsersPageContext = React.createContext<{
   setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
   isAdmin: boolean;
}>({
   setModalOpen: () => {},
   setCurrentUser: () => {},
   isAdmin: false,
});

export default function UsersPage() {
   const [data, setData] = useState<User[]>([]);
   const [isModalOpen, setModalOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [isAdmin, setIsAdmin] = useState(false);

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

   const handleAddUser = () => {
      setCurrentUser(null);
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   const handleSuccess = () => {
      handleCloseModal();
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
         value={{ setModalOpen, setCurrentUser, isAdmin }}
      >
         <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Users" />
            <Button
               onClick={handleAddUser}
               className="self-end"
            >
               Add New User
            </Button>
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
         </div>
      </UsersPageContext.Provider>
   );
}
