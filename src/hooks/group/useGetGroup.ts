import { groupClient } from '@/services/group.service';
import { IType } from '@/types';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const useGroupQuery = (slug: string) => {
  return useQuery<IType, Error>(
    [API_ENDPOINTS.TYPES, slug],
    () => groupClient.getGroup(slug),
    {
      keepPreviousData: true,
    }
  );
};
