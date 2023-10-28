"use client"
import {  UseFormReturn, useFieldArray } from 'react-hook-form';


import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { IProduct } from '@/types';
import { useGetAttributesQuery } from '@/hooks/attribute/useGetAttributes';
import { Card, CardHeader } from '@/components/ui/card';
import SelectInput from '@/components/ui/select-input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cartesian } from '@/utils/cartesian';


type IProps = {
  initialValues?: IProduct | null;
  shopId: string | undefined;
  productForm: UseFormReturn<any, any, undefined>

};

function filteredAttributes(attributes: any, variations: any) {
  let res = [];

  res = attributes?.filter((el: any) => {
    return !variations.find((element: any) => {
      return element?.attribute?._id === el?._id;
    });
  });
  return res;
}

function getCartesianProduct(values: any) {
  const formattedValues = values
    ?.map((v: any) =>
      v.value?.map((a: any) => ({ name: v.attribute.name, value: a.value }))
    )
    .filter((i: any) => i !== undefined);
  if (isEmpty(formattedValues)) return [];
  return cartesian(...formattedValues);
}

export default function ProductVariableForm({ shopId, initialValues,productForm }: IProps) {
  const { data, isLoading } = useGetAttributesQuery({
    shop: initialValues ? initialValues.shop._id : shopId,
  });
 
  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control: productForm.control,
    name: 'variations',
  });
  const cartesianProduct = getCartesianProduct(productForm.getValues('variations'));
  const variations = productForm.watch('variations');

  const attributes = data?.docs!
  return (
    <div className="flex flex-wrap my-5 sm:my-8">
       <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
    <h4 className="text-stone-800 font-semibold">Product Type</h4>
    <p>Select product type form here</p>
  </div>
  <div className="lg:w-2/3 w-full">

     <Card className="p-8 w-full">
        <div className="border-t border-dashed border-border-200 mb-5 md:mb-8">
          <CardHeader>
            Option
          </CardHeader>
          <div>
            {fields?.map((field: any, index: number) => {
              return (
                <div
                  key={field.id}
                  className="border-b border-dashed border-border-200 last:border-0 p-5 md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="mb-0">
                      option {index + 1}
                    </h1>
                    <button
                      onClick={() => remove(index)}
                      type="button"
                      className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                    >
                      remove
                    </button>
                  </div>

                  <div className="grid grid-cols-fit gap-5">
                    <div className="mt-5">
                      <Label>Attribute Name*</Label>
                      <SelectInput
                        name={`variations[${index}].attribute`}
                        defaultValue={attributes?.find(
                          (attr) => attr._id === field.attribute
                        )}
                        control={productForm.control}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option?._id}
                        options={
                          filteredAttributes(attributes, variations)!
                        }
                        isLoading={isLoading}
                      />
                    </div>

                    <div className="mt-5 col-span-2">
                      <Label>Attribute value*</Label>
                      <SelectInput
                        isMulti
                        name={`variations[${index}].value`}
                        control={productForm.control}
                        defaultValue={field.value}
                        getOptionLabel={(option: any) => option.value}
                        getOptionValue={(option: any) => option._id}
                        options={
                          productForm.watch(`variations[${index}].attribute`)?.values
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 md:px-8">
            <Button
              disabled={fields.length === attributes?.length}
              onClick={(e: any) => {
                e.preventDefault();
                append({ attribute: '', value: [] });
              }}
              type="button"
            >
              Add Option
            </Button>
          </div>

          {/* Preview generation section start */}
          {!!cartesianProduct?.length && (
            <div className="border-t border-dashed border-border-200 pt-5 md:pt-8 mt-5 md:mt-8">
              <h3 className="text-lg uppercase text-center px-5 md:px-8 mb-0">
                {cartesianProduct?.length} Variation Add 
              </h3>
              {cartesianProduct.map(
                (fieldAttributeValue: any, index: number) => {
                  return (
                    <div
                      key={`fieldAttributeValues-${index}`}
                      className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
                    >
                      <h2 className="!text-lg mb-8">
                        Name :{' '}
                        <span className="text-blue-600 font-normal">
                          {Array.isArray(fieldAttributeValue)
                            ? fieldAttributeValue?.map((a) => a.value).join('/')
                            : fieldAttributeValue.value}
                        </span>
                      </h2>
                      <TitleAndOptionsInput
                        register={productForm.register}
                        setValue={productForm.setValue}
                        index={index}
                        fieldAttributeValue={fieldAttributeValue}
                      />

                      <input
                        {...productForm.register(`variation_options.${index}.id`)}
                        type="hidden"
                      />

                      <div className="grid grid-cols-2 gap-5">
                      <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name={`variation_options.${index}.price`}
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                   <Input type={'number'} {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name={`variation_options.${index}.sale_price`}
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                   <Input type={'number'} {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name={`variation_options.${index}.sku`}
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Sku</FormLabel>
                  <FormControl>
                   <Input  {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name={`variation_options.${index}.quantity`}
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                   <Input type={'number'} {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>
                  
                      </div>
              
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </Card>
      </div>
    </div>
  );
}

export const TitleAndOptionsInput = ({
  fieldAttributeValue,
  index,
  setValue,
  register,
}: any) => {
  const title = Array.isArray(fieldAttributeValue)
    ? fieldAttributeValue.map((a) => a.value).join('/')
    : fieldAttributeValue.value;
  const options = Array.isArray(fieldAttributeValue)
    ? JSON.stringify(fieldAttributeValue)
    : JSON.stringify([fieldAttributeValue]);
  useEffect(() => {
    setValue(`variation_options.${index}.title`, title);
    setValue(`variation_options.${index}.options`, options);
  }, [fieldAttributeValue]);
  return (
    <>
      <input {...register(`variation_options.${index}.title`)} type="hidden" />
      <input
        {...register(`variation_options.${index}.options`)}
        type="hidden"
      />
    </>
  );
};
