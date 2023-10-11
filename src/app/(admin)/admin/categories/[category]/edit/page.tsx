'use client';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import CategoryForm from '@/components/forms/CategoryForm';
import GroupForm from '@/components/forms/GroupForm';
import { Shell } from '@/components/shells/shell';
import Loader from '@/components/ui/loader/loader';
import { useCategoryQuery } from '@/hooks/category/useGetCategory';
import { useGroupQuery } from '@/hooks/group/useGetGroup';
import React from 'react';

type Params = {
  params: {
    category: string;
  };
};
const EditCategoryPage = ({ params: { category } }: Params) => {
  const { data, isLoading } = useCategoryQuery(category);
  if (isLoading) return <Loader showText text='Loading' />;

  return (
    <Shell variant={'sidebar'}>
      <PageHeader>
        <PageHeaderHeading
          id='shop-details-header'
          aria-labelledby='shop-header-heading'
        >
          Category Edit
        </PageHeaderHeading>
        <PageHeaderDescription>View your Category Details</PageHeaderDescription>

        <section>
          <CategoryForm initialValues={data} />
        </section>
      </PageHeader>
    </Shell>
  );
};

export default EditCategoryPage;
