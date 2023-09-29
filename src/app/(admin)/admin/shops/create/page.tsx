import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import ShopForm from '@/components/forms/ShopForm'
import { Shell } from '@/components/shells/shell'
import React from 'react'

const CreateShopPage = () => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader>
        <PageHeaderHeading id='create-shop-header' aria-labelledby='shop-header-heading'>
         New Shop
        </PageHeaderHeading>
        <PageHeaderDescription>
        Add a new Shop to your account


        </PageHeaderDescription>
      </PageHeader>

      <section className="w-full ">
      
         <ShopForm/>
        
      </section>
      
    </Shell>
  )
}

export default CreateShopPage