export interface SidebarMenu {

  id: string;

  name: string;

  icon: string;

  link?: string;

  visible: boolean;

  children?: SidebarMenu[];

}