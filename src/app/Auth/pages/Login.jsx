import { Box, Container, Paper, Typography } from '@mui/material'
import bg_title_white from 'assets/images/bg-title-white.png'
import { useAuth } from 'hooks/Auth/auth'
import { useSnackbar } from 'notistack'
import { Navigate, useNavigate } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { LoginForm } from '../components/LoginForm'
import { useTranslation } from 'react-i18next'

export function Login() {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const profile = getToken()

    const { login } = useAuth()

    function handleSubmit(formValues) {
        login
            .mutateAsync(formValues)
            .then((data) => {
                if (data) {
                    enqueueSnackbar('Login successfully', {
                        variant: 'success',
                    })
                    navigate('/auth/welcome')
                }
            })
            .catch((error) => {
                enqueueSnackbar(`${error}`, { variant: 'error' })
                console.error(error)
            })
    }

    if (profile) {
        return <Navigate to="/auth/welcome" replace />
    }

    return (
        <Box sx={{ py: { xs: 5, md: 12.5 } }}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        maxWidth: 350,
                        width: '100%',
                        mx: 'auto',

                        backgroundImage: `url(${bg_title_white})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        aspectRatio: '313/119',
                    }}
                >
                    <Typography
                        sx={{ m: 0 }}
                        variant="h4"
                        textAlign="center"
                        mb={5}
                        color="primary"
                        fontWeight={600}
                    >
                        {t('login')}
                    </Typography>
                </Box>

                <Paper sx={{ overflow: 'hidden' }}>
                    <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white' }}>
                        <Typography
                            sx={{ m: 0 }}
                            textAlign="center"
                            fontWeight={600}
                        >
                            {t('Login to your account')}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 5 }}>
                        <LoginForm
                            onSubmit={handleSubmit}
                            loading={login.isPending}
                        />
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
