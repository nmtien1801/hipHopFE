import { useQuery } from '@tanstack/react-query';
import { criteriaApi } from 'api/criteriaApi';

export const useCriteriaList = (params) => {
  return useQuery({
    queryKey: ['criteria', params],
    queryFn: () => criteriaApi.getAll(params),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};