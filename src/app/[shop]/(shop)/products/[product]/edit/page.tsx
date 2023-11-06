"use client"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import ProductForm from '@/components/forms/product/ProductForm'
import { Shell } from '@/components/shells/shell'
import Loader from '@/components/ui/loader/loader'
import { useProductQuery } from '@/hooks/product/useGetProduct'
import React from 'react'

type Params ={

  params:{
    shop:string,
    product:string
  }
}
const ProductEditPage = ({params:{shop,product}}:Params) => {
  const {data,isLoading}=useProductQuery(product as string)

if(isLoading) return <Loader  text='Loading'/>
  return (
    <Shell variant={'sidebar'}>
    <PageHeader>
      <PageHeaderHeading>
        Edit  Product
      </PageHeaderHeading>
      <PageHeaderDescription>
        Manage your Product
      </PageHeaderDescription>
    </PageHeader>

     <section>
      <ProductForm shop={shop} initialValues={data!} isShop={true}/>
     </section>
    </Shell>
  )
}

export default ProductEditPage