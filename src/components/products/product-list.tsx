'use client';
import Pagination from '@/components/ui/pagination';
import {  IPaginatorInfo, IProduct, IShop, ImageInfo, SortOrder } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { PaginatorInfo } from '@/types/utils';
import { MainTable } from '../table';
import { Tooltip } from '../common/Tooltip';
import { Icons } from '../ui/icons';
import Link from 'next/link';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { Badge } from '../ui/badge';

type IProps = {
  products: PaginatorInfo<IProduct>;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const ProductsList = ({ products, onPagination,onOrder,onSort }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const setShowProductAlert = useGlobalAlertStateStore(
    state => state.setShowProductAlert
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
    hasNextPage: products?.hasNextPage,
    hasPrevPage: products?.hasPrevPage,
    limit: products?.limit,
    nextPage: products?.nextPage,
    page: products?.page,
    pagingCounter: products?.pagingCounter,
    prevPage: products?.prevPage,
    totalDocs: products?.totalDocs,
    totalPages: products?.totalPages,
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'left',
      width: 74,
      render: (image: ImageInfo, { name }: { name: string }) => (
        <Image
          src={image.img_url  }
          alt={name}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title:'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (type: any) => (
        <span className="whitespace-nowrap truncate">{type?.name}</span>
      ),
    },
    {
      title: 'Shop',
      dataIndex: 'shop',
      key: 'shop',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (shop: IShop) => (
        <span className="whitespace-nowrap truncate">{shop?.name}</span>
      ),
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'product_type',
      width: 120,
      align: 'center',
      render: (product_type: string) => (
        <span className="whitespace-nowrap truncate">{product_type}</span>
      ),
    },
    // {
    //   title: t('table:table-item-unit'),
    //   dataIndex: 'price',
    //   key: 'price',
    //   align: alignRight,
    //   width: 100,
    //   render: (value: number, record: Product) => {
    //     const { price } = usePrice({
    //       amount: value,
    //     });
    //     const { price: max_price } = usePrice({
    //       amount: record?.max_price as number,
    //     });
    //     const { price: min_price } = usePrice({
    //       amount: record?.min_price as number,
    //     });
    //     if (record?.product_type === ProductType.Variable) {
    //       return (
    //         <span
    //           className="whitespace-nowrap"
    //           title={`${min_price} - ${max_price}`}
    //         >{`${min_price} - ${max_price}`}</span>
    //       );
    //     } else {
    //       return (
    //         <span className="whitespace-nowrap" title={price}>
    //           {price}
    //         </span>
    //       );
    //     }
    //   },
    // },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (status: string) => (
        <Badge
          
          color={
            status.toLocaleLowerCase() === 'draft'
              ? 'bg-yellow-400'
              : 'bg-primary'
          }
        >
          {status}
          </Badge>
      ),
    },

    {
      title: 'Action',
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      width: 120,
      render: (id: string, options: IProduct) => (
        <div className='flex items-center gap-2'>
          <Tooltip content={'Delete'} placement='bottom-end'>
            <Icons.trash
              className='w-8 text-red-500 cursor-pointer'
              onClick={() => setShowProductAlert(true, id)}
            />
          </Tooltip>
          <Tooltip content={'Edit'} placement='bottom-end'>
            <Link href={`/admin/products/${options.slug}/edit`}>
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
          emptyText={'No products Found'}
          data={products.docs!}
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

export default ProductsList
