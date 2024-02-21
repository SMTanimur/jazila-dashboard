import { IMessage } from '@/utils/api/curd-factory';
import { CreateProduct, IProduct, } from "@/types"
import { ProductsQueryOptionsType, QueryOptions, QueryParamsType } from "@/types/custom.types"
import { PaginatorInfo } from "@/types/utils"
import { API_ENDPOINTS } from "@/utils/api/api-endpoints"
import { crudFactory } from "@/utils/api/curd-factory"
import { HttpClient } from "@/utils/api/http"



const  ProductType={
  
}
export const productClient = {
  ...crudFactory<IProduct, QueryOptions, CreateProduct> ("/products"),
  
  getProducts: async ({ queryKey }: QueryParamsType)=>{
    const [_key, params] = queryKey;
    const {
      page,
      text,
      type,
      category,
      shop_id,
      status,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as ProductsQueryOptionsType;
    const url = `${API_ENDPOINTS.PRODUCTS}?${text ? `search=${text}` : ''}${
      type ? `&type=${type}` : ''
    }${category ? `&category=${category}` : ''}${
      shop_id ? `shop=${shop_id}` : ''
    }${
      status ? `&status=${status}` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IProduct>>(url)
  },
  getProduct: async (slug: string) => {
    return HttpClient.get<IProduct>(`/products/${slug}`);
  },

  deleteProduct: async (id: string) => {
    return HttpClient.delete<{ message: string }>(
      `/products/${id}`
    );
  },
}
