import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { eventApi } from 'api/eventApi'

export const useExaminersByEvent = (params) => {
    const queryKey = ['examinerByEvent', params]
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => await eventApi.getAllExaminerByEventId(params),
        enabled: !!params && !!params.eventID,
    })

    const insertExaminersToEvent = useMutation({
        mutationFn: async (body) => await eventApi.insertExaminerToEvent(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const insertGenreToExaminer = useMutation({
        mutationFn: async (body) => await eventApi.insertGenreToExaminer(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    return {
        data,
        loading: isLoading,
        error,
        insertExaminersToEvent,
        insertGenreToExaminer,
    }
}
