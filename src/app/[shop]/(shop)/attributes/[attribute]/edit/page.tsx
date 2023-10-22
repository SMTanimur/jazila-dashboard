"use client"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import AttributeForm from '@/components/forms/AttributeForm'
import { Shell } from '@/components/shells/shell'
import Loader from '@/components/ui/loader/loader'
import { useAttributeQuery } from '@/hooks/attribute/useGetAtrribute'
import React from 'react'

type Params ={

  params:{
    shop:string,
    attribute:string
  }
}
const AttributeCreatePage = ({params:{shop,attribute}}:Params) => {
  console.log(shop)
  const {data,isLoading}=useAttributeQuery(attribute as string)

if(isLoading) return <Loader  text='Loading'/>
  return (
    <Shell variant={'sidebar'}>
    <PageHeader>
      <PageHeaderHeading>
        Edit  Attribute
      </PageHeaderHeading>
      <PageHeaderDescription>
        Manage your Attribute
      </PageHeaderDescription>
    </PageHeader>

     <section>
      <AttributeForm shop={shop} initialData={data!}/>
     </section>
    </Shell>
  )
}

export default AttributeCreatePage