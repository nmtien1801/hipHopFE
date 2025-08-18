import { registerPlayApi } from 'api/registerPlayApi'
import { useQuery } from '@tanstack/react-query'

export function useJudgePoint(id) {
    const queryKey = ['judge-point', id]
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: async () =>
            await registerPlayApi.getAllJudgePoint({
                RegisterPlayGenresID: id,
            }),
    })

    return {
        data: data?.data || [],
        error,
        isLoading,
    }
}
