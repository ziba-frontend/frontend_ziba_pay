export interface NavItem {
    name: string;
    href?: string;
    icon?: React.ReactNode;
    subItems?: {
      name: string;
      href?: string;
    }[];
  }