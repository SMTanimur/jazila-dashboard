'use client';
import { Button } from '@/components/button';
import {
  PageHeader,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import Search from '@/components/common/shared/search';
import { Shell } from '@/components/shells/shell';
import { Icons } from '@/components/ui/icons';
import Link from 'next/link';
import React, { useState } from 'react';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  return (
    <Shell variant={'sidebar'}>
      <PageHeader className='flex flex-col md:flex-row gap-4 items-center md:justify-between'>
        <PageHeaderHeading>Categories</PageHeaderHeading>
        <div className='w-full md:w-[70%] flex flex-col md:flex-row items-center gap-4'>
          <Search onSearch={handleSearch} />
          <Button
            className='w-[200px] dark:text-white dark:hover:text-stone-950 text-stone-950 rounded-lg '
            size={'lg'}
            intent={'white-outline'}
          >
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
    </Shell>
  );
};

export default CategoriesPage;
