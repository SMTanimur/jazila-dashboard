"use client"
import AttributeList from '@/components/attribute/attribute-list'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import SortForm from '@/components/common/sort-form'
import { Shell } from '@/components/shells/shell'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import Loader from '@/components/ui/loader/loader'
import { useGetAttributesQuery } from '@/hooks/attribute/useGetAttributes'
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
      
      <AttributeList
        attributes={data!}
        onPagination={handlePagination}
       
      />
     
    </Shell>
  )
}

export default Attributes