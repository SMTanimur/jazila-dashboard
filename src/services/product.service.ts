import { CreateProduct, UpdateProduct } from "@/types";
import { HttpClient } from "@/utils/api/http";

export interface IProductUpdateVariables {
  variables: {
    id: string;
    input: UpdateProduct;
  };
}

export const productClient = {
  productCreate: (variables: CreateProduct) => {
    return HttpClient.post<{ message: string }>(`/prodcuts`, variables);
  },

  updateProduct: ({ variables }: IProductUpdateVariables) => {
    return HttpClient.put<UpdateProduct>(
      `/products/${variables.id}`,
      variables.input
    );
  },
};
