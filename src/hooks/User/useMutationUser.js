import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from 'api/userApi'
import { setToken } from 'utils/common'
import { encrypted, getToken } from 'utils/hash'

export function useMutationUser() {
  const queryKey = ['users']
  const token = getToken()
  const queryClient = useQueryClient()
  const add = useMutation({
    mutationFn: async (body) => await userApi.add(body),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey })
        queryClient.invalidateQueries({
          queryKey: ['profile', data.UserID],
        })
      }
    },
  })

  const edit = useMutation({
    mutationFn: async (body) => await userApi.edit(body),
    onSuccess: (data) => {
      if (data) {
        const isMyProfile = token && data.UserID === token.UserID
        queryClient.invalidateQueries({
          queryKey,
        })
        queryClient.invalidateQueries({
          queryKey: ['profile', data.UserID],
        })

        if (isMyProfile) {
          const token = encrypted({
            UserID: data.UserID,
            TypeUserID: data.TypeUserID,
            UserName: data.UserName,
          })

          setToken(token)
        }
      }
    },
  })

  const remove = useMutation({
    mutationFn: async (params) => {
      return await userApi.remove(params)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  return {
    add,
    edit,
    remove,
  }
}
