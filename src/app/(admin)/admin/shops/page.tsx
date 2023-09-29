'use client';
import {
  PageHeader,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import Search from '@/components/common/shared/search';
import { Shell } from '@/components/shells/shell';
import { ShopsTable } from '@/components/shop/shop-table';
import { Card } from '@/components/ui/card';
import Loader from '@/components/ui/loader/loader';
import { useShopsQuery } from '@/hooks/shops/useGetShops';
import { IPaginatorInfo, IShop, SortOrder } from '@/types';
import { PaginatorInfo } from '@/types/utils';

import React, { useState } from 'react';

const ShopsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { data, isLoading } = useShopsQuery({
    limit: 10,
    page: page,
    text: searchTerm,
    sortedBy,
    orderBy,
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
          <PageHeaderHeading>Shops</PageHeaderHeading>

          <Search onSearch={handleSearch} className=' w-full md:w-[70%] ' />
        </PageHeader>
      </Card>
      <ShopsTable
        onPagination={handlePagination}
        data={data as any}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </Shell>
  );
};

export default ShopsPage;
