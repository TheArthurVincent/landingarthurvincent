export interface LinkItem {
  title: string;
  endpoint: string;
  display?: string;
  icon:string
}

export interface ItemTopBarProps {
  title: string;
  list: LinkItem[];
}
export interface ItemSideBarProps {
  theGoogleDriveLink:string;
}
