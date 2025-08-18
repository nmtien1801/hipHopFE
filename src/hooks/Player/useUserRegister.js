import { registerPlayApi } from 'api/registerPlayApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useUserRegister(params) {
  const queryKey = ['user-register', params]
  const queryClient = useQueryClient()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: async () => await registerPlayApi.getAll(params),
    enabled: !!params,
  })

  const payment = useMutation({
    mutationFn: async (body) => await registerPlayApi.payment(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const updateStatus = useMutation({
    mutationFn: async (body) => await registerPlayApi.updateStatus(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const addEventAndGenreForUser = useMutation({
    mutationFn: async (body) =>
      await registerPlayApi.addEventAndGenreForUser(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const removeGuestOutEvent = useMutation({
    mutationFn: async (body) => await registerPlayApi.removeGuestOutEvent(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })

  const remove = useMutation({
    mutationFn: async (body) => await registerPlayApi.remove(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['user-register'] }),
  })

  return {
    data: data?.data || [],
    total: data?.totals || 0,

    error,
    isLoading,
    payment,
    updateStatus,

    addEventAndGenreForUser,
    removeGuestOutEvent,
    remove,
    refetch,
  }
}
