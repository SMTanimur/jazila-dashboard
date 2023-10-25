
import React from 'react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import InputSelect from '../select/select';
import { useGetAllTypesQuery } from '@/hooks/group/useGetAllTypes';

type Props = {
  onTypeFilter: any
  className?: string;
};

export default function TypeFilter({ onTypeFilter, className }: Props) {


  const { data, isLoading: loading } = useGetAllTypesQuery();
  console.log('TYPES', data);

  return (
    <div className={cn('flex w-full', className)}>
      <div className="w-full">
        <Label>Filter by Group</Label>
        <InputSelect
          options={data!}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option._id}
          placeholder={'Filter by Group'}
          onChange={onTypeFilter}
        />
      </div>
    </div>
  );
}
