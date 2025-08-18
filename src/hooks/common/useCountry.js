import { countryApi } from 'api/countryApi'
import { useQuery } from '@tanstack/react-query'

export function useCountries(params) {
    const queryKey = ['country', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await countryApi.getAll(params),
    })

    return {
        data: data?.data,
        error,
        isLoading,
    }
}

export function useCountry(params) {
    const queryKey = ['country', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await countryApi.getById(params),
    })

    return {
        data,
        error,
        isLoading,
    }
}
