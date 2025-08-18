import { useQuery } from '@tanstack/react-query'
import { registerPlayApi } from 'api/registerPlayApi'

export function useUniRanking(params) {
  const queryKey = ['uni-ranking', params]
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await registerPlayApi.getRanking(params),
  })

  return { data: data?.data, error, isLoading }
}

export function useUniRankingResult(params) {
  const queryKey = ['uni-ranking-result', params]
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await registerPlayApi.getUniRankingResult(params),
  })

  return { data: data?.data, total: data?.totals, error, isLoading }
}
