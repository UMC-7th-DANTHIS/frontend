export interface MypageSidebarProps {
  selectedMenu: string;
  onMenuClick: (menuKey: string) => void;
}

export interface MenuItemProps {
  isActive: boolean;
}
