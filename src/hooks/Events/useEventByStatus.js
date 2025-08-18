import { useQuery } from '@tanstack/react-query'
import { eventApi } from 'api/eventApi'
import { useEffect } from 'react'

export const useEventByStatus = (params) => {
  const queryKey = ['eventActive', params]

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await eventApi.getActiveEvent(params)
      return response?.data || response
    },
    enabled: !!params.LanguagesID && !!params.statusID,
  })

  return { data, loading: isLoading, error }
}
