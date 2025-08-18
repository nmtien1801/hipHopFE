import { useQuery } from '@tanstack/react-query'
import { userApi } from 'api/userApi'

export function useUsers(params) {
    const queryKey = ['users', params]

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await userApi.getAll(params),
    })

    return {
        data: data?.data || [],
        total: data?.totals || 0,
        error,
        isLoading,
    }
}
