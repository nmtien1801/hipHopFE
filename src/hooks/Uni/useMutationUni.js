// hooks/Criteria/useMutationCriteria.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uniApi } from 'api/uniApi'

export function useMutationUni() {
  const queryKey = ['uni']
  const queryClient = useQueryClient()

  const addNumberTeamUni = useMutation({
    mutationFn: async (body) => await uniApi.add(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })
  return { addNumberTeamUni }
}
