import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { eventGenreApi } from 'api/eventGenreApi'

export const useGenresByEvent = (params) => {
    const queryKey = ['genresByEvent', params]
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => await eventGenreApi.getAll(params),
        enabled: !!params && !!params.eventID && !!params.LanguagesID,
    })

    const insertGenresToEvent = useMutation({
        mutationFn: async (body) =>
            await eventGenreApi.insertGenreToEvent(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    return {
        data,
        loading: isLoading,
        error,
        insertGenresToEvent,
    }
}
