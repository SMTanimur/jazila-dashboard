
import { Control, useFormState, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useGetTagsQuery } from "@/hooks/tag/useGetTags";
import { Label } from "@/components/ui/label";
import SelectInput from "@/components/ui/select-input";
import { ProductFormValues } from "./ProductForm";



interface Props {
  control: Control<ProductFormValues>;
  setValue: any;
}

const ProductTagInput = ({ control, setValue }: Props) => {

  const type = useWatch({
    control,
    name: "type",
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?._id && dirtyFields?.type) {
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
    </div>
  );
};

export default ProductTagInput;
