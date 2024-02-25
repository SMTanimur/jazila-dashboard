"use client"
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetAllCategoriesQuery } from '@/hooks/category/useGetAllCategories';
import { Label } from '@/components/ui/label';
import SelectInput from '@/components/ui/select-input';
import { ProductFormValues } from './ProductForm';




interface Props {
  control: Control<ProductFormValues, any>;
  setValue: any;
}

const ProductCategoryInput = ({ control, setValue }: Props) => {
  const type = useWatch({
    control,
    name: 'type',
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?._id && dirtyFields?.type?._id) {
      setValue('categories', []);
    }
  }, [dirtyFields?.type?._id, setValue, type?._id]);

  const { data, isLoading: loading } = useGetAllCategoriesQuery({
    limit: 999,
    page: 1,
    type: type?._id,
  });

  return (
    <div className="mb-5">
      <Label>Categories</Label>
      <SelectInput
        name="categories"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option?.name}
        getOptionValue={(option: any) => option?._id}
        // @ts-ignore
        options={data?.docs!}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductCategoryInput;
