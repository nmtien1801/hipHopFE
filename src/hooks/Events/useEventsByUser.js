import { useQuery } from '@tanstack/react-query'
import { eventApi } from 'api/eventApi'

export function useEventsByUser(params) {
    const queryKey = ['eventsByUser', params]
    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => await eventApi.getEventByUser(params),
        enabled: !!params && !!params.LanguagesID && !!params.userID,
    })
    return {
        data,
        error,
        isLoading,
        refetch,
    }
}
