import { DeleteAttribute } from '@/components/attribute/attribute-delete';
import { DeleteCategory } from '@/components/category/category-delete';
import { DeleteGroup } from '@/components/group/group-delete';
import { DisApproveShop } from '@/components/shop/disapprove-shop-view';
import type { FC } from 'react';

const GlobalAlerts: FC = () => {
  return (
    <div>
      <DisApproveShop />
      <DeleteGroup />
      <DeleteCategory />
      <DeleteAttribute/>
    </div>
  );
};

export default GlobalAlerts;
