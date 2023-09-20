import { HttpClient } from "@/utils/api/http";
import { TShop } from "@/validations/shop";

export const shopClient = {
  createShop: (variables: TShop) => {
    return HttpClient.post<{ message: string }>(`/shops`, variables);
  },


 
};