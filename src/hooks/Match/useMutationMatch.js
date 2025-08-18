import { useMutation, useQueryClient } from '@tanstack/react-query'
import { couplePlayApi } from 'api/couplePlayApi'

export function useMutationMatch() {
    const queryKey = ['matches']
    const queryClient = useQueryClient()

    const addMoreRound = useMutation({
        mutationFn: async (body) => await couplePlayApi.addMoreRound(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const endRound = useMutation({
        mutationFn: async (body) => await couplePlayApi.endPlayRound(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const createRound = useMutation({
        mutationFn: async (payload) =>
            await couplePlayApi.createCouplePlayRound(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const startNewMatch = useMutation({
        mutationFn: async (payload) =>
            await couplePlayApi.endCouplePlayRoundRenew(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const createTopRanking = useMutation({
        mutationFn: async (payload) => await couplePlayApi.addCouple(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const selectPairsManually = useMutation({
        mutationFn: async (body) => {
            await couplePlayApi.selectPairsManually(body)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getQualifyingList'] })
            queryClient.invalidateQueries({ queryKey })
        },
    })

    return {
        addMoreRound,
        endRound,
        createRound,
        startNewMatch,
        createTopRanking,
        selectPairsManually,
    }
}
