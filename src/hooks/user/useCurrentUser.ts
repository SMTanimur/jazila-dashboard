import { userClient } from '@/services/user.service';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { authorizationAtom } from '@/utils/authorization-atom';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';


export function useCurrentUser() {

  const { data, isLoading, error } = useQuery(
    ['currentUser'],
    userClient.me,
    {
      retry: false,
    }
  );
  //TODO: do some improvement here
  return { currentUser: data, isLoading, error};
}