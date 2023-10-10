"use client"
import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  IPaginatorInfo,
} from '@/types';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { DataTableToolbar } from './data-table-toolbar';
import Pagination from '../pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationInfo?: IPaginatorInfo;
  onPagination?: (current: number) => void;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  newRowLink?: string;
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onPagination,
  paginationInfo,
  filterableColumns = [],
  searchableColumns = [],
  newRowLink,
  deleteRowsAction,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  // Table states
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
 


  // Handle server-side sorting


  // Handle server-side filtering
  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter(filter => {
          return searchableColumns.find(column => column.id === filter.id);
        })
      ),
      500
    )
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter(filter => {
    return filterableColumns.find(column => column.id === filter.id);
  });

  const table = useReactTable({
    data,
    columns,
    state: {
    
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <div className='w-full space-y-3 overflow-auto'>
      <DataTableToolbar
        table={table}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        newRowLink={newRowLink}
        deleteRowsAction={deleteRowsAction}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='whitespace-nowrap'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!!paginationInfo?.totalDocs && (
        <div className='flex justify-end items-center'>
          <Pagination
            total={paginationInfo?.totalDocs}
            current={paginationInfo?.pagingCounter}
            pageSize={paginationInfo?.limit}
            onChange={onPagination}
          />
        </div>
      )}
    </div>
  );
}
