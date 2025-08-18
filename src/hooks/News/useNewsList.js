import { useQuery } from '@tanstack/react-query'
import { newsApi } from 'api/newsApi'

export function useNewsList(params) {
    const queryKey = ['news-list', params]

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await newsApi.getAll(params),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled: !!params && !!params.LanguagesID,
    })

    return {
        data: data?.data || [],
        total: data?.totals || 0,
        error,
        isLoading,
    }
}
