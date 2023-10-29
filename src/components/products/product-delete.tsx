'use client';
import { Icons } from '../ui/icons';
import { useGlobalAlertStateStore } from '@/store/alerts';
import type { FC } from 'react';
import Alert from '../common/shared/Alert';
import { useProduct } from '@/hooks/product/useProduct';


export const DeleteProduct: FC = () => {
  const {attemptProductDelete,ProductDeleleLoading} = useProduct({})

  const setShowProductAlert = useGlobalAlertStateStore(
    state => state.setShowProductAlert
  );

  const showProductAlert = useGlobalAlertStateStore(
    state => state.showProductAlert
  );
  const ProductAlertData = useGlobalAlertStateStore(
    state => state.productAlertData
  );

  return (
    <Alert
      title={`Delete`}
      description={'Are you sure you want to delete this Product? '}
      confirmText={`Delete`}
      size='sm'
      icon={<Icons.trash className='w-12 h-12 text-2xl text-primary' />}
      show={showProductAlert}
      isDestructive
      isPerformingAction={ProductDeleleLoading}
      onConfirm={() => attemptProductDelete(ProductAlertData)}
      onClose={() => setShowProductAlert(false, null)}
    />
  );
};
