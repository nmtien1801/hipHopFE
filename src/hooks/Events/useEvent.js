import { useQuery } from '@tanstack/react-query'
import { eventApi } from 'api/eventApi'

export const useEvent = (params) => {
    const queryKey = ['event', params]

    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => await eventApi.getById(params),
        refetchOnWindowFocus: false,
        enabled:
            !!params &&
            !!params.eventID &&
            params.eventID !== 'create' &&
            !!params.LanguagesID,
    })

    return { data, loading: isLoading, error }
}
