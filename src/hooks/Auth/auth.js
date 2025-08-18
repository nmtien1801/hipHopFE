import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from 'api/authApi'
import { clearToken, setToken } from 'utils/common'
import { encrypted } from 'utils/hash'

export function useAuth(UserID) {
    const queryKey = ['profile', UserID]
    const queryClient = useQueryClient()

    const { data, error, isLoading, refetch } = useQuery({
        queryKey,
        queryFn: async () => await authApi.profile({ UserID }),
        enabled: !!UserID,
    })

    const login = useMutation({
        mutationFn: async (body) => await authApi.login(body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey })
            const token = encrypted({
                UserID: data.UserID,
                TypeUserID: data.TypeUserID,
                UserName: data.UserName,
            })

            setToken(token)
        },
    })

    const playerRegister = useMutation({
        mutationFn: async (body) => await authApi.newPlayerRegister(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const playerRegisterAgain = useMutation({
        mutationFn: async (body) => await authApi.oldPlayerRegister(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const changePassword = useMutation({
        mutationFn: async (body) => await authApi.changePassword(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
    const forgotPassword = useMutation({
        mutationFn: async (body) => await authApi.forgotPassword(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })

    const logout = () => {
        // clear token on cookie
        clearToken()
        // reset all query keys
        queryClient.clear()
    }

    return {
        login,
        logout,
        playerRegister,
        playerRegisterAgain,
        changePassword,
        forgotPassword,

        // profile,
        data,
        error,
        isLoading,
        refetch,
    }
}
