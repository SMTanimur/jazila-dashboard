import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import ProductForm from '@/components/forms/ProductForm'
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

      <section className="w-full">
         <ProductForm/>
      </section>
      
    </Shell>
  )
}

export default CreateShopPage