import { useQuery } from '@tanstack/react-query'
import { genreApi } from 'api/genreApi'

export function useGenres(params) {
    const queryKey = ['genres', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await genreApi.getAll(params),
        enabled: !!params && !!params.LanguagesID,
    })

    return {
        data: data?.data,
        total: data?.totals,
        error,
        isLoading,
    }
}
