'use client';
import CategoryList from '@/components/category/category-list';
import {
  PageHeader,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import Search from '@/components/common/shared/search';
import SortForm from '@/components/common/sort-form';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Loader from '@/components/ui/loader/loader';
import { useGetCategoriesQuery } from '@/hooks/category/useGetCategories';
import { cn } from '@/lib/utils';
import { SortOrder } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };
  const {
    data,
    isLoading: loading,
    error,
  } = useGetCategoriesQuery({
    limit: 20,
    page,
    type,
    text: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={'Loading'} />;
  // if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <Shell variant={'sidebar'}>
      <PageHeader className='flex flex-col md:flex-row gap-4 items-center md:justify-between'>
        <PageHeaderHeading>Categories</PageHeaderHeading>
        <div className='w-full md:w-[70%] flex flex-col md:flex-row items-center gap-4'>
          <Search onSearch={handleSearch} placeholder='Search By Name' />
          <Button className='w-[200px] px-0 ' size={'default'}>
            <Link
              href={'/admin/categories/create'}
              className='flex items-center gap-1'
            >
              <Icons.plus className='w-5 h-5' />
              <span>Create Category</span>
            </Link>
          </Button>
        </div>
      </PageHeader>
      <div
          className={cn('w-full flex transition', {
            'h-auto visible': visible,
            'h-0 invisible': !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            
            <SortForm
              className="w-full md:w-1/2 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { id: 1, value: 'name', label: 'Name' },
                { id: 2, value: 'createdAt', label: 'Created At' },
                { id: 3, value: 'updatedAt', label: 'Updated At' },
              ]}
            />
          </div>
        </div>
      
      <CategoryList
        categories={data!}
        onPagination={handlePagination}
       
      />
    </Shell>
  );
};

export default CategoriesPage;
