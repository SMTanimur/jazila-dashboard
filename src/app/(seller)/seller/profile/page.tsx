"use client"

import { Shell } from '@/components/shells/shell';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import AccountInformation from './components/AccountInformation';
import { IUser } from '@/types';
import AccountLoading from './loading';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';
 

export default function AccountPage() {
  const {  currentUser:me,isLoading } = useCurrentUser()

  if(isLoading){
    return AccountLoading()
  }
  
  return (
    <Shell variant='sidebar'>
      <PageHeader id='account-header' aria-labelledby='account-header-heading'>
        <PageHeaderHeading size='sm'>Account</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <section

        className='w-full overflow-hidden'
      >
        <AccountInformation me={me as IUser}/>
      </section>
    </Shell>
  );
}
