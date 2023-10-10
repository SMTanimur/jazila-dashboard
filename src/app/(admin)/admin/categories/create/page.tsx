import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import CategoryForm from '@/components/forms/CategoryForm';
import { Shell } from '@/components/shells/shell';
import React from 'react';

const CreateCategoryPage = () => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader>
        <PageHeaderHeading
          id='create-category-header'
          aria-labelledby='category-header-heading'
        >
          New Category
        </PageHeaderHeading>
        <PageHeaderDescription>Add a new Category</PageHeaderDescription>
      </PageHeader>

      <section className='w-full '>
        <CategoryForm />
      </section>
    </Shell>
  );
};

export default CreateCategoryPage;
