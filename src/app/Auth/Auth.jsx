import bg from 'assets/images/main-background.jpg'
import { alpha, Box } from '@mui/material'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ChangePassword } from './pages/ChangePassword'
import { ForgotPassword } from './pages/ForgotPassword'
import { Login } from './pages/Login'
import { LayerRegister } from './pages/PlayerRegister'
import { LayerRegisterAgain } from './pages/PlayerRegisterAgain'
import { Welcome } from './pages/Welcome'
import NotFound from 'app/NotFound/NotFound'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { globalActions } from 'store/slice/globalSlice'

export default function Auth() {
    const dispatch = useDispatch()
    const { i18n } = useTranslation()
    useEffect(() => {
        const lang = localStorage.getItem('language') || 'vi-VN'
        const i18nLang = lang.split('-')[0]

        i18n.changeLanguage(i18nLang)
        dispatch(globalActions.setLanguage(lang))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Box
            sx={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    bgcolor: (theme) => alpha(theme.palette.common.black, 0.5),
                    backdropFilter: 'blur(2px)',
                }}
            >
                <Routes>
                    <Route index element={<Navigate to="login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="player-register" element={<LayerRegister />} />
                    <Route
                        path="player-register-again"
                        element={<LayerRegisterAgain />}
                    />
                    <Route
                        path="change-password"
                        element={<ChangePassword />}
                    />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Outlet />
            </Box>
        </Box>
    )
}
