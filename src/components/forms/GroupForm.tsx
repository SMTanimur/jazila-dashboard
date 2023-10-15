"use client";
import { typeIconList } from "@/configs/type-setting";
import { useGroup } from "@/hooks/group/useGorup";
import { IUploadedImage } from "@/services/upload.service";
import { IType } from "@/types";
import { getIcon } from "@/utils/get-icon";
import { TGroup, groupsSchema } from "@/validations/groups";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import FileDialog from "../common/shared/file-dialog";
import FilesDialog from "../common/shared/files.dialog";
import * as typeIcons from "../icons/type";
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
import SelectInput from "../ui/select-input";
import { Textarea } from "../ui/textarea";

export const updatedIcons = typeIconList.map((item: any) => {
  item.label = (
    <div className="flex items-center space-x-5">
      <span className="flex h-5 w-5 items-center justify-center">
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: "max-h-full max-w-full",
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

interface GroupFormProps {
  initialData?: IType | null;
}

const GroupForm = ({ initialData }: GroupFormProps) => {
  const [imageSlider, setImageSlider] = React.useState<IUploadedImage[] | null>(
    initialData?.promotional_sliders ? initialData.promotional_sliders : null
  );
  const queryClient = useQueryClient();
  const groupForm = useForm<TGroup>({
    resolver: zodResolver(groupsSchema),
    defaultValues: {
      ...initialData,
      icon: initialData?.icon
        ? typeIconList.find(
            (singleIcon) => singleIcon.value === initialData?.icon
          )
        : "",
    },
  });
  const { control } = groupForm;
  const router = useRouter();

  const {
    GroupCreateLoading,
    GroupUpdateLoading,
    GroupUpdateMutation,
    attemptGroupCreate,
  } = useGroup();

  const { fields, append, remove } = useFieldArray({
    control: groupForm.control,
    name: "banners",
  });

  const attemptGroupUpdate = async (data: TGroup) => {
    toast.promise(
      GroupUpdateMutation({
        variables: { id: initialData?._id as string, input: data },
      }),
      {
        loading: "updating...",
        success: (data) => {
          queryClient.invalidateQueries(["types"]);
          router.push("/admin/groups");

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

  const onSubmit = async (values: TGroup) => {
    const input: any = {
      name: values.name!,
      ...(values.promotional_sliders
        ? {
            promotional_sliders: [
              ...values.promotional_sliders.map((value) => {
                return {
                  img_id: value?.img_id,
                  img_url: value?.img_url,
                };
              }),
            ],
          }
        : {}),
      banners: values.banners?.map((banner) => ({
        description: banner?.description,
        title: banner?.title,
        image: {
          img_id: banner?.image?.img_id,
          img_url: banner?.image?.img_url,
        },
      })),
      icon: values.icon?.value,
    };

    if (!initialData) {
      attemptGroupCreate(input);
    } else {
      attemptGroupUpdate(input);
    }
  };
  return (
    <React.Fragment>
      <Form {...groupForm}>
        <form
          className="grid gap-10 w-full"
          onSubmit={(...args) => void groupForm.handleSubmit(onSubmit)(...args)}
        >
          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">Basic Info</h4>
              <p>Add some basic info about your shop from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormField
                    control={control}
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
                    control={groupForm.control}
                    options={updatedIcons}
                    isClearable={true}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className="border-dotted w-full border-2 " />
          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
              <h4 className="text-stone-800 font-semibold">
                Promotional Sliders
              </h4>
              <h6>
                Upload your shop cover image from here Dimension of the cover
                image should be 1170 x 435px
              </h6>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="p-8  w-full">
                <div className="my-4">
                  <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Promotional Sliders</FormLabel>
                    <FormControl>
                      <FilesDialog
                        setValue={groupForm.setValue}
                        name="promotional_sliders"
                        maxFiles={5}
                        maxSize={1024 * 1024 * 4}
                        multiple={true}
                        value={
                          initialData ? initialData.promotional_sliders : null
                        }
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        groupForm.formState?.errors?.promotional_sliders
                          ?.message
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
              <h4 className="text-stone-800 font-semibold">Add Banner</h4>
              <p>Add some basic info about your shop from here</p>
            </div>
            <div className="lg:w-2/3 w-full">
              <Card className="w-full sm:w-8/12 md:w-full p-8">
                <div>
                  {fields.map((item: any & { id: string }, index: number) => (
                    <div
                      className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8 first:pt-0"
                      key={item.id}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <h5 className="mb-0">Banner {index + 1}</h5>
                        <button
                          onClick={() => {
                            remove(index);
                          }}
                          type="button"
                          className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                        >
                          Remove banner
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-5">
                        <FormField
                          control={groupForm.control}
                          name={`banners.${index}.title` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Banner Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={groupForm.control}
                          name={`banners.${index}.description` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Banner description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full mt-5">
                        <FormItem className="flex w-full flex-col gap-1.5">
                          <FormLabel>Logo</FormLabel>

                          <FormControl>
                            <FileDialog
                              name={`banners.${index}.image`}
                              value={item.image}
                              setValue={groupForm.setValue}
                              multiple={false}
                            />
                          </FormControl>

                          <UncontrolledFormMessage
                            message={
                              groupForm?.formState?.errors.banners?.message
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      description: "",
                      image: {
                        img_id: "",
                        img_url: "",
                      },
                      title: "",
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  Add Banner
                </Button>
              </Card>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button
              disabled={GroupUpdateLoading || GroupCreateLoading}
              className="md:w-[200px] "
            >
              {GroupUpdateLoading || GroupCreateLoading ? (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <>
                  <span>{initialData ? "Update" : "Save"}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};

export default GroupForm;
