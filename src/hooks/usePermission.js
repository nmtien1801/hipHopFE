import { userModuleApi } from 'api/userModuleApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function usePermission(params) {
    const queryKey = ['permission', params]

    const queryClient = useQueryClient()

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await userModuleApi.getAllPermission(params),
    })

    const insertPermission = useMutation({
        mutationFn: async (body) => await userModuleApi.insertPermission(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    return {
        data,
        error,
        isLoading,
        insertPermission,
    }
}
