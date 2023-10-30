"use client"
import { userClient } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  const { data, isLoading, error } = useQuery(
    ['me'],
    userClient.me,
    {
      retry: false,
    }
  );
  //TODO: do some improvement here
  return { currentUser: data, isLoading, error};
}
