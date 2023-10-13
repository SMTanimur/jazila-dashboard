'use client';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import GroupForm from '@/components/forms/GroupForm';
import { Shell } from '@/components/shells/shell';
import Loader from '@/components/ui/loader/loader';
import { useGroupQuery } from '@/hooks/group/useGetGroup';
import React from 'react';

type Params = {
  params: {
    group: string;
  };
};
const EditGroupPage = ({ params: { group } }: Params) => {
  const { data, isLoading } = useGroupQuery(group);
  if (isLoading) return <Loader showText text='Loading' />;

  return (
    <Shell variant={'sidebar'}>
      <PageHeader>
        <PageHeaderHeading
          id='shop-details-header'
          aria-labelledby='shop-header-heading'
        >
          Group Edit
        </PageHeaderHeading>
        <PageHeaderDescription>View your Group Details</PageHeaderDescription>

        <section>
          <GroupForm initialData={data} />
        </section>
      </PageHeader>
    </Shell>
  );
};

export default EditGroupPage;
