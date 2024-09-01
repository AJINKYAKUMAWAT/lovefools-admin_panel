export interface BreadcrumbItem {
  parentId?: number | null;
  label: string;
  active?: boolean;
}

type BreadCrumbsProps = {
  items: BreadcrumbItem[];
  onAction?: (parentId: number) => void;
  breadCrumbHandlesDisabled?: boolean | false;
};

export default BreadCrumbsProps;
