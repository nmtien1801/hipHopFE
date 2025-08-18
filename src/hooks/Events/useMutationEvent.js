import { useMutation, useQueryClient } from '@tanstack/react-query'
import { couplePlayApi } from 'api/couplePlayApi'
import { eventApi } from 'api/eventApi'

export const useMutationEvent = () => {
    const queryClient = useQueryClient()
    const queryKey = ['events']

    const addEvent = useMutation({
        mutationFn: async (body) => await eventApi.add(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    const editEvent = useMutation({
        mutationFn: async (body) => await eventApi.edit(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    const removeEvent = useMutation({
        mutationFn: async (body) => await eventApi.delete(body),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey,
            }),
    })

    //
    const addCouple = useMutation({
        mutationFn: async (params, body) =>
            await couplePlayApi.addCouple(params, body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    return {
        addEvent,
        editEvent,
        removeEvent,
        addCouple,
    }
}
