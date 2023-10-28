import { CreateProduct, UpdateProduct } from "@/types"
import { HttpClient } from "@/utils/api/http"

export interface IProductUpdateVariables {
  variables: {
    id: string
    input: UpdateProduct
  }
}

export const productClient = {
  productCreate: (variables: CreateProduct) => {
    console.log(variables, "vari")
    return HttpClient.post<{ message: string }>(`/products`, variables)
  },

  updateProduct: ({ variables }: IProductUpdateVariables) => {
    return HttpClient.put<UpdateProduct>(
      `/products/${variables.id}`,
      variables.input
    )
  },
}
