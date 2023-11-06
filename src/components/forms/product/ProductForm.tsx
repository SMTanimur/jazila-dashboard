"use client"
import React from 'react'
import { Card } from '../../ui/card'
import { IAttributeValue, ICategory, IProduct, ITag, IType, ImageInfo, ProductStatus, ProductType, UpdateProduct, VariationOption } from '@/types';
import { useForm } from 'react-hook-form';
import groupBy from 'lodash/groupBy';
import { cloneDeep, orderBy, sum } from 'lodash';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, UncontrolledFormMessage } from '../../ui/form';
import { useProduct } from '@/hooks/product/useProduct';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/user/useCurrentUser';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useShopQuery } from '@/hooks/shops/useGetShop';
import FileDialog from '@/components/common/shared/file-dialog';
import { IUploadedImage } from '@/services/upload.service';
import FilesDialog from '@/components/common/shared/files.dialog';
import ProductGroupInput from './product-group-input';
import ProductCategoryInput from './product-category-input';
import ProductTagInput from './product-tag-input';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ProductTypeInput from './product-type-input';
import ProductSimpleForm from './product-simple-form';
import ProductVariableForm from './product-variable-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { getFormattedVariations } from './form-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { productValidationSchema } from '@/validations/product';

type Variation = {
  formName: number;
};
export type FormValues = {
  sku: string;
  name: string;
  type: IType;
  product_type: ProductType;
  description: string;
  unit: string;
  price: number;
  min_price: number;
  max_price: number;
  sale_price: number;
  quantity: number;
  categories: ICategory[];
  tags: ITag[];
  in_stock: boolean;
  is_taxable: boolean;
  image:ImageInfo
  gallery: ImageInfo[];
  status: ProductStatus;
  width: string;
  height: string;
  length: string;
  isVariation: boolean;
  variations: Variation[];
  variation_options: IProduct['variation_options'];
  [key: string]: any;
};
const defaultValues = {
  sku: '',
  name: '',
  type: '',
  productTypeValue: { name: 'Simple Product', value: ProductType.Simple },
  description: '',
  unit: '',
  price: '',
  min_price: 0.0,
  max_price: 0.0,
  sale_price: '',
  quantity: '',
  categories: [],
  tags: [],
  in_stock: true,
  is_taxable: false,
  image: [],
  gallery: [],
  status: ProductStatus.Publish,
  width: '',
  height: '',
  length: '',
  isVariation: false,
  variations: [],
  variation_options: [],
};

const productType = [
  { name: 'Simple Product', value: ProductType.Simple },
  { name: 'Variable Product', value: ProductType.Variable },
];



function processOptions(options: any) {
  try {
    return JSON.parse(options);
  } catch (error) {
    return options;
  }
}

function calculateMaxMinPrice(variationOptions: any) {
  if (!variationOptions || !variationOptions.length) {
    return {
      min_price: null,
      max_price: null,
    };
  }
  const sortedVariationsByPrice = orderBy(variationOptions, ['price']);
  const sortedVariationsBySalePrice = orderBy(variationOptions, ['sale_price']);
  return {
    min_price:
      sortedVariationsBySalePrice?.[0].sale_price <
      sortedVariationsByPrice?.[0]?.price
        ? Number(sortedVariationsBySalePrice?.[0].sale_price)
        : Number(sortedVariationsByPrice?.[0]?.price),
    max_price: Number(
      sortedVariationsByPrice?.[sortedVariationsByPrice?.length - 1]?.price
    ),
  };
}

function calculateQuantity(variationOptions: any) {
  return sum(
    variationOptions?.map(({ quantity }: { quantity: number }) => quantity)
  );
}
interface ProductFormProps {
  initialValues?: IProduct | null;
    shop?: string
    isShop?:boolean

}
const ProductForm = ({initialValues,shop,isShop=true}:ProductFormProps) => {
  const {data}=useShopQuery(shop as string)
  const shopId=data?._id
const queryClient=useQueryClient()
const router = useRouter()
  const {ProductCreateLoading,attemptProductCreate,ProductUpdateLoading,ProductUpdateMutation}=useProduct({shop})


   const attemptProductUpdate=async (data:UpdateProduct)=>{
      toast.promise(ProductUpdateMutation({variables:{id:initialValues?._id as string,input:data}}),{
        loading: 'updating...',
      success:( data:any) => {
        queryClient.invalidateQueries(['products']);
        router.push( isShop ?  `/${shop}/products` : `/admin/products`);
        return <b>{data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
      })
   }
  const productForm = useForm<FormValues>({
    // resolver: zodResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? cloneDeep({
          ...initialValues,
          isVariation:
            initialValues.variations?.length &&
            initialValues.variation_options?.length
              ? true
              : false,
          productTypeValue: initialValues.product_type
            ? productType.find(
                (type) => initialValues.product_type === type.value
              )
            : productType[0],
            ...(initialValues.product_type === ProductType.Variable && {
              variations: getFormattedVariations(initialValues.variations),
              variation_options: initialValues.variation_options?.map(({ ...option }: any) => {
                return {
                  ...option,
                };
              }),
            }),
        })
      : defaultValues,
  });


  const onSubmit = async (values: FormValues) => {
    const { type } = values;
    const inputValues: any = {
      description: values.description,
      height: values.height,
      length: values.length,
      name: values.name,
      sku: values.sku,
      status: values.status,
      unit: values.unit,
      width: values.width,
      quantity:
        values?.productTypeValue?.value === ProductType.Simple
          ? values?.quantity
          : calculateQuantity(values?.variation_options),
      product_type: values.productTypeValue?.value,
      type: type?._id,
      ...(initialValues ? { shop: initialValues?.shop._id } : { shop: shopId }),
      ...(productTypeValue?.value === ProductType.Simple
        ? {
            price: Number(values.price),
            sale_price: values.sale_price ? Number(values.sale_price) : null,
          }
        : {}),
      categories: values?.categories?.map((c) => c._id),
      tags: values?.tags?.map((t) => t._id),
      image: values?.image,
      gallery: values.gallery,
      ...(productTypeValue?.value === ProductType.Variable
        ? {
            variations: values?.variations?.flatMap(({ value }: any) => {
              return value?.map(({ id, _id }: any) => id ?? _id);
            }),
          }
        : {}),
      ...(productTypeValue?.value === ProductType.Variable
        ? {
            variation_options: {
              upsert: values?.variation_options
                ?.map(({ options, ...rest }: any) => ({
                  ...rest,
                  options: processOptions(options).map(
                    ({ name, value }: VariationOption) => ({
                      name,
                      value,
                    })
                  ),
                }))
                .filter((val) => val !== null),
              delete: initialValues?.variation_options
                ?.map((initialVariationOption) => {
                  const find = values?.variation_options?.find(
                    (variationOption:any) =>
                      variationOption?._id === initialVariationOption?._id
                  );
                  if (!find) {
                    return initialVariationOption?._id;
                  }
                })
                .filter((item) => item !== undefined),
            },
          }
        : {
            variations: [],
            variation_options: {
              upsert: [],
              delete: initialValues?.variation_options?.map(
                (variation) => variation?._id
              ),
            },
          }),
      ...(productTypeValue?.value === ProductType.Variable && {
        ...calculateMaxMinPrice(values?.variation_options),
      }),
    };

    if (initialValues) {
      attemptProductUpdate(inputValues);
    } else {
      attemptProductCreate(inputValues);
    }
  };
  const productTypeValue = productForm.watch('productTypeValue');
  return (
    <React.Fragment>
        <Form {...productForm}>
        <form
          className="grid gap-10 w-full"
          onSubmit={  (...args) =>
            void productForm.handleSubmit( onSubmit)(...args)
          
          }
        >

      <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Feature Image</h4>
              <p>Upload your product feature image from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Feature Image</FormLabel>

                    <FormControl>
                      <FileDialog
                        setValue={productForm.setValue}
                        name="image"
                        maxFiles={1}
                        maxSize={1024 * 1024 * 4}
                        multiple={false}
                        value={
                          initialValues
                            ? (initialValues.image as IUploadedImage)
                            : null
                        }
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={productForm.formState.errors.image?.message as string}
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>

          <div className='border-dotted w-full border-2 ' />


          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Gallary Image</h4>
              <p>Upload your product Gallary image from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Gallary</FormLabel>

                    <FormControl>
                      <FilesDialog
                        setValue={productForm.setValue}
                        name="gallery"
                        maxFiles={5}
                        maxSize={1024 * 1024 * 4}
                        multiple={true}
                        value={
                          initialValues
                            ? (initialValues.gallery as IUploadedImage[])
                            : null
                        }
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={productForm.formState.errors?.gallery?.message as string}
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>

          <div className='border-dotted w-full border-2 ' />

          <div className="flex  flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Groups & Categories</h4>
              <p>Select products groups and categories from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full ">
              
                <ProductGroupInput
                
                control={productForm.control}
                error={productForm.formState.errors?.type?.message as string}
              />

              <ProductCategoryInput control={productForm.control} setValue={productForm.setValue} />

              <ProductTagInput control={productForm.control} setValue={productForm.setValue} />
  
              </Card>
            </div>
          </div>


          <div className='border-dotted w-full border-2 ' />

<div className="flex  flex-col items-center gap-4 w-full lg:flex-row">
  <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
    <h4 className="text-stone-800 font-semibold">Descriptons</h4>
    <p>Add your product description and necessary information from here</p>
  </div>
  <div className="lg:w-2/3 w-full">
    <Card className="p-8  w-full ">
    
    <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name="name"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                   <Input {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name="unit"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                   <Input {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>
          <div className="my-4">
                  <FormField
                  control={productForm.control}
                  name="description"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                   <Textarea {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className='my-4'>
          <FormField
          control={productForm.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="publish" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Publish
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="draft" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Draft
                    </FormLabel>
                  </FormItem>
                
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          </div>
    </Card>
  </div>
</div>
   
<div className='border-dotted w-full border-2 ' />
<div className="flex flex-col items-center gap-4 w-full lg:flex-row">
  <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
    <h4 className="text-stone-800 font-semibold">Product Type</h4>
    <p>Select product type form here</p>
  </div>
  <div className="lg:w-2/3 w-full">
  <ProductTypeInput />
    
  </div>
</div>
<div className='border-dotted w-full border-2 ' />

 {/* Simple Type */}
 {productTypeValue?.value === ProductType.Simple && (
            <ProductSimpleForm initialValues={initialValues} control={productForm.control} />
          )}

           {/* Variation Type */}
           {productTypeValue?.value === ProductType.Variable && (
            <ProductVariableForm
              shopId={shopId}
              productForm={productForm}
              initialValues={initialValues}
            />
          )}

<div className="flex items-end justify-end">
            <Button
              disabled={ProductCreateLoading || ProductUpdateLoading}
              className="md:w-[200px] "
            >
              {ProductCreateLoading || ProductUpdateLoading ? (
                <Icons
                .spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <React.Fragment>
                  <span>{initialValues ? "Update" : "Save"}</span>
                </React.Fragment>
              )}
            </Button>
          </div>
          </form>

         

        </Form>

    
    </React.Fragment>
  )
}

export default ProductForm