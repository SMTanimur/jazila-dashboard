
import { Control, useFormState, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useGetTagsQuery } from "@/hooks/tag/useGetTags";
import { Label } from "@/components/ui/label";
import SelectInput from "@/components/ui/select-input";
import { ProductFormValues } from "./ProductForm";
import { UncontrolledFormMessage } from '@/components/ui/form';


interface Props {
  control: Control<ProductFormValues>;
  setValue: any;
  error: string | undefined;
}

const ProductTagInput = ({ control, setValue,error }: Props) => {

  const type = useWatch({
    control,
    name: "type",
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?._id && dirtyFields?.type?._id) {
      setValue("tags", []);
    }
  }, [type?._id]);

  const { data, isLoading: loading } = useGetTagsQuery({
    limit: 999,
    type: type?._id,
  });

  return (
    <div>
      <Label>Tags</Label>
      <SelectInput
        name="tags"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option._id}
        // @ts-ignore
        options={data?.docs!}
        isLoading={loading}
      />
      <UncontrolledFormMessage
                      message={error}
                    />
    </div>
  );
};

export default ProductTagInput;
