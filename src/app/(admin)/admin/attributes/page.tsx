"use client"
import AttributeList from '@/components/attribute/attribute-list'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
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


const Attributes = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  function handlePagination(current: any) {
    setPage(current);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  const {data,isLoading}=useGetAttributesQuery({
    limit: 20,
    page,
    text: searchTerm,
     sortedBy,
    orderBy,
  })

  if(isLoading) return <Loader text='Loading'/>
  return (
    <Shell variant={'sidebar'}>
      <Card className='p-8'>
      <PageHeader className=' '>
     <PageHeaderHeading size='sm'>Atributes</PageHeaderHeading>
     <PageHeaderDescription>
        Manage your Attributes
     </PageHeaderDescription>
     </PageHeader>
    
      </Card>

      <AttributeList
        isShop={false}
        attributes={data!}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
       
      />
     
    </Shell>
  )
}

export default Attributes