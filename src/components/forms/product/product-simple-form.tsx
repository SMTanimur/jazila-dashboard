
import { Control } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductFormValues } from "./ProductForm";

type IProps = {
  initialValues: any;
  control: Control<ProductFormValues>
};

export default function ProductSimpleForm({ initialValues,control }: IProps) {
  
  return (
    <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
     <div className="lg:w-1/3 w-full flex flex-col items-start gap-2">
    <h4 className="text-stone-800 font-semibold">Product Type</h4>
    <p>Select product type form here</p>
  </div>

  <div className="lg:w-2/3 w-full">

      <Card className="p-8 w-full">
      <div className="my-4">
                  <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                   <Input 
                   type="number"
                   inputMode="numeric"
                   placeholder="Type product Price here."
                   onChange={(e) => field.onChange(e.target.valueAsNumber)}
                   
                   />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>
          <div className="my-4">
                  <FormField
                  control={control}
                  name="sale_price"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                   <Input
                   type="number"
                   inputMode="numeric"
                    placeholder="Type product sale price here."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>
        
          <div className="my-4">
                  <FormField
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                   <Input type="number"
                    inputMode="numeric"
                    
                    placeholder="Type product quantity here."
                    onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={control}
                  name="sku"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                   <Input  {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={control}
                  name="width"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                   <Input  {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={control}
                  name="height"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                   <Input  {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>

          <div className="my-4">
                  <FormField
                  control={control}
                  name="length"
                  render={({ field }) => (
                  <FormItem>
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                   <Input  {...field} />
                  </FormControl>
                   <FormMessage />
                      </FormItem>
                    )}
                  />
          </div>
        
      </Card>
      </div>
    </div>
  );
}
