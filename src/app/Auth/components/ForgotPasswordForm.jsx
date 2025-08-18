import { Button } from 'components/Common/Button'
import { InputField } from 'components/FormFields/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
    UserName: yup.string().required('User name is required'),
    PassWordNew: yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            'Password must contain at least 6 characters, including one letter and one number',
        )
        .required('Password is required'),
    PassWordNewAgain: yup
        .string()
        .oneOf(
            [yup.ref('PassWordNew'), null],
            'Password confirmation does not match',
        ),
})

ForgotPasswordForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
}

export function ForgotPasswordForm({ onSubmit, loading }) {
    const [showPassword, setShowPassword] = React.useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            UserName: '',
            PassWordNew: '',
            PassWordNewAgain: '',
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
        onSubmit?.({
            ...formValues,
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
                    name="UserName"
                    label="User name"
                    control={control}
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

            <Box>
                <InputField
                    control={control}
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    name="PassWordNewAgain"
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
