import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import ProductForm from '@/components/forms/product/ProductForm'
import { Shell } from '@/components/shells/shell'
import React from 'react'

type Params ={
  params:{
    shop:string
  }
}
const ProductCreatePage = ({params:{shop}}:Params) => {
  return (
    <Shell variant={'sidebar'}>
    <PageHeader>
      <PageHeaderHeading>
        Create  Product
      </PageHeaderHeading>
      <PageHeaderDescription>
        Create a new Product
      </PageHeaderDescription>
    </PageHeader>

     <section>
      <ProductForm shop={shop}/>
     </section>
    </Shell>
  )
}

export default ProductCreatePage