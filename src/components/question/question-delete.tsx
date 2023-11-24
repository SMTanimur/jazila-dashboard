'use client';
import { Icons } from '../ui/icons';
import { useGlobalAlertStateStore } from '@/store/alerts';

import type { FC } from 'react';
import Alert from '../common/shared/Alert';
import { useDeleteQuestionMutation } from '@/hooks/question';

export const DeletezQuestion: FC = () => {
  const {mutate,isLoading}=useDeleteQuestionMutation()
  const setShowQuestionAlert = useGlobalAlertStateStore(
    state => state.setShowQuestionAlert
  );

  const showQuestionAlert = useGlobalAlertStateStore(
    state => state.showQuestionAlert
  );
  const QuestionAlertData = useGlobalAlertStateStore(
    state => state.questionAlertData
  );

  return (
    <Alert
      title={`Delete`}
      description={'Are you sure you want to delete this Question? '}
      confirmText={`Delete`}
      size='sm'
      icon={<Icons.trash className='w-12 h-12 text-2xl text-primary' />}
      show={showQuestionAlert}
      isDestructive
      isPerformingAction={isLoading}
      onConfirm={() => mutate(QuestionAlertData)}
      onClose={() => setShowQuestionAlert(false, null)}
    />
  );
};
