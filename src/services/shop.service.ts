import { HttpClient } from '@/utils/api/http';
import { TShop } from '@/validations/shop';

export const shopClient = {
  createShop: (variables: TShop) => {
    console.log(variables, 'veriables');
    return HttpClient.post<{ message: string }>(`/shops`, variables);
  },
};
