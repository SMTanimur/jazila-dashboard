"use client"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header';
import ShopForm from '@/components/forms/ShopForm';
import { Shell } from '@/components/shells/shell';
import { useShopQuery } from '@/hooks/shops/useGetShop';
import React from 'react'
type Params = {
  params: {
    shop: string
  };
};

const ShopEditPage = ({params:{shop}}:Params) => {
  
  const {data,isLoading}=useShopQuery(shop)
   if(isLoading){
    return <div>Loading...</div>
   }
  return (
    <Shell variant={'sidebar'}>
       <PageHeader>
        <PageHeaderHeading id='shop-details-header' aria-labelledby='shop-header-heading'>
         Shop Edit
        </PageHeaderHeading>
        <PageHeaderDescription>
        View your Shop Details
        

        </PageHeaderDescription>

        <section>
          <ShopForm initialData={data}/>
        </section>
      </PageHeader>


      

    </Shell>
  )
}

export default ShopEditPage