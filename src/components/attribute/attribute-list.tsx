'use client';
import { MainTable } from '../table';
import { Tooltip } from '../common/Tooltip';
import { Icons } from '../ui/icons';
import Link from 'next/link';
import Pagination from '../ui/pagination';
import { IAttribute, IPaginatorInfo, IShop } from '@/types';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { PaginatorInfo } from '@/types/utils';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';

type IProps = {
  attributes: PaginatorInfo<IAttribute>;
  onPagination: (key: number) => void;
  shop?:string
};
const AttributeList = ({ attributes, onPagination,shop }: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;
  const {currentUser}=useCurrentUser()
  const isAdmin = currentUser?.role === 'admin';
  const setShowAttributeAlert = useGlobalAlertStateStore(
    state => state.setShowAttributeAlert
  );

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
      title: 'Name',
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
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
