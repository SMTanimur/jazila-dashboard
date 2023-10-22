import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'
import AttributeForm from '@/components/forms/AttributeForm'
import { Shell } from '@/components/shells/shell'
import React from 'react'

type Params ={
  params:{
    shop:string
  }
}
const AttributeCreatePage = ({params:{shop}}:Params) => {
  return (
    <Shell variant={'sidebar'}>
    <PageHeader>
      <PageHeaderHeading>
        Create  Attribute
      </PageHeaderHeading>
      <PageHeaderDescription>
        Create a new Attribute
      </PageHeaderDescription>
    </PageHeader>

     <section>
      <AttributeForm shop={shop}/>
     </section>
    </Shell>
  )
}

export default AttributeCreatePage