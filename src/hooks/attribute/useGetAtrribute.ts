"use client"
import { attributeClient } from '@/services/attribute.service';
import { IAttribute } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useAttributeQuery = (slug: string) => {
  return useQuery<IAttribute, Error>(
    ["attributes", slug],
    () => attributeClient.getAttribute(slug),
    {
      keepPreviousData: true,
    }
  );
};
