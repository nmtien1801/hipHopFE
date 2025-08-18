import { moduleAccessApi } from 'api/moduleAccessApi'
import { useQuery } from '@tanstack/react-query'

export function useModuleAccess() {
    const queryKey = ['moduleAccess']
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () => await moduleAccessApi.getAll(),
    })

    return {
        data,
        error,
        isLoading,
    }
}
