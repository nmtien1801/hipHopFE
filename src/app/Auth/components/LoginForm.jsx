import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material'
import { Button } from 'components/Common/Button'
import { InputField } from 'components/FormFields/InputField'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object().shape({
    UserName: yup.string().required('User name is required'),
    PassWord: yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            'Password must contain at least 6 characters, including one letter and one number',
        )
        .required('Password is required'),
})

export function LoginForm({ onSubmit, loading }) {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = React.useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            UserName: '',
            PassWord: '',
        },
        resolver: yupResolver(schema),
    })

    const handleClickShowPassword = () => {
        setShowPassword((x) => !x)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleFormSubmit = handleSubmit((formValues) => {
        onSubmit?.(formValues)
    })

    return (
        <Stack
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            spacing={2}
        >
            <Box>
                <InputField
                    required
                    name="UserName"
                    label={t('User name')}
                    control={control}
                />
            </Box>

            <Box>
                <InputField
                    required
                    control={control}
                    type={showPassword ? 'text' : 'password'}
                    name="PassWord"
                    label={t('Password')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <Typography
                        component={Link}
                        variant="body2"
                        to="/auth/player-register"
                        sx={{
                            cursor: 'pointer',
                            fontStyle: 'italic',

                            '&:hover': {
                                color: 'primary.dark',
                            },
                        }}
                    >
                        {t("Don't have account")}.{' '}
                        <strong>{t('register')}</strong>
                    </Typography>
                </Box>
            </Box>

            <Stack alignItems="center" justifyContent="center">
                <Button
                    disabled={loading}
                    sx={{ maxWidth: 200, mx: 'auto', fontWeight: 600 }}
                    type="submit"
                >
                    {t('login')}
                </Button>

                <Typography
                    component={Link}
                    variant="body2"
                    to="/auth/forgot-password"
                    sx={{
                        cursor: 'pointer',
                        textAlign: 'right',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {t('Forgot your password?')}
                </Typography>
            </Stack>
        </Stack>
    )
}
