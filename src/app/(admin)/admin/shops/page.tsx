import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import { Shell } from '@/components/shells/shell'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

const ShopsPage = () => {
  return (
    <Shell variant={'sidebar'}>

      <Card className='p-10'>
      <PageHeader className='flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center'>
      <PageHeaderHeading id='create-shop-header' aria-labelledby='shop-header-heading'>
         Shops
        </PageHeaderHeading>
        <PageHeaderDescription size={'lg'} className='w-full'>
       
       <Input />


        </PageHeaderDescription>
      </PageHeader>
      </Card>
      

    </Shell>
  )
}

export default ShopsPage