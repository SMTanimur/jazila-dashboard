"use client"
import { Icons } from '../ui/icons';
import { useShop } from '@/hooks/shops/useShop';
import { useGlobalAlertStateStore } from '@/store/alerts';

import type { FC } from 'react';
import Alert from '../common/shared/Alert';


export const DisApproveShop: FC = () => {
  const { attemptToDisApproveShop, shopDisApproveLoading } = useShop();

  const setShowShopAlert = useGlobalAlertStateStore(
    state => state.setShowAlert
  );
 
  const showShopAlert = useGlobalAlertStateStore(state => state.showAlert);
  const ShopAlertData = useGlobalAlertStateStore(state => state.alertData);

  return (
    <div className="min-w-[400px]">
    <Alert
      title={`Are you sure ?`}
      description={'DisApproved this shop '}
      confirmText={`Submit`}
      show={showShopAlert}
      isDestructive
      
      isPerformingAction={shopDisApproveLoading}
      onConfirm={() => attemptToDisApproveShop({id:ShopAlertData})}
      onClose={() => setShowShopAlert(false, null)}
    >
      <div className="flex justify-center gap-4">

      
      <Icons.CheckMarkCircle className='w-12 text-primary'/>
      </div>
     
      </Alert>
      </div>
  );
};
