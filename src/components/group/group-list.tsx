'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { catchError } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { IPaginatorInfo, IShop, IType, SortOrder } from '@/types';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { Icons } from '../ui/icons';
import { DataTable } from '../ui/data-table/data-table';
import { useShop } from '@/hooks/shops/useShop';
import { PaginatorInfo } from '@/types/utils';
import { useGlobalAlertStateStore } from '@/store/alerts';

import { Tooltip } from '../common/Tooltip';
import { ArrowUpDown } from 'lucide-react';

type ShopsTableProps = {
  data: PaginatorInfo<IType>;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
export function GroupsTable({
  data,
  onPagination,
  onSort,
  onOrder,
}: ShopsTableProps) {
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const setShowGroupAlert = useGlobalAlertStateStore(
    state => state.setShowAlert
  );

  const [sortingObj, setSortingObj] = React.useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groupData = data.docs as IType[];
  const { attemptToDeleteShop, shopDeleteLoading } = useShop();

  const paginateInfo: IPaginatorInfo = {
    hasNextPage: data?.hasNextPage,
    hasPrevPage: data?.hasPrevPage,
    limit: data?.limit,
    nextPage: data?.nextPage,
    page: data?.page,
    pagingCounter: data?.pagingCounter,
    prevPage: data?.prevPage,
    totalDocs: data?.totalDocs,
    totalPages: data?.totalPages,
  };

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IType, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={value => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds(prev =>
                prev.length === groupData.length
                  ? []
                  : groupData.map(row => row._id)
              );
            }}
            aria-label='Select all'
            className='translate-y-[2px]'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => {
              row.toggleSelected(!!value);
              setSelectedRowIds(prev =>
                value
                  ? [...prev, row.original._id]
                  : prev.filter(id => id !== row.original._id)
              );
            }}
            aria-label='Select row'
            className='translate-y-[2px]'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: '_id',
        id: 'index',
        header: ({ column, }) => {
          return <DataTableColumnHeader column={column} title='ID' />;
        },
      },

      {
        accessorKey: 'name',
        id: 'name',
        header: ({ column,header }) => {
          return (
            <Button
              variant='ghost'
              className='hover:bg-muted hover:text-foreground'
              onClick={() =>
                () => column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Name
              <ArrowUpDown className='ml-2 h-4 min-h-[1rem] w-4 min-w-[1rem]' />
            </Button>
          );
        },
      },

      {
        id: 'actions',

        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Actions' />
        ),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Tooltip content={'Delete'} placement='bottom-end'>
              <Icons.trash
                className='w-8 text-red-500'
                onClick={() => setShowGroupAlert(true, row.original._id)}
              />
            </Tooltip>
            <Tooltip content={'Edit'} placement='bottom-end'>
              <Link href={`/admin/groups/${row.original.slug}edit`}>
                <Icons.pencil className='w-8 text-stone-300' />
              </Link>
            </Tooltip>
          </div>
        ),
      },
    ],
    [data, shopDeleteLoading, pathname, router, searchParams]
  );

  function deleteSelectedRows() {
    toast.promise(
      Promise.all(selectedRowIds.map(id => attemptToDeleteShop(id))),
      {
        loading: 'Deleting...',
        success: () => {
          setSelectedRowIds([]);
          return 'Products deleted successfully.';
        },
        error: (err: unknown) => {
          setSelectedRowIds([]);
          return catchError(err);
        },
      }
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data?.docs}
      onPagination={onPagination}
      paginationInfo={paginateInfo}
      newRowLink={`/dashboard/stores/products/new`}
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  );
}
