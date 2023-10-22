"use client";
import { IAttribute, IType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { TAttribute, attributeSchema } from "@/validations/attribute";
import { useAttribute } from "@/hooks/attribute/useAttribute";
import { useShopQuery } from "@/hooks/shops/useGetShop";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";


interface AttributeFormProps {
  initialData?: IAttribute | null;
    shop?: string

}

const AttributeForm = ({ initialData,shop }: AttributeFormProps) => {
  const queryClient = useQueryClient();
  const attributeForm = useForm<TAttribute>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      ...initialData,
   
    },
  });
  const { control } = attributeForm;
  const router = useRouter();
  const {data}=useShopQuery(shop as string)
  const {currentUser}=useCurrentUser()

  const isAdmin = currentUser?.role === "admin";

  const {
    attributeCreateLoading,
    attributeUpdateLoading,
    attributeUpdateMutation,
    attemptattributeCreate,
  } = useAttribute({shop})

  const { fields, append, remove } = useFieldArray({
    control: attributeForm.control,
    name: "values",
  });

  const attemptattributeUpdate = async (data: TAttribute) => {
    toast.promise(
      attributeUpdateMutation({
        variables: { id: initialData?._id as string, input: data },
      }),
      {
        loading: "updating...",
        success: (data) => {
          queryClient.invalidateQueries(["attributes"]);
          router.push(isAdmin ? "/admin/attributes" : `/${shop}/attributes`);

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

  const onSubmit = async (values: TAttribute) => {
    const input: any = {
      name: values.name!,
      shop: data?._id,
      values: values.values?.map((value) => ({
        value: value?.value,
        meta: value?.meta,
        
      })),
      
    };

    if (!initialData) {
      attemptattributeCreate(input);
    } else {
      attemptattributeUpdate(input);
    }
  };
  return (
    <React.Fragment>
      <Form {...attributeForm}>
        <form
          className="grid gap-10 w-full"
          onSubmit={(...args) => void attributeForm.handleSubmit(onSubmit)(...args)}
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
                        <h5 className="mb-0">Values {index + 1}</h5>
                        <button
                          onClick={() => {
                            remove(index);
                          }}
                          type="button"
                          className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                        >
                          Remove values
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-5">
                        <FormField
                          control={attributeForm.control}
                          name={`values.${index}.value` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Value</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={attributeForm.control}
                          name={`values.${index}.meta` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      value: "",
                      meta: ""
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  Add Value
                </Button>
              </Card>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button
              disabled={attributeUpdateLoading || attributeCreateLoading}
              className="md:w-[200px] "
            >
              {attributeUpdateLoading || attributeCreateLoading ? (
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

export default AttributeForm;
