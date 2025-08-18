import { useQuery } from '@tanstack/react-query'
import { eventApi } from 'api/eventApi'
import { registerPlayApi } from 'api/registerPlayApi'

export const usePlayerByRegistergenreID = (params) => {
  const queryKey = ['player-by-event', params]
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () =>
      await registerPlayApi.getListUserRegisterByEventID(params),
    enabled: !!params && !!params.LanguagesID,
  })
  return { data: data?.data, total: data?.totals, loading: isLoading, error }
}
