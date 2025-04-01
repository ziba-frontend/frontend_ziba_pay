import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBreadcrumbStore } from "@/store/bread-crumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavItem } from "@/types/common";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import logo from "../../../public/svg/logo.svg";
import {
  LayoutDashboard,
  WalletCards,
  Users,
  Clock,
  CircleUser,
  Store as StoreIcon,
  ClipboardList,
  ShieldCheck,
  LogOut,
  ListOrderedIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import LogoutAlert from "@/components/LogoutAlert";

interface Props {
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarMinimized: boolean;
  setIsSidebarMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const getBaseNavItems = (): NavItem[] => [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
    exact: true,
  },
  {
    name: "Account",
    href: "/dashboard/account",
    icon: <CircleUser />,
  },
];

const getAdminNavItems = (): NavItem[] => [
  ...getBaseNavItems(),
  {
    name: "Products",
    href: "/",
    icon: <LayoutDashboard />,
  },
  {
    name: "Suppliers",
    icon: <Users />,
    subItems: [
      { name: "All Suppliers", href: "/supplier/all" },
      { name: "Create Supplier", href: "/supplier/create" },
    ],
  },
  {
    name: "Sections",
    icon: <StoreIcon />,
    subItems: [
      { name: "All Sections", href: "/section/all" },
      { name: "Create Section", href: "/section/create" },
    ],
  },
  {
    name: "Managers",
    icon: <Users />,
    subItems: [
      { name: "All Managers", href: "/manager/all" },
      { name: "Create Manager", href: "/manager/create" },
    ],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <ClipboardList />,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: <WalletCards />,
  },
  {
    name: "Summary",
    href: "/dashboard/summary",
    icon: <LayoutDashboard />,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: <Clock />,
  },
  {
    name: "Withdrawals",
    href: "/dashboard/withdrawals",
    icon: <WalletCards />,
  },
  {
    name: "Approved Numbers",
    href: "/dashboard/approved-numbers",
    icon: <WalletCards />,
  },
  {
    name: "Admin Dashboard",
    href: "/dashboard/admin",
    icon: <ShieldCheck />,
  },
];

const getMerchantNavItems = (): NavItem[] => [
  ...getBaseNavItems(),
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: <WalletCards />,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: <ListOrderedIcon />,
  },
  {
   name: "Summary",
   href: "/dashboard/summary",
   icon: <LayoutDashboard />,
 },
 {
   name: "Events",
   href: "/dashboard/events",
   icon: <Clock />,
 },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: <ClipboardList />,
  }
];

const getCustomerNavItems = (): NavItem[] => [
  ...getBaseNavItems(),
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: <WalletCards />,
  },
  {
    name: "Customer Dashboard",
    href: "/dashboard/customer",
    icon: <CircleUser />,
  },
];

const DashboardSidebar: React.FC<Props> = ({
  setIsSheetOpen,
  isSidebarMinimized,
  setIsSidebarMinimized,
}) => {
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { user, role, clearUser } = useAuthStore();
  const [filteredNavItems, setFilteredNavItems] = useState<NavItem[]>([]);
  const pathName = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | undefined>(undefined);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();

  

  // Set navigation items based on user role
  useEffect(() => {
    if (role === "ADMIN") {
      setFilteredNavItems(getAdminNavItems());
    } else if (role === "MERCHANT") {
      setFilteredNavItems(getMerchantNavItems());
    } else if (role === "CUSTOMER") {
      setFilteredNavItems(getCustomerNavItems());
    } else {
      // Default navigation items if no role or unknown role
      setFilteredNavItems(getBaseNavItems());
    }
  }, [role]);

  useEffect(() => {
    const breadcrumbItems: { name: string; href: string }[] = [];
    for (const item of filteredNavItems) {
      if (item.href && isPathActive(item.href, pathName, item.exact)) {
        breadcrumbItems.push({ name: item.name, href: item.href });
      } else if (item.subItems) {
        const subItem = item.subItems.find((sub) =>
          pathName.startsWith(sub.href!)
        );
        if (subItem) {
          breadcrumbItems.push({
            name: item.name,
            href: subItem.href || "",
          });
          breadcrumbItems.push({
            name: subItem.name,
            href: subItem.href!,
          });
          break;
        }
      }
    }
    setBreadcrumbItems(breadcrumbItems);
    if (breadcrumbItems.length === 0) {
      setBreadcrumbItems([{ name: "Home", href: "/" }]);
    }
  }, [pathName, filteredNavItems, setBreadcrumbItems]);

  const handleNavItemClick = (itemName: string) => {
    if (isSidebarMinimized) {
      setIsSidebarMinimized(false);
      setExpandedItem(itemName);
    } else {
      setExpandedItem(expandedItem === itemName ? undefined : itemName);
    }
  };

  // Helper function to determine if a path is active
  const isPathActive = (itemPath: string, currentPath: string, exact?: boolean) => {
    if (exact) {
      return currentPath === itemPath;
    }
    
    // For non-exact matches, ensure we don't match parent paths accidentally
    if (itemPath === "/") {
      return currentPath === "/";
    }
    
    return currentPath.startsWith(itemPath);
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = item.href && 
                    isPathActive(item.href, pathName, item.exact) ||
                    item.subItems?.some((subItem) => pathName.startsWith(subItem.href!));

    const isExpanded = expandedItem === item.name;

    if (item.subItems) {
      return (
        <AccordionItem
          key={item.name}
          value={item.name}
          className="border-none"
        >
          <AccordionTrigger
            className={`text-base transition duration-300 hover:bg-main hover:text-white h-[48px] px-3 rounded text-[#494C52] w-full flex items-center justify-between gap-2 font-normal ${
              isActive
                ? "bg-[#E5EDFF] text-primary border-l-[2.4px] border-primary relative"
                : ""
            }`}
            onClick={() => handleNavItemClick(item.name)}
          >
            <div
              className={`flex items-center gap-2 ${
                isSidebarMinimized ? "absolute w-full z-50" : ""
              }`}
            >
              {React.isValidElement(item.icon) ? (
                item.icon
              ) : (
                <Users />
              )}
              {!isSidebarMinimized && item.name}
            </div>
          </AccordionTrigger>
          {!isSidebarMinimized && isExpanded && (
            <AccordionContent className="">
              <ol className="relative flex mt-4 w-full transition duration-300 ml-14">
                <div className="w-[2px] bg-inherit py-2">
                  <div className="w-full h-full bg-textmain"></div>
                </div>
                <div>
                  {item.subItems.map((subItem, index) => {
                    const isSubItemActive = pathName === subItem.href;
                    const isLastSubItem =
                      index === item.subItems!.length - 1;
                    return (
                      <li
                        key={subItem.name}
                        className={`${
                          !isLastSubItem ? "mb-4" : ""
                        }`}
                      >
                        <div
                          className={`absolute w-[10px] h-[10px] rounded-full mt-1.5 -start-1 border border-white ${
                            isSubItemActive
                              ? "bg-main"
                              : "bg-[#494C52]"
                          }`}
                        ></div>
                        <Link
                          href={subItem.href!}
                          className={`text-sm transition duration-300 hover:text-primary ml-3 -mt-2 ${
                            isSubItemActive
                              ? "text-primary"
                              : "text-[#494C52]"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </ol>
            </AccordionContent>
          )}
        </AccordionItem>
      );
    } else {
      return (
        <Link
          href={item.href!}
          key={item.name}
          className={`text-base transition duration-300 hover:bg-main hover:text-white h-[48px] px-3 rounded text-[#494C52] w-full flex items-center justify-between gap-2 font-normal ${
            isActive
              ? "bg-main text-white border-l-[2.4px] border-primary relative"
              : ""
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              isSidebarMinimized ? "absolute w-full z-50" : ""
            }`}
          >
            {React.isValidElement(item.icon) ? (
              item.icon
            ) : (
              <Users />
            )}
            {!isSidebarMinimized && item.name}
          </div>
        </Link>
      );
    }
  };

  return (
    <main
      className={`bg-white h-full w-full pl-[1rem] pt-[2rem] pb-[4rem] max-h-[1024px] min-w-[264px] ${
        isSidebarMinimized
          ? "px-[1rem] pt-[1rem] min-w-fit"
          : "px-[1.75rem] pt-[2rem]"
      }`}
    >
      <Link
        href="/"
        className="transition-transform hover:scale-105 duration-300"
      >
        <Image
          src={logo}
          alt="zibaPay"
          className="h-10 w-auto"
        />
      </Link>
      <Accordion
        type="single"
        collapsible
        className="w-full mt-12 space-y-2"
        value={expandedItem}
        onValueChange={setExpandedItem}
      >
        {filteredNavItems.map(renderNavItem)}
        
      
      </Accordion>
      
    </main>
  );
};

export default DashboardSidebar;