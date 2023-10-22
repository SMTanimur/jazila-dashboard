'use client';
import { Icons } from '../ui/icons';
import { useGlobalAlertStateStore } from '@/store/alerts';

import type { FC } from 'react';
import Alert from '../common/shared/Alert';
import { useAttribute } from '@/hooks/attribute/useAttribute';


export const DeleteAttribute: FC = () => {
  const { attemptattributeDelete,attributeDeleteLoading} = useAttribute({});

  const setShowAttributeAlert = useGlobalAlertStateStore(
    state => state.setShowAttributeAlert
  );

  const showAttributeAlert = useGlobalAlertStateStore(
    state => state.showAttributeAlert
  );
  const AttributeAlertData = useGlobalAlertStateStore(
    state => state.attributeAlertData
  );

  return (
    <Alert
      title={`Delete`}
      description={'Are you sure you want to delete this Category? '}
      confirmText={`Delete`}
      size='sm'
      icon={<Icons.trash className='w-12 h-12 text-2xl text-primary' />}
      show={showAttributeAlert}
      isDestructive
      isPerformingAction={attributeDeleteLoading}
      onConfirm={() => attemptattributeDelete(AttributeAlertData)}
      onClose={() => setShowAttributeAlert(false, null)}
    />
  );
};
