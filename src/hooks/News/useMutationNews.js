import { useMutation, useQueryClient } from '@tanstack/react-query'
import { newsApi } from 'api/newsApi'

export function useMutationNews() {
    const queryKey = ['news-list']
    const queryClient = useQueryClient()

    const add = useMutation({
        mutationFn: async (body) => await newsApi.add(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const edit = useMutation({
        mutationFn: async (body) => await newsApi.edit(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const remove = useMutation({
        mutationFn: async (body) => await newsApi.remove(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    return {
        add,
        edit,
        remove,
    }
}
