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
import React from 'react';

const page = () => {
  return (
    <div className="p-3">
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
                Make changes to your account here. Click save when  done.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div>
                 My Shops Information
              </div>
            </CardContent>
           
          </Card>
        </TabsContent>
        <TabsContent value='message'>
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
              <CardDescription>
                Change your password here. 
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div>
                 Message
              </div>
            </CardContent>
      
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
