// hooks/Criteria/useMutationCriteria.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { criteriaApi } from 'api/criteriaApi'

export function useMutationCriteria() {
  const queryKey = ['criteria-list']
  const queryClient = useQueryClient()

  const addCriteria = useMutation({
    mutationFn: async (body) => await criteriaApi.add(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const editCriteria = useMutation({
    mutationFn: async (body) => await criteriaApi.edit(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const removeCriteria = useMutation({
    mutationFn: async (body) => await criteriaApi.remove(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  return { addCriteria, editCriteria, removeCriteria }
}
