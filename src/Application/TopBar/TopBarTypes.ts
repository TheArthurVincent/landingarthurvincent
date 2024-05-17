export interface LinkItem {
  title: string;
  endpoint: string;
  display?: string;
}

export interface ItemTopBarProps {
  title: string;
  list: LinkItem[];
}
