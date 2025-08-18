import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { couplePlayApi } from 'api/couplePlayApi'
const query = 'couple-play-list'

export function usePlayerCouples(params) {
  const queryKey = [query, params]
  const { data, error, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await couplePlayApi.getAllPlayerCouple(params),
    refetchInterval: 3000,
  })
  const queryClient = useQueryClient()

  const addMoreRound = useMutation({
    mutationFn: async (body) => await couplePlayApi.addMoreRound(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const endPlayRound = useMutation({
    mutationFn: async (body) => await couplePlayApi.endPlayRound(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  return {
    data: data?.data,
    error,
    isLoading,
    total: data?.totals,
    addMoreRound,
    endPlayRound,
  }
}

export function useRound(params) {
  const queryKey = [query, params]
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await couplePlayApi.getListRound(params),
    refetchInterval: 3000,
  })

  const queryClient = useQueryClient()

  const updatePointRound = useMutation({
    mutationFn: async (body) => await couplePlayApi.updatePointRound(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  return {
    data: data?.data,
    error,
    isLoading,
    refetch,
    updatePointRound,
  }
}

export function useGetResultRound(params) {
  const queryKey = [query, params]
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await couplePlayApi.getResultRound(params),
    refetchInterval: 5000,
  })
  return { data, error, isLoading, refetch }
}
