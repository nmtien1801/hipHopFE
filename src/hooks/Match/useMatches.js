import { useQuery } from '@tanstack/react-query'
import { couplePlayApi } from 'api/couplePlayApi'

export function useMatches(params) {
    const queryKey = ['matches', params]
    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => await couplePlayApi.getAllPlayerCouple(params),
        enabled: !!params && !!params.EventID && !!params.GenresID,
    })
    return {
        data: data?.data || [],
        total: data?.totals || 0,
        error,
        isLoading,
        refetch,
    }
}

export function useCheckQuantifyingStatus(params) {
    const queryKey = ['checkQuantifyingStatus', params]
    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => await couplePlayApi.checkQualifyingStatus(params),
        enabled:
            !!params &&
            !!params.EventID &&
            !!params.GenresID &&
            !!params.LanguagesID,
    })
    return {
        data: data,
        error,
        isLoading,
        refetch,
    }
}

export function useCheckFirstConfrontationStatus(params) {
    const queryKey = ['checkFirstConfrontationStatus', params]
    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () =>
            await couplePlayApi.checkFirstConfrontationStatus(params),
        enabled: !!params && !!params.EventID && !!params.GenresID,
    })
    return {
        data: data,
        error,
        isLoading,
        refetch,
    }
}
export function useCheckFinalConfrontationStatus(params) {
    const queryKey = ['checkFinalConfrontation', params]
    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () =>
            await couplePlayApi.checkFinalConfrontationStatus(params),
        enabled: !!params && !!params.EventID && !!params.GenresID,
    })
    return {
        data: data,
        error,
        isLoading,
        refetch,
    }
}

export function useGetQuantifyingPoints(params) {
    const queryKey = ['getQuantifyingPoints', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await couplePlayApi.getQualifyingPoints(params),
        enabled: !!params && !!params.EventID && !!params.GenresID,
    })
    return {
        data: data,
        error,
        isLoading,
    }
}

export function useGetQualifyingList(params) {
    const queryKey = ['getQualifyingList', params]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await couplePlayApi.getQualifyingList(params),
        enabled: !!params && !!params.EventID && !!params.GenresID,
    })
    return {
        data: data,
        error,
        isLoading,
    }
}
