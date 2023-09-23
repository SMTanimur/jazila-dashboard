'use client';
import ShopCard from '@/components/shop/shop-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useShopsQuery } from '@/hooks/shops/useGetShops';
import React from 'react';

const Dashboard = () => {
  const { data } = useShopsQuery({ limit: 10 });
  return (
    <div className='p-3'>
      <Tabs defaultValue='my-shops' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='my-shops'>My Shops</TabsTrigger>
          <TabsTrigger value='message'>Message</TabsTrigger>
        </TabsList>
        <TabsContent value='my-shops'>
          <Card>
            <CardHeader>
              <CardTitle>My Shops</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when done.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-5 gap-5'>
                {data?.docs?.map((myShop: any, idx: number) => (
                  <ShopCard shop={myShop} key={myShop?._id} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='message'>
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
              <CardDescription>Change your password here.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div>Message</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
