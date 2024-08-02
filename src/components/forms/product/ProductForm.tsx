"use client";
import FileDialog from "@/components/common/shared/file-dialog";
import FilesDialog from "@/components/common/shared/files.dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/hooks/product/useProduct";
import { useShopQuery } from "@/hooks/shops/useGetShop";
import { IUploadedImage } from "@/services/upload.service";
import {
  CreateProduct,
  ICategory,
  IProduct,
  ITag,
  IType,
  ProductType,
} from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card } from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "../../ui/form";
import {
  ProductTypeOption,
  getProductDefaultValues,
  getProductInputValues,
} from "./form-utils";
import ProductCategoryInput from "./product-category-input";
import ProductGroupInput from "./product-group-input";
import ProductSimpleForm from "./product-simple-form";
import ProductTagInput from "./product-tag-input";
import ProductTypeInput from "./product-type-input";
import ProductVariableForm from "./product-variable-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidationSchema } from "@/validations/product";

export type ProductFormValues = Omit<
  CreateProduct,
  "type" | "shop_id" | "categories" | "tags"
> & {
  type: Pick<IType, "_id" | "name">;
  product_type: ProductTypeOption;
  categories: Pick<ICategory, "_id" | "name">[];
  tags: Pick<ITag, "_id" | "name">[];
};

interface ProductFormProps {
  initialValues?: IProduct | null;
  shop?: string;
  isShop?: boolean;
}
const ProductForm = ({
  initialValues,
  shop,
  isShop = true,
}: ProductFormProps) => {
  const { data } = useShopQuery(shop as string);
  const shopId = data?._id;
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    ProductCreateLoading,
    attemptProductCreate,
    ProductUpdateLoading,
    ProductUpdateMutation,
  } = useProduct({ shop });

  const attemptProductUpdate = async (data: CreateProduct) => {
    toast.promise(
      ProductUpdateMutation({
        id: initialValues?._id as string,
        ...data,
      }),
      {
        loading: "updating...",
        success: (data: any) => {
          queryClient.invalidateQueries(["products"]);
          router.push(isShop ? `/${shop}/products` : `/admin/products`);
          return <b>{data.message}</b>;
        },
        error: (error) => {
          const {
            response: { data },
          }: any = error ?? {};

          return <b> {data?.message}</b>;
        },
      }
    );
  };
  const productForm = useForm<ProductFormValues>({
    resolver: zodResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: getProductDefaultValues(initialValues!),
  });

  const productTypeValue = productForm.watch("product_type");

  useEffect(()=>{
    if(productTypeValue?.value === ProductType.Simple){
      productForm.unregister("variation_options")
      productForm.unregister("variations")
    }else{
      productForm.unregister("sale_price")
      productForm.unregister("price")
      productForm.unregister("length")
    }
  },[])

  const onSubmit = async (values: ProductFormValues) => {
    const inputValues: CreateProduct = {
      ...getProductInputValues(values, initialValues),
    };

    if (initialValues) {
      attemptProductUpdate({
        ...inputValues,
        shop: shopId,
        gallery:productForm.watch("gallery")
        ? productForm.watch("gallery")
        : values.gallery
      });
    } else {
      attemptProductCreate({
        ...inputValues,
        gallery:productForm.watch("gallery")
        ? productForm.watch("gallery")
        : values.gallery,
        shop: shopId,
      });
    }
  };
  
  return (
    <React.Fragment>
      <Form {...productForm}>
        <form
          className="grid gap-10 w-full"
          onSubmit={(...args) =>
            void productForm.handleSubmit(onSubmit)(...args)
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
                          productForm.watch("image")
                            ? productForm.watch("image")
                            : (initialValues?.image as IUploadedImage)
                        }
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        productForm.formState.errors.image?.message as string
                      }
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>

          <div className="border-dotted w-full border-2 " />

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
                          productForm.watch("gallery")
                            ? productForm.watch("gallery")
                            : (initialValues?.gallery as IUploadedImage[])
                        }
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        productForm.formState.errors?.gallery?.message as string
                      }
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>

          <div className="border-dotted w-full border-2 " />

          <div className="flex  flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">
                Groups & Categories
              </h4>
              <p>Select products groups and categories from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full ">
                <ProductGroupInput
                  control={productForm.control}
                  error={productForm.formState.errors?.type?.message as string}
                />

                <ProductCategoryInput
                  control={productForm.control}
                  setValue={productForm.setValue}
                  error={productForm.formState.errors?.categories?.message as string}
                />

                <ProductTagInput
                  control={productForm.control}
                  setValue={productForm.setValue}
                  error={productForm.formState.errors?.tags?.message as string}
                />
              </Card>
            </div>
          </div>

          <div className="border-dotted w-full border-2 " />

          <div className="flex  flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Descriptons</h4>
              <p>
                Add your product description and necessary information from here
              </p>
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

                <div className="my-4">
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

          <div className="border-dotted w-full border-2 " />
          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Product Type</h4>
              <p>Select product type form here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <ProductTypeInput />
            </div>
          </div>
          <div className="border-dotted w-full border-2 " />

          {/* Simple Type */}
          {productTypeValue?.value === ProductType.Simple && (
            <ProductSimpleForm
              initialValues={initialValues}
              control={productForm.control}
            />
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
                <Icons.spinner
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
  );
};

export default ProductForm;
