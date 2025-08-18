import logo from 'assets/images/logo.png'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useAuth } from 'hooks/Auth/auth'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordForm } from '../components/ChangePasswordForm'
import bg_title_white from 'assets/images/bg-title-white.png'

export function ChangePassword() {
    const [loading, setLoading] = useState(false)
    const { changePassword } = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    function handleSubmit(formValues) {
        setLoading(true)
        changePassword
            .mutateAsync(formValues)
            .then((res) => {
                if (res) {
                    enqueueSnackbar('Change password successfully', {
                        variant: 'success',
                    })
                    navigate(-1)
                }
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    return (
        <Box sx={{ py: { xs: 5, md: 12.5 } }}>
            <Container maxWidth="sm">
                <Box sx={{ width: 100, mb: 3, mx: 'auto' }}>
                    <Box width="100%" component="img" src={logo} alt="logo" />
                </Box>

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
                        variant="h5"
                        textAlign="center"
                        mb={5}
                        color="primary"
                        fontWeight={600}
                    >
                        CHANGE PASSWORD
                    </Typography>
                </Box>

                <Paper sx={{ p: 5 }}>
                    <Box>
                        <ChangePasswordForm
                            onSubmit={handleSubmit}
                            loading={loading}
                        />
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
