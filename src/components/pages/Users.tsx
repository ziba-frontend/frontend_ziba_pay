"use client"
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
import {
  Heart,
  Pen,
  Trash,
  User,
  Users as UsersIcon,
  Mail,
  UserCog,
  Users
} from "lucide-react";
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
    header: () => (
      <div className="flex items-center gap-2">
        <UserCog size={16} />
        <span>Name</span>
      </div>
    ),
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
          <p className="cursor-pointer" onClick={handleNameClick}>
            {user.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="flex items-center gap-2">
        <Mail size={16} />
        <span>Email</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: () => (
      <div className="flex items-center gap-2">
        <UserCog size={16} />
        <span>Role</span>
      </div>
    ),
  },
  {
    accessorKey: "isEmailVerified",
    header: () => (
      <div className="flex items-center gap-2">
        <UserCog size={16} />
        <span>KYC STATUS</span>
      </div>
    ),
    cell: ({ row }) => (
      <span>{row.original.isEmailVerified ? "Verified" : "Not Verified"}</span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center gap-2">
        <Pen size={16} />
        <span>Actions</span>
      </div>
    ),
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
            message={`Are you sure you want to delete  ${user.name}? This action cannot be undone.`}
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

export default function UsersPage() {
   const [data, setData] = useState<User[]>([]);
   const [filteredData, setFilteredData] = useState<User[]>([]);
   const [isModalOpen, setModalOpen] = useState(false);
   const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [detailsUser, setDetailsUser] = useState<User | null>(null);
   const [isAdmin, setIsAdmin] = useState(false);
   const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [newUserCount, setNewUserCount] = useState<number>(0);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const users = await getAllUsers();
            setData(users);
            setFilteredData(users);
            calculateNewUsers(users);
         } catch (error) {
            toast.error("Failed to fetch users");
         }
      };
      fetchData();
   }, []);

   useEffect(() => {
      const filtered = data.filter((user) =>
         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
   }, [searchTerm, data]);

   const calculateNewUsers = (users: User[]) => {
      const now = new Date();  
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);  
  
      const newUsers = users.filter(user => {
          const userCreatedAt = new Date(user.createdAt); 
          return userCreatedAt >= oneWeekAgo && userCreatedAt <= now; 
      });
  
      setNewUserCount(newUsers.length); 
  };

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
            setFilteredData(users);
            const currentUser = await getUserProfile();
            setCurrentUser(currentUser);
            setIsAdmin(currentUser.role === "admin");
            calculateNewUsers(users);
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </form>
            <Button className="bg-main w-fit md:w-auto">Add User</Button>
         </div>
         <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Users" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="border p-4 rounded-md flex  gap-4">
                  <div className="flex items-center justify-center rounded-full bg-gray-500 p-4 h-[50px] w-[50px] ">
                     <Users />
                  </div>
                  <div className="flex items-start flex-col gap-1 font-semibold">
                     <p>Total Users</p>
                     <p className=" p-1 flex items-center">{data.length}</p>
                  </div>
               </div>
               <div className="border p-4 rounded-md flex  gap-4">
                  <div className="flex items-center justify-center rounded-full bg-orange-300 p-4 h-[50px] w-[50px] ">
                     <User className="text-orange-500"/>
                  </div>
                  <div className="flex items-start flex-col gap-1 font-semibold">
                     <p>New Users</p>
                     <p className=" p-1 flex items-center">{newUserCount}</p>
                  </div>
               </div>
               <div className="border p-4 rounded-md flex  gap-4">
                  <div className="flex items-center justify-center rounded-full bg-green-300 p-4 h-[50px] w-[50px] ">
                     <Heart className="text-green-500" />
                  </div>
                  <div className="flex items-start flex-col gap-1 font-semibold">
                     <p>Top Users</p>
                     <p className=" p-1 flex items-center">0</p>
                  </div>
               </div>
               <div className="border p-4 rounded-md flex  gap-4">
                  <div className="flex items-center justify-center rounded-full bg-blue-300 p-4 h-[50px] w-[50px] ">
                     <span className="bg-blue-500  rounded-full flex items-center justify-center h-4 w-4">...</span>
                  </div>
                  <div className="flex items-start flex-col gap-1 font-semibold">
                     <p>Others Users</p>
                     <p className=" p-1 flex items-center">0</p>
                  </div>
               </div>
            </div>
            <DataTable
               columns={columns}
               data={filteredData}
               title="All Users"
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
