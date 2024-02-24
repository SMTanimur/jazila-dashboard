
import { UncontrolledFormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import SelectInput from "@/components/ui/select-input";
import { useGetAllTypesQuery } from "@/hooks/group/useGetAllTypes";
import { Control } from "react-hook-form";


interface Props {
  control: Control<any>;
  error: string | undefined;
}

const ProductGroupInput = ({ control, error }: Props) => {

  const { data, isLoading: loading } = useGetAllTypesQuery({
   limit:100
  });
  return (
    <div className="mb-5 ">
      <Label>Group*</Label>
      <SelectInput
       name="type"
       control={control}
       getOptionLabel={(option: any) => option.name}
       getOptionValue={(option: any) => option._id}
       options={data!}
       isLoading={loading}
      />
      <UncontrolledFormMessage
                      message={error}
                    />
    </div>
  );
};

export default ProductGroupInput;
