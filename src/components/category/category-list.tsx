'use client';
import Pagination from '@/components/ui/pagination';
import { ICategory, IPaginatorInfo, ImageInfo, SortOrder } from '@/types';
import Image from 'next/image';

import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { PaginatorInfo } from '@/types/utils';
import { MainTable } from '../table';
import { Tooltip } from '../common/Tooltip';
import { Icons } from '../ui/icons';
import Link from 'next/link';
import { useGlobalAlertStateStore } from '@/store/alerts';

type IProps = {
  categories: PaginatorInfo<ICategory>;
  onPagination: (key: number) => void;
};
const CategoryList = ({ categories, onPagination }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const setShowCategoryAlert = useGlobalAlertStateStore(
    state => state.setShowCategoryAlert
  );

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
      title: 'Name',
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 150,
    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',

      render: (image: ImageInfo, { name }: { name: string }) => {
        if (!image) return null;

        return (
          <Image
            src={image.img_url ?? '/'}
            alt={name}
            layout='fixed'
            width={30}
            height={30}
            className='rounded overflow-hidden'
          />
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
              className='w-8 text-red-500 cursor-auto'
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
          rowKey='id'
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
