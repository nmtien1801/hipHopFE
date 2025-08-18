import { registerPlayApi } from 'api/registerPlayApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useUniQualification(params) {
  const queryKey = ['user-uni-qualification', params]
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await registerPlayApi.getAllPlayerActive(params),
    // refetchInterval: 5000,
  })

  const updatePointUniPlayer = useMutation({
    mutationFn: async (body) => {
      if (!registerPlayApi.updatePointUniPlayer) {
        throw new Error('API function updatePointUniPlayer is undefined')
      }
      return await registerPlayApi.updatePointUniPlayer(body)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  return {
    data: data?.data || [],
    error,
    isLoading,
    updatePointUniPlayer,
  }
}
