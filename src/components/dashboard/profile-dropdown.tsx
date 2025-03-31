import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useAuthStore } from "@/store/useAuthStore";
import LogoutAlert from "@/components/LogoutAlert";

const ProfileDropdown: React.FC = () => {
   const router = useRouter();
   const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
   const { user, clearUser } = useAuthStore();

   const handleLogout = () => {
      clearUser();
      router.push("/login");
   };

   console.log("user", user);
   
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center outline-none focus:ring-0 hover:bg-subprimary p-2 rounded-md space-x-2">
               <Icon
                  icon="bi:person-fill"
                  fontSize={28}
                  color="#494C52"
               />
               <div className="flex flex-col items-start">
                  <p className="text-base text-[#070B14]">
                     {user?.firstName || "User"}
                  </p>
                  <p className="text-[10px] -mt-1 truncate max-w-[128px] overflow-hidden text-ellipsis">
                     {user?.email || "user@example.com"}
                  </p>
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[16rem]">
               <DropdownMenuLabel>My Account</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  onClick={() => router.push("/dashboard/account")}
                  className="cursor-pointer hover:bg-gray-200"
               >
                  Profile
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)} className="cursor-pointer hover:bg-gray-200">
                  Logout
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Logout Confirmation Dialog */}
         <LogoutAlert
            open={isLogoutDialogOpen}
            onOpenChange={setIsLogoutDialogOpen}
            onConfirm={handleLogout}
            isLoading={false}
         />
      </>
   );
};

export default ProfileDropdown;
