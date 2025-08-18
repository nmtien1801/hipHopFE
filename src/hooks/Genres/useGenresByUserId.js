import { useQuery } from '@tanstack/react-query'
import { genreApi } from 'api/genreApi'

export function useGetGenresByUserId(params) {
    const queryKey = ['genres', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await genreApi.getGenreByUserId(params),
    })
    return { data: data?.data, total: data?.totals || 0, error, isLoading }
}
