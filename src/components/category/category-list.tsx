'use client';
import Pagination from '@/components/ui/pagination';
import { ICategory, IPaginatorInfo, ImageInfo, SortOrder } from '@/types';
import Image from 'next/image';

import { useState } from 'react';
import { PaginatorInfo } from '@/types/utils';
import { MainTable } from '../table';
import { Tooltip } from '../common/Tooltip';
import { Icons } from '../ui/icons';
import Link from 'next/link';
import { useGlobalAlertStateStore } from '@/store/alerts';
import * as categoriesIcon from '../icons/category';
import { getIcon } from '@/utils/get-icon';
import TitleWithSort from '../ui/title-with-sort';

type IProps = {
  categories: PaginatorInfo<ICategory>;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CategoryList = ({ categories, onPagination,onOrder,onSort }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const setShowCategoryAlert = useGlobalAlertStateStore(
    state => state.setShowCategoryAlert
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
    hasNextPage: categories?.hasNextPage,
    hasPrevPage: categories?.hasPrevPage,
    limit: categories?.limit,
    nextPage: categories?.nextPage,
    page: categories?.page,
    pagingCounter: categories?.pagingCounter,
    prevPage: categories?.prevPage,
    totalDocs: categories?.totalDocs,
    totalPages: categories?.totalPages,
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
      align: 'left',
      width: 150,
    },

    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      render: (icon: string) => {
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {getIcon({
              iconList: categoriesIcon,
              iconName: icon,
              className: 'w-5 h-5 max-h-full max-w-full',
            })}
          </span>
        );
      },
    },

    {
      title: 'Total Products',
      dataIndex: 'products_count',
      key: 'products_count',
      align: 'center',
      render: (products_count: number) => {
       
        return (
          <span className="flex items-center justify-center">
            {products_count}
          </span>
        );
      },
    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width:150,

      render: (image: ImageInfo, { name }: { name: string }) => {
        if (!image) return null;
        return (
          <div className="flex justify-center items-center">
          <Image
            src={image.img_url ?? '/'}
            alt={name}
            layout='fixed'
            width={30}
            height={30}
            className='rounded overflow-hidden'
          />
          </div>
        );
      },
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
      width: 120,
      render: (id: string, options: ICategory) => (
        <div className='flex items-center gap-2'>
          <Tooltip content={'Delete'} placement='bottom-end'>
            <Icons.trash
              className='w-8 text-red-500 cursor-pointer'
              onClick={() => setShowCategoryAlert(true, id)}
            />
          </Tooltip>
          <Tooltip content={'Edit'} placement='bottom-end'>
            <Link href={`/admin/categories/${options.slug}/edit`}>
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
          data={categories.docs!}
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

export default CategoryList;
