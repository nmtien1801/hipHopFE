import { useQuery } from '@tanstack/react-query'
import { userApi } from 'api/userApi'

export function useUser(params) {
    const queryKey = ['user', params]

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await userApi.getById(params),
        refetchOnWindowFocus: false,
        enabled: !!params && !!params.UserID && params.UserID !== 'create',
    })

    return {
        data,
        error,
        isLoading,
    }
}
