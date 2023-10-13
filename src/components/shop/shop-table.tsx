'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { catchError, cn, formatDate, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IPaginatorInfo, IPaymentInfo, IShop, SortOrder } from '@/types';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { Icons } from '../ui/icons';
import { DataTable } from '../ui/data-table/data-table';
import { useShop } from '@/hooks/shops/useShop';
import { Badge } from '../ui/badge';
import { PaginatorInfo } from '@/types/utils';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { useGlobalModalStateStore } from '@/store/modal';
import { Tooltip } from '../common/Tooltip';

type ShopsTableProps = {
  data: PaginatorInfo<IShop>;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
export function ShopsTable({
  data,
  onPagination,
  onSort,
  onOrder,
}: ShopsTableProps) {
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const setShowShopAlert = useGlobalAlertStateStore(
    state => state.setShowAlert
  );

  const setShopModal = useGlobalModalStateStore(
    state => state.setShopApproveModal
  );
  const showShopModal = useGlobalModalStateStore(state => state.modalData);
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
  const shopData = data.docs;
  const { attemptToDeleteShop, shopDeleteLoading } = useShop();

  const paginateInfo: IPaginatorInfo = {
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage,
    limit: data.limit,
    nextPage: data.nextPage,
    page: data.page,
    pagingCounter: data.pagingCounter,
    prevPage: data.prevPage,
    totalDocs: data.totalDocs,
    totalPages: data.totalPages,
  };

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IShop, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={value => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedRowIds(prev =>
                prev.length === shopData.length
                  ? []
                  : shopData.map(row => row._id)
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
        accessorKey: 'logo',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Logo' />
        ),
        cell: ({ cell }) => {
          const logo = cell.getValue() as IShop['logo'];
          return (
            <img
              src={logo?.img_url}
              alt={logo?.img_id}
              className='h-8 w-8 rounded-sm object-cover'
            />
          );
        },
      },
      {
        accessorKey: 'name',
        header: ({ column }) => {
          const owner = column.getAutoSortDir() as IShop['name'];
          return (
            <Button variant='ghost' onClick={() => onHeaderClick(owner)}>
              <DataTableColumnHeader column={column} title='Name' />
            </Button>
          );
        },
      },
      {
        accessorKey: 'owner',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Owner Name' />;
        },
        cell: ({ cell }) => {
          const owner = cell.getValue() as IShop['owner'];
          return (
            <Badge variant='outline' className='capitalize'>
              {owner.firstName} {owner.lastName}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'products_count',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Products' />
        ),
      },

      {
        accessorKey: 'orders_count',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Orders' />
        ),
        enableColumnFilter: false,
      },
      {
        accessorKey: 'is_active',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Status' />
        ),
        cell: ({ cell }) => {
          const isActive = cell.getValue() as IShop['is_active'];
          return (
            <Badge
              className={cn(
                'capitalize',
                isActive ? 'bg-green-600 ' : 'bg-red-500'
              )}
            >
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          );
        },
        enableColumnFilter: false,
      },

      {
        id: 'actions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Actions' />
        ),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <div className=''>
              {row.original.is_active ? (
                <Tooltip content={'DisApproved'} placement='top'>
                <Button
                  onClick={() => setShowShopAlert(true, row.original._id)}
                  variant={'danger'}
                  size={'icon'}
                >
                  <Icons.close className='w-4' />
                </Button>
                </Tooltip>
              ) : (
                <Tooltip content={'Approved'} placement='top'>
                <div className='relative'>
                  <Button
                    onClick={() => setShopModal(true, row.original._id)}
                    size={'icon'}
                  >
                    <Icons.check className='w-4' />
                  </Button>
                </div>
                </Tooltip>
                
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label='Open menu'
                  variant='ghost'
                  className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
                >
                  <Icons.moreHorizontal
                    className='h-4 w-4'
                    aria-hidden='true'
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[160px]'>
                <DropdownMenuItem asChild>
                  <Link href={`/${row.original.slug}`}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    startTransition(() => {
                      row.toggleSelected(false);

                      attemptToDeleteShop(row.original._id);
                    });
                  }}
                  disabled={shopDeleteLoading}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
      data={data.docs}
      onPagination={onPagination}
      paginationInfo={paginateInfo}
      newRowLink={`/dashboard/stores/products/new`}
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  );
}
