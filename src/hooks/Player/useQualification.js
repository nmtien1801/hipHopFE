import { registerPlayApi } from 'api/registerPlayApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useQualification(params) {
    const queryKey = ['user-qualification', params]
    const queryClient = useQueryClient()

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await registerPlayApi.getAllPlayerActive(params),
        refetchInterval: 5000,
    })

    const updatePointPlayer = useMutation({
        mutationFn: async (body) =>
            await registerPlayApi.updatePointPlayer(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    return {
        data: data?.data || [],
        error,
        isLoading,
        updatePointPlayer,
    }
}
