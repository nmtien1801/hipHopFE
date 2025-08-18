import { useQuery } from '@tanstack/react-query'
import { registerPlayApi } from 'api/registerPlayApi'

export function useRanking(params) {
  const queryKey = ['ranking', params]
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await registerPlayApi.getRanking(params),
  })

  return { data: data?.data, error, isLoading }
}

export function useRankingResult(params) {
  const queryKey = ['ranking-result', params]
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await registerPlayApi.getAllRankingResult(params),
    // refetchInterval: 5000,
  })

  return { data: data?.data, total: data?.totals, error, isLoading }
}
