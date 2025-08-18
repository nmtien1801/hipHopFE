import { useQuery } from '@tanstack/react-query'
import { eventApi } from 'api/eventApi'

export const useEvents = (params) => {
  const queryKey = ['events', params]
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => await eventApi.getAll(params),
    enabled: !!params && !!params.LanguagesID,
  })
  return { data: data?.data, total: data?.totals, loading: isLoading, error }
}
