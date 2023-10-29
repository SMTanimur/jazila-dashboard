

import { useQuery } from "@tanstack/react-query"
import { productClient } from "../../services/product.service"
import { IProduct } from "@/types"

export const useProductQuery = (slug: string) => {
  return useQuery<IProduct, Error>(
    ["products", slug],
    () => productClient.getProduct(slug),
    {
      keepPreviousData: true,
    }
  )
}
