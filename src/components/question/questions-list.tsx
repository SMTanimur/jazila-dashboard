'use client';
import { useGlobalAlertStateStore } from '@/store/alerts';
import { IPaginatorInfo, IProduct, IShop, IUser, SortOrder } from '@/types';
import { PaginatorInfo } from '@/types/utils';
import Image from 'next/image';
import { IQuestion } from '../../types';
import { Tooltip } from '../common/Tooltip';
import { MainTable } from '../table';
import { Icons } from '../ui/icons';
import Pagination from '../ui/pagination';

type IProps = {
  questions: PaginatorInfo<IQuestion>;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const QuestionList = ({ questions, onPagination,onOrder,onSort}: IProps) => {
  const rowExpandable = (record: any) => record.children?.length;

  const setShowQuestionAlert = useGlobalAlertStateStore(
    state => state.setShowQuestionAlert
  );

 


  const paginateInfo: IPaginatorInfo = {
    hasNextPage: questions?.hasNextPage,
    hasPrevPage: questions?.hasPrevPage,
    limit: questions?.limit,
    nextPage: questions?.nextPage,
    page: questions?.page,
    pagingCounter: questions?.pagingCounter,
    prevPage: questions?.prevPage,
    totalDocs: questions?.totalDocs,
    totalPages: questions?.totalPages,
  };

  const columns = [
  
    {
      title: 'User',
      className: 'cursor-pointer',
      dataIndex: 'user',
      key: 'user',
      align: 'left',
      width: 250,
      render: (user: IUser) => (
        <div
          className='flex items-center gap-2 '
          
        >
          <div className='max-w-[80px] w-full'>
            <Image
             src={user?.avatar}
             alt={user?.lastName}
             width={80}
             height={80}
            />

          </div>
          <p>{user.firstName} {user.lastName}</p>
        </div>
      ),
    },

    {
      title: 'Product',
      className: 'cursor-pointer',
      dataIndex: 'product',
      key: 'product',
      align: 'left',
      width: 250,
      render: (product: IProduct) => (
        <div
          className='flex items-center gap-2 '
          
        >
          <div className='max-w-[80px] w-full'>
            <Image
             src={product?.image?.img_url as string}
             alt={product.name}
             width={80}
             height={80}
            />

          </div>
          <p>{product.name}</p>
        </div>
      ),
    },

    {
      title: 'Questions',
      dataIndex: 'question',
      key: 'question',
      align: 'center',
      ellipsis: true,
      width: 350,
      render: (question:string) => (
        <div
          className='overflow-hidden truncate whitespace-nowrap'
       
        >
          {question}
        </div>
      ),
    },

    {
      title: 'Action',
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      width: 60,
      render: (id: string, options: IQuestion) => (
        <div className='flex items-center gap-2'>
          <Tooltip content={'Delete'} placement='bottom-end'>
            <Icons.trash
              className='w-8 text-red-500 cursor-pointer'
              onClick={() => setShowQuestionAlert(true, id)}
            />
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
          emptyText={'No Questions Found'}
          data={questions?.docs!}
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

export default QuestionList;
