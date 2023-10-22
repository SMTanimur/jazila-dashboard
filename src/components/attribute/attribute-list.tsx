'use client';
import { MainTable } from '../table';
import { Tooltip } from '../common/Tooltip';
import { Icons } from '../ui/icons';
import Link from 'next/link';
import Pagination from '../ui/pagination';
import { IAttribute, IPaginatorInfo, IShop, SortOrder } from '@/types';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { PaginatorInfo } from '@/types/utils';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';
import { useState } from 'react';
import TitleWithSort from '../ui/title-with-sort';

type IProps = {
  attributes: PaginatorInfo<IAttribute>;
  onPagination: (key: number) => void;
  shop?:string
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const AttributeList = ({ attributes, onPagination,shop,onOrder,onSort }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const {currentUser}=useCurrentUser()
  const isAdmin = currentUser?.role === 'admin';
  const setShowAttributeAlert = useGlobalAlertStateStore(
    state => state.setShowAttributeAlert
  );

  const [sortingObj, setSortingObj] = useState<{
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

  const paginateInfo: IPaginatorInfo = {
    hasNextPage: attributes?.hasNextPage,
    hasPrevPage: attributes?.hasPrevPage,
    limit: attributes?.limit,
    nextPage: attributes?.nextPage,
    page: attributes?.page,
    pagingCounter: attributes?.pagingCounter,
    prevPage: attributes?.prevPage,
    totalDocs: attributes?.totalDocs,
    totalPages: attributes?.totalPages,
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      ellipsis: true,
      align: 'center',
      width: 100,
    },
    {
      title: (
        <TitleWithSort
          title={'Name'}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: () => onHeaderClick('name'),
      align: 'left',
      width: 150,
    },

    {
      title: 'Shop',
      dataIndex: 'shop',
      key: 'slug',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (shop: IShop) => (
        <div
          className='overflow-hidden truncate whitespace-nowrap'
          title={shop?.name}
        >
          {shop.name}
        </div>
      ),
    },

   

    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (slug: any) => (
        <div
          className='overflow-hidden truncate whitespace-nowrap'
          title={slug}
        >
          {slug}
        </div>
      ),
    },

    {
      title: 'Action',
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      width: 60,
      render: (id: string, options: IAttribute) => (
        <div className='flex items-center gap-2'>
          <Tooltip content={'Delete'} placement='bottom-end'>
            <Icons.trash
              className='w-8 text-red-500 cursor-pointer'
              onClick={() => setShowAttributeAlert(true, id)}
            />
          </Tooltip>
          <Tooltip content={'Edit'} placement='bottom-end'>
            <Link href={ isAdmin ? `/admin/attributes/${options.slug}/edit` : `/${shop}/attributes/${options.slug}/edit`}>
              <Icons.pencil className='w-8 text-stone-300' />
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='mb-6 overflow-hidden rounded shadow'>
        <MainTable
          //@ts-ignore
          columns={columns}
          emptyText={'No Categories Found'}
          data={attributes?.docs!}
          rowKey='slug'
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => ' ',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginateInfo?.totalDocs && (
        <div className='flex items-center justify-end'>
          <Pagination
            total={paginateInfo?.totalDocs}
            current={paginateInfo?.pagingCounter}
            pageSize={paginateInfo?.limit}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default AttributeList;
