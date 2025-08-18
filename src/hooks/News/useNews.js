import { useQuery } from '@tanstack/react-query'
import { newsApi } from 'api/newsApi'

export function useNews(params) {
    const queryKey = ['news', params]

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await newsApi.getById(params),
        refetchOnWindowFocus: false,
        enabled:
            !!params &&
            !!params.newsID &&
            params.newsID !== 'create' &&
            !!params.LanguagesID,
    })

    return {
        data,
        error,
        isLoading,
    }
}
