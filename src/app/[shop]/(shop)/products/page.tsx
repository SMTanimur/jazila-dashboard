"use client"
import { PageHeader, PageHeaderHeading } from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useShopQuery } from '@/hooks/shops/useGetShop';
import { SortOrder } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react'

type Params = {
  params: {
    shop: string;
  };
};
const Attributes = ({params:{shop}}:Params) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  function handlePagination(current: any) {
    setPage(current);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  const {data:shopData}=useShopQuery(shop as string)


 
  return (
    <Shell variant={'sidebar'}>
      <Card className='p-8'>
      <PageHeader className='flex justify-between items-center '>
     <PageHeaderHeading size='sm'>Products</PageHeaderHeading>

     <div className='flex  '>
      <Button>
        <Link
          href={`/${shop}/products/create`}
          className='flex items-center gap-1'
        >
          <Icons.plus className='w-5 h-5' />
          <span>Create Product</span>
        </Link>
      </Button>

     </div>
     
     </PageHeader>
    
      </Card>

      
     
    </Shell>
  )
}

export default Attributes