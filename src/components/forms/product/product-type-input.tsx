
import { Card } from "@/components/ui/card";
import { UncontrolledFormMessage } from "@/components/ui/form";
import ValidationError from "@/components/ui/form-validation-error";
import { Label } from "@/components/ui/label";
import SelectInput from "@/components/ui/select-input";
import { ProductType } from "@/types";
import { useFormContext } from "react-hook-form";


const productType = [
  { name: "Simple Product", value: ProductType.Simple },
  { name: "Variable Product", value: ProductType.Variable },
];

const ProductTypeInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();


  return (
    <Card className="w-full sm:w-8/12 md:w-2/3 p-6">
      <div className="mb-5">
        <Label>Product type</Label>
        <SelectInput
          name="productTypeValue"
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={productType}
        />
        <UncontrolledFormMessage
                      message={errors.productTypeValue?.message as string}
                    />
      </div>
    </Card>
  );
};

export default ProductTypeInput;
