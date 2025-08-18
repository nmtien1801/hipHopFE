import { useQuery } from '@tanstack/react-query'
import { genreApi } from 'api/genreApi'

export function useGenre(params) {
    const queryKey = ['genre', params]

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await genreApi.getById(params),
        refetchOnWindowFocus: false,
        enabled:
            !!params &&
            !!params.LanguagesID &&
            !!params.genresID &&
            params.genresID !== 'create',
    })

    return {
        data,
        error,
        isLoading,
    }
}
