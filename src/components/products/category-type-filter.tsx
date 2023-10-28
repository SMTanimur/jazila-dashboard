

import { useGetAllTypesQuery } from '@/hooks/group/useGetAllTypes';
import { cn } from '@/lib/utils';
import React from 'react';
import { Label } from '../ui/label';
import SelectInput from '../ui/select-input';
import InputSelect from '../select/select';
import { useGetCategoriesQuery } from '@/hooks/category/useGetCategories';

type Props = {
  onCategoryFilter:any
  onTypeFilter: any
  className?: string;
  type?: string;
};

export default function CategoryTypeFilter({
  onTypeFilter,
  onCategoryFilter,
  className,
  type,
}: Props) {


  const { data, isLoading: loading } = useGetAllTypesQuery({limit:100});
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoriesQuery(
    {
      limit: 999,
      ...(type ? { type } : {}),
    }
  );

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full',
        className
      )}
    >
      <div className="w-full">
        <Label>Filter By Group</Label>
        <InputSelect
          options={data!}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={'Filter by Group'}
          onChange={onTypeFilter}
        />
      </div>
      <div className="w-full">
        <Label>Filter By Category</Label>
        <InputSelect
          options={categoryData?.docs!}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder='Filter by Category'
          isLoading={categoryLoading}
          onChange={onCategoryFilter}
        />
      </div>
    </div>
  );
}
