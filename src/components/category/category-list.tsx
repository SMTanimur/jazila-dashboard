'use client';
import Pagination from '@/components/ui/pagination';
import { ICategory, IPaginatorInfo, ImageInfo, SortOrder } from '@/types';
import Image from 'next/image';

import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { PaginatorInfo } from '@/types/utils';
import { MainTable } from '../table';

type IProps = {
  categories: PaginatorInfo<ICategory>;
  onPagination: (key: number) => void;
};
const CategoryList = ({
  categories,
  onPagination,
}: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;

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
    
    // {
    //   title: 'Action',
    //   dataIndex: 'slug',
    //   key: 'actions',
    //   align: 'right',
    //   width: 290,
    //   render: (slug: string, record: Category) => (
    //     <LanguageSwitcher
    //       slug={slug}
    //       record={record}
    //       deleteModalView='DELETE_CATEGORY'
    //       routes={Routes?.category}
    //     />
    //   ),
    // },
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
