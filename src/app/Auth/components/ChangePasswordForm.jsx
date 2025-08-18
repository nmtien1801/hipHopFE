import { Button } from 'components/Common/Button'
import { InputField } from 'components/FormFields/InputField'
import { getToken } from 'utils/hash'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object().shape({
    PassWordOld: yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            'Password must contain at least 6 characters, including one letter and one number',
        )
        .required('Password is required'),
    PassWordNew: yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            'Password must contain at least 6 characters, including one letter and one number',
        )
        .required('Password is required'),
})

ChangePasswordForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
}

export function ChangePasswordForm({ onSubmit, loading }) {
    const [showPassword, setShowPassword] = React.useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            PassWordOld: '',
            PassWordNew: '',
        },
        resolver: yupResolver(schema),
    })

    const profile = getToken()

    const handleClickShowPassword = () => {
        setShowPassword((x) => !x)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleFormSubmit = handleSubmit((formValues) => {
        onSubmit?.({
            ...formValues,
            UserID: parseInt(profile.UserID),
        })
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
                    control={control}
                    type={showPassword ? 'text' : 'password'}
                    label="Old Password"
                    name="PassWordOld"
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
            </Box>

            <Box>
                <InputField
                    control={control}
                    type={showPassword ? 'text' : 'password'}
                    label="New Password"
                    name="PassWordNew"
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
            </Box>

            <Typography
                component={Link}
                variant="body2"
                to="/auth/forgot-password"
                color="primary"
                sx={{
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontStyle: 'italic',
                    textAlign: 'right',
                }}
            >
                Forgot password?
            </Typography>

            <Stack alignItems="center" justifyContent="center">
                <Button
                    disabled={loading}
                    sx={{ maxWidth: 200, mx: 'auto', fontWeight: 600 }}
                    type="submit"
                >
                    CHANGE PASSWORD
                </Button>
            </Stack>
        </Stack>
    )
}
