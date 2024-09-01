import { Roles } from '@/utils/constant';

export interface SidebarItemType {
  name: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
}
