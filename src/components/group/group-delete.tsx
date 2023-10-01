'use client';
import { Icons } from '../ui/icons';
import { useShop } from '@/hooks/shops/useShop';
import { useGlobalAlertStateStore } from '@/store/alerts';

import type { FC } from 'react';
import Alert from '../common/shared/Alert';
import { useGroup } from '@/hooks/group/useGorup';

export const DeleteGroup: FC = () => {
  const { attemptGroupDelete, GroupDeleteLoading } = useGroup();

  const setShowGroupAlert = useGlobalAlertStateStore(
    state => state.setShowGroupAlert
  );

  const showGroupAlert = useGlobalAlertStateStore(
    state => state.showGroupAlert
  );
  const GroupAlertData = useGlobalAlertStateStore(
    state => state.groupAlertData
  );

  return (
    <Alert
      title={`Delete`}
      description={'Are you sure you want to delete this group? '}
      confirmText={`Delete`}
      size='sm'
      icon={<Icons.trash className='w-12 h-12 text-2xl text-primary' />}
      show={showGroupAlert}
      isDestructive
      isPerformingAction={GroupDeleteLoading}
      onConfirm={() => attemptGroupDelete(GroupAlertData)}
      onClose={() => setShowGroupAlert(false, null)}
    />
  );
};
