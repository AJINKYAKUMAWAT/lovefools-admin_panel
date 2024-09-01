export type TabTitles = string;

export interface TabData {
  key: string;
  title: TabTitles;
  isDisabled?: boolean;
}

export interface TableColumnType {
  key: string;
  label: string;
  // Add other properties as needed
}
