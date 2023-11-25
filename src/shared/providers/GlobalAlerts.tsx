import { DeleteAttribute } from '@/components/attribute/attribute-delete';
import { DeleteCategory } from '@/components/category/category-delete';
import { DeleteGroup } from '@/components/group/group-delete';
import { DeleteProduct } from '@/components/products/product-delete';
import { DisApproveShop } from '@/components/shop/disapprove-shop-view';
import type { FC } from 'react';
import { DeletezQuestion } from '@/components/question/question-delete';

const GlobalAlerts: FC = () => {
  return (
    <div>
      <DisApproveShop />
      <DeleteGroup />
      <DeleteCategory />
      <DeleteAttribute/>
      <DeleteProduct/>
      <DeletezQuestion/>
    </div>
  );
};

export default GlobalAlerts;
