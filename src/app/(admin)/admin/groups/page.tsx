'use client';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import Search from '@/components/common/shared/search';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useGetTypesQuery } from '@/hooks/group/useGetTypes';
import Link from 'next/link';

import React, { useState } from 'react';

const GroupsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {data}=useGetTypesQuery({
    limit:10,
    text:searchTerm
  })
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  return (
    <Shell variant={'sidebar'}>
      <Card className='p-10'>
        <PageHeader className='flex flex-col md:flex-row gap-4 items-center md:justify-between'>
          <PageHeaderHeading>Shops</PageHeaderHeading>
          <div className='w-full md:w-[70%] flex flex-col md:flex-row items-center gap-4'>
            <Search onSearch={handleSearch} />
            <Button className='w-[200px] rounded-lg ' size={'lg'}>
            <Link href={'/admin/groups/create'} className='flex items-center gap-1'>
              <Icons.plus className='w-5 h-5' />
              <span>Create Group</span>
            </Link>
            </Button>
          </div>
             
        
        </PageHeader>
      </Card>

      <section></section>
    </Shell>
  );
};

export default GroupsPage;
