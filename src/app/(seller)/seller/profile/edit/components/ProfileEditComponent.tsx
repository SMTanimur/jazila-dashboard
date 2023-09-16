'use client';

import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

import dynamic from 'next/dynamic';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';
import { IUser } from '@/types';

const AvatarEditForm = dynamic(() => import('./AvatarEditForm'));
const ProfileForm = dynamic(() => import('@/components/forms/ProfileForm'));

const ProfileEditComponent = () => {
  const { currentUser,isLoading } = useCurrentUser();
 
  return (
    <React.Fragment>
      <Card>
        <CardContent className='flex flex-col md:flex-row items-center gap-4  w-full'>
          <ProfileForm />
          <AvatarEditForm user={currentUser as unknown as IUser} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ProfileEditComponent;
