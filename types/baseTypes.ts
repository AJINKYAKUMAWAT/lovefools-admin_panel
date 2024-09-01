import { ValueLabelOption } from './component/common/select';

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export interface ListMeta {
  page?: number;
  limit?: number;
  size?: number;
  sortBy?: string | number;
  sortOrder?: SortDirection;
}

export interface ListParameters extends ListMeta {
  status?: string | ValueLabelOption | null;
  search?: string;
  query?: string;
}

export type ListResult<T> = {
  data: T[];
  pageData: ListMeta & { total: number };
};
