"use client"
import { Shell } from '@/components/shells/shell';


import dynamic from 'next/dynamic';
import React from 'react';
import ProfileEditComponent from './components/ProfileEditComponent';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header';



const ProfileEdit = () => {
 
  return (
    <Shell variant={'sidebar'} >
      <PageHeader id='profileEdit-header' aria-labelledby='profileEdit-header-heading'>
        <PageHeaderHeading size='sm'>Profile Edit</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your profile Edit settings
        </PageHeaderDescription>
      </PageHeader>
      <section>
          <ProfileEditComponent/>
      </section>
    </Shell>
  );
};

export default ProfileEdit;
