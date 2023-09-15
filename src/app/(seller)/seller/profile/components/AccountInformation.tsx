
'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { IAddress, IUser } from '@/types';
import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import React  from 'react';

type AccountProps = {
  me: IUser;
};

const AccountInformation = ({me}:AccountProps) => {
 
 

  return (
    <div className='flex md:flex-row flex-col items-center gap-6 '>
      <Card className=' p-6 w-full min-h-[355px]'>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <Avatar className='w-[100px] h-[100px]'>
              <AvatarImage src={me?.avatar} alt={me?.lastName} />
              <AvatarFallback>{me?.lastName}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-center gap-1'>
              <p className='text-2xl font-semibold leading-none tracking-tight'>
                {me?.firstName} {me?.lastName}
              </p>
              <h6 className='text-sm text-muted-foreground'>{me?.email}</h6>
            </div>

            <Button variant={'secondary'}>
              <Link href={'/seller/profile/edit'}>Edit Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInformation;
