"use client";

import { useGetAllTypesQuery } from "@/hooks/group/useGetAllTypes";
import { useTag } from "@/hooks/tag/useTags";
import { IUploadedImage } from "@/services/upload.service";
import { ITag, IType } from "@/types";
import { TTag, tagSchema } from "@/validations/tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FileDialog from "../common/shared/file-dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const defaultValues = {};
interface TagFormProps {
  initialValues?: ITag;
}
const TagForm = ({ initialValues }: TagFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const tagForm = useForm<TTag>({
    resolver: zodResolver(tagSchema),
    defaultValues: initialValues ? initialValues : defaultValues,
  });

  const { data, isLoading } = useGetAllTypesQuery({limit:100});

  const {
    IsTagCreateError,
    attempttagCreate,
    tagCreateLoading,
    tagUpdateLoading,
    tagUpdateMutation,
  } = useTag();

  const attemptTagUpdate = async (data: TTag) => {
    toast.promise(
      tagUpdateMutation({
        variables: { id: initialValues?._id as string, input: data },
      }),
      {
        loading: "updating...",
        success: (data) => {
          queryClient.invalidateQueries(["tags"]);
          router.push("/admin/tags");

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

  const onSubmit = async (values: TTag) => {
    const input: any = {
      name: values.name!,
      image: values.image,
      type: values.type,
    };
    if (initialValues) {
      attemptTagUpdate(input);
    } else {
      attempttagCreate(input);
    }
  };

  return (
    <React.Fragment>
      <Form {...tagForm}>
        <form
          className="grid gap-10 w-full"
          onSubmit={(...args) => void tagForm.handleSubmit(onSubmit)(...args)}
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
                        setValue={tagForm.setValue}
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
                      message={tagForm.formState.errors.image?.message}
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
              <p>Add your tag details and necessary information from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormField
                    control={tagForm.control}
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
                    control={tagForm.control}
                    name="type"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select
                            disabled={isLoading}
                            onValueChange={field.onChange}
                            value={field.value as string}
                            defaultValue={field.value as string}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value as string}
                                  placeholder="Select a Type"
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
                      );
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button
              disabled={tagCreateLoading || tagUpdateLoading}
              className="md:w-[200px] "
            >
              {tagCreateLoading || tagUpdateLoading ? (
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

export default TagForm;
