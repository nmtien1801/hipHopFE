import { useMutation, useQueryClient } from '@tanstack/react-query'
import { genreApi } from 'api/genreApi'

export function useMutationGenre() {
    const queryKey = ['genres']
    const queryClient = useQueryClient()
    const add = useMutation({
        mutationFn: async (body) => await genreApi.add(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const edit = useMutation({
        mutationFn: async (body) => await genreApi.edit(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const remove = useMutation({
        mutationFn: async (body) => await genreApi.remove(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    return {
        add,
        edit,
        remove,
    }
}
