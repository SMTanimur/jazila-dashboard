"use client"
import AttributeList from '@/components/attribute/attribute-list'
import { PageHeader, PageHeaderHeading } from '@/components/common/shared/page-header'
import { Shell } from '@/components/shells/shell'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import Loader from '@/components/ui/loader/loader'
import { useGetAttributesQuery } from '@/hooks/attribute/useGetAttributes'
import { useShopQuery } from '@/hooks/shops/useGetShop'
import { cn } from '@/lib/utils'
import { SortOrder } from '@/types'
import Link from 'next/link'
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


  const {data,isLoading}=useGetAttributesQuery({
    limit: 20,
    page,
    shop:shopData?._id,
    text: searchTerm,
     sortedBy,
    orderBy,
  })

  if(isLoading) return <Loader text='Loading'/>
  return (
    <Shell variant={'sidebar'}>
      <Card className='p-8'>
      <PageHeader className='flex justify-between items-center '>
     <PageHeaderHeading size='sm'>Atributes</PageHeaderHeading>

     <div className='flex  '>
      <Button>
        <Link
          href={`/${shop}/attributes/create`}
          className='flex items-center gap-1'
        >
          <Icons.plus className='w-5 h-5' />
          <span>Create Attribute</span>
        </Link>
      </Button>

     </div>
     
     </PageHeader>
    
      </Card>

      <AttributeList
        attributes={data!}
        shop={shop}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
       
      />
     
    </Shell>
  )
}

export default Attributes