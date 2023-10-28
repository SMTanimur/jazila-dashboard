"use client";

import { useCategory } from "@/hooks/category/useCategory";
import { useGetAllTypesQuery } from "@/hooks/group/useGetAllTypes";
import { IUploadedImage } from "@/services/upload.service";
import { ICategory, IType } from "@/types";
import { getIcon } from "@/utils/get-icon";
import { TCategory, categorySchema } from "@/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Control, useForm, useFormState, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "../../hooks/category/useGetAllCategories";
import { categoryIcons } from "../category/category-icons";
import FileDialog from "../common/shared/file-dialog";
import * as categoriesIcon from "../icons/category";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SelectInput from "../ui/select-input";
export const updatedIcons = categoryIcons.map((item: any) => {
  item.label = (
    <div className="flex items-center space-s-5">
      <span className="flex h-5 w-5 items-center justify-center">
        {getIcon({
          iconList: categoriesIcon,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});
function SelectCategories({
  control,
  setValue,
}: {
  control: Control<TCategory>;
  setValue: any;
}) {
  const type = useWatch({
    control,
    name: "type",
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?._id && dirtyFields?.type) {
      setValue("parent", []);
    }
  }, [type?.slug]);

  const { data: categories, isLoading } = useGetAllCategoriesQuery({
    limit: 999,
  });

  return (
    <div>
      <Label>Parent</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option._id}
        options={categories?.docs!}
        isClearable={true}
        isLoading={isLoading}
      />
    </div>
  );
}

const defaultValues = {};
interface CategoryFormProps {
  initialValues?: ICategory;
}
const CategoryForm = ({ initialValues }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const categoryForm = useForm<TCategory>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          icon: initialValues?.icon
            ? categoryIcons.find(
                (singleIcon) => singleIcon.value === initialValues?.icon!
              )
            : "",
        }
      : defaultValues,
  });

  const { data, isLoading } = useGetAllTypesQuery({limit:100});

  const {
    IsCategoryCreateError,
    attemptCategoryCreate,
    categoryCreateLoading,
    categoryUpdateLoading,
    categoryUpdateMutation,
  } = useCategory();

  const attemptCategoryUpdate = async (data: TCategory) => {
    toast.promise(
      categoryUpdateMutation({
        variables: { id: initialValues?._id as string, input: data },
      }),
      {
        loading: "updating...",
        success: (data) => {
          queryClient.invalidateQueries(["categories"]);
          router.push("/admin/categories");

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

  const onSubmit = async (values: TCategory) => {
    const input: any = {
      name: values.name!,
      image: values.image,
      type: values.type,
      icon: values.icon?.value || "",
      parent: values?.parent?._id,
    };
    if (initialValues) {
      attemptCategoryUpdate(input);
    } else {
      attemptCategoryCreate(input);
    }
  };

  return (
    <React.Fragment>
      <Form {...categoryForm}>
        <form
          className="grid gap-10 w-full"
          onSubmit={(...args) =>
            void categoryForm.handleSubmit(onSubmit)(...args)
          }
        >
          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Image</h4>
              <p>Upload your shop logo from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Image</FormLabel>

                    <FormControl>
                      <FileDialog
                        setValue={categoryForm.setValue}
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
                      message={categoryForm.formState.errors.image?.message}
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>

          <div className="border-dotted w-full border-2 " />

          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Description</h4>
              <p>
                Add your category details and necessary information from here
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormField
                    control={categoryForm.control}
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
                  <Label>Icon</Label>
                  <SelectInput
                    name="icon"
                    control={categoryForm.control}
                    options={updatedIcons}
                    isClearable={true}
                  />
                </div>
                <div className="my-4">
                  <FormField
                    control={categoryForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          disabled={categoryCreateLoading}
                          onValueChange={field.onChange}
                          value={field.value as string}
                          defaultValue={field.value as string}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value as string}
                                placeholder="Select a type"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data?.map((type: IType) => (
                              <SelectItem key={type._id} value={type._id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-4">
                  <SelectCategories
                    control={categoryForm.control}
                    setValue={categoryForm.setValue}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button
              disabled={categoryCreateLoading || categoryUpdateLoading}
              className="md:w-[200px] "
            >
              {categoryCreateLoading || categoryUpdateLoading ? (
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

export default CategoryForm;
