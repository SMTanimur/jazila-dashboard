"use client"
import { Icons } from '../ui/icons';
import { useShop } from '@/hooks/shops/useShop';
import { useGlobalAlertStateStore } from '@/store/alerts';

import type { FC } from 'react';
import Alert from '../common/shared/Alert';
import { useGroup } from '@/hooks/group/useGorup';


export const DeleteGroup: FC = () => {
  const {attemptGroupDelete,GroupDeleteLoading} = useGroup();

  const setShowShopAlert = useGlobalAlertStateStore(
    state => state.setShowAlert
  );
 
  const showShopAlert = useGlobalAlertStateStore(state => state.showAlert);
  const ShopAlertData = useGlobalAlertStateStore(state => state.alertData);

  return (
    <div className="">
    <Alert
      title={`Delete`}
      description={'Are you sure you want to delete this group? '}
      confirmText={`Submit`}
      size='sm'
      show={showShopAlert}
      isDestructive
      isPerformingAction={GroupDeleteLoading}
      onConfirm={() => attemptGroupDelete(ShopAlertData)}
      onClose={() => setShowShopAlert(false, null)}
    >
      <div className="flex justify-center gap-4">

      
      <Icons.trash className='w-20 h-10 text-2xl text-primary'/>
      </div>
     
      </Alert>
      </div>
  );
};
