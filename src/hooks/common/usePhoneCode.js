import { phoneCodeApi } from 'api/phoneCodeApi'
import { useQuery } from '@tanstack/react-query'

export function usePhoneCode(params) {
    const queryKey = ['phone', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await phoneCodeApi.getAll(params),
    })

    return { data: data?.data, error, isLoading }
}
