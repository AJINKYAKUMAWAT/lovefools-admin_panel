import React from 'react';
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  Spacer,
  SortDescriptor,
  TableProps,
} from '@nextui-org/react';
import { ListParameters, ListResult, SortDirection } from '@/types/baseTypes';
import Checkbox from '../Checkbox';
import SearchBar from '../SearchBar';
import Pagination from './Pagination';
import Loader from '../Loader';

interface ListProps<T> extends TableProps {
  renderRow: (row: T, index: number) => JSX.Element | JSX.Element[];
  columns: { id: string; label: string; fixed?: boolean }[];
  data: ListResult<T>;
  meta: ListParameters;
  onMetaChange: (meta: ListParameters) => void;
  setSelectedRows?: React.Dispatch<React.SetStateAction<T[]>>;
  selectedRows?: T[];
  showSelectAll?: boolean;
  pagination?: boolean;
  hideSearch?: boolean;
  loading?: boolean;
}
export function List<T>({
  renderRow,
  columns,
  meta,
  onMetaChange,
  data,
  selectedRows,
  setSelectedRows,
  showSelectAll,
  pagination = true,
  hideSearch = false,
  loading = false,
  ...otherProps
}: ListProps<T>) {
  const handlePageChange = (pageNumber: number) => {
    onMetaChange({
      ...meta,
      page: pageNumber,
    });
  };

  const handleSort = (sortDescriptor: SortDescriptor) => {
    const { column } = sortDescriptor;
    const newSortOrder =
      meta.sortBy === column && meta.sortOrder === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;

    onMetaChange({
      ...meta,
      sortBy: column,
      sortOrder: newSortOrder,
    });
  };

  const handleSearch = (searchQuery: string) => {
    onMetaChange({
      ...meta,
      search: searchQuery,
      page: 1,
    });
  };

  const handleSelectAll = () => {
    const allRows = data.data;
    const allSelected = selectedRows?.length === allRows.length;
    let newSelectedRows: T[] = [];
    if (allSelected) {
      newSelectedRows = [];
    } else {
      newSelectedRows = [...allRows];
    }
    setSelectedRows && setSelectedRows(newSelectedRows);
  };
  const modifiedColumns = showSelectAll
    ? [{ id: 'checkbox', label: 'Checkbox', fixed: false }, ...columns]
    : columns;
  const classNames = React.useMemo(
    () => ({
      th: ['text-md', 'first:rounded-none', 'last:rounded-none'],
      td: [
        // changing the rows border radius
        // first
        'text-md',
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  );

  return (
    <div>
      {!hideSearch && (
        <>
          <SearchBar
            type='text'
            placeholder='Search'
            className='my-3'
            value={meta.search || ''}
            onChange={handleSearch}
          />
          <Spacer y={4} />
        </>
      )}
      <Table
        classNames={classNames}
        aria-label='Controlled table example with dynamic content'
        onSortChange={handleSort}
        color='warning'
        // selectionMode='multiple'
        // onSelectionChange={(key: any) => {
        // }}
        sortDescriptor={{
          column: meta.sortBy,
          direction:
            meta.sortOrder === SortDirection.ASC ? 'ascending' : 'descending',
        }}
        className='scrollBar overflow-auto'
        {...otherProps}>
        <TableHeader columns={modifiedColumns}>
          {(item) => {
            if (item.id === 'checkbox') {
              return (
                <TableColumn
                  key='checkbox'
                  width={5}>
                  <Checkbox
                    isSelected={
                      selectedRows?.length === data.data.length &&
                      data.data.length > 0
                    }
                    isIndeterminate={
                      !!selectedRows &&
                      selectedRows.length > 0 &&
                      selectedRows.length < data.data.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableColumn>
              );
            }
            return (
              <TableColumn
                key={item.id}
                allowsSorting={!item.fixed}>
                {item.label}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Loader />}
          emptyContent='No data found'>
          {data.data.flatMap((row: T, index: number) => renderRow(row, index))}
        </TableBody>
      </Table>
      {pagination && !loading && data.pageData.total > 0 && (
        <Pagination
          meta={meta}
          total={data.pageData.total}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
