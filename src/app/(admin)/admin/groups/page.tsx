'use client';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import Search from '@/components/common/shared/search';
import { GroupsTable } from '@/components/group/group-list';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import Loader from '@/components/ui/loader/loader';
import { useGetTypesQuery } from '@/hooks/group/useGetTypes';
import { IType, SortOrder } from '@/types';
import { PaginatorInfo } from '@/types/utils';
import Link from 'next/link';

import React, { useState } from 'react';

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { data, isLoading } = useGetTypesQuery({
    limit: 10,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
  });
  if (isLoading) return <Loader text='Loading...' />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <Shell variant={'sidebar'}>
      <Card className='p-10'>
        <PageHeader className='flex flex-col md:flex-row gap-4 items-center md:justify-between'>
          <PageHeaderHeading>Groups</PageHeaderHeading>
          <div className='w-full md:w-[70%] flex flex-col md:flex-row items-center gap-4'>
            <Search onSearch={handleSearch} />
            <Button className='w-[200px] rounded-lg ' size={'lg'}>
              <Link
                href={'/admin/groups/create'}
                className='flex items-center gap-1'
              >
                <Icons.plus className='w-5 h-5' />
                <span>Create Group</span>
              </Link>
            </Button>
          </div>
        </PageHeader>
      </Card>

      <section>
        <GroupsTable
          onPagination={handlePagination}
          data={data as PaginatorInfo<IType>}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </section>
    </Shell>
  );
};

export default GroupsPage;
