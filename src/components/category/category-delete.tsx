'use client';
import { Icons } from '../ui/icons';
import { useGlobalAlertStateStore } from '@/store/alerts';

import type { FC } from 'react';
import Alert from '../common/shared/Alert';
import { useCategory } from '@/hooks/category/useCategory';

export const DeleteCategory: FC = () => {
  const { attemptCategoryDelete,categoryDeleteLoading} = useCategory();

  const setShowCategoryAlert = useGlobalAlertStateStore(
    state => state.setShowCategoryAlert
  );

  const showCategoryAlert = useGlobalAlertStateStore(
    state => state.showCategoryAlert
  );
  const CategoryAlertData = useGlobalAlertStateStore(
    state => state.categoryAlertData
  );

  return (
    <Alert
      title={`Delete`}
      description={'Are you sure you want to delete this Category? '}
      confirmText={`Delete`}
      size='sm'
      icon={<Icons.trash className='w-12 h-12 text-2xl text-primary' />}
      show={showCategoryAlert}
      isDestructive
      isPerformingAction={categoryDeleteLoading}
      onConfirm={() => attemptCategoryDelete(CategoryAlertData)}
      onClose={() => setShowCategoryAlert(false, null)}
    />
  );
};
