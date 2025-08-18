import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material'
import CountrySelect from 'components/FormFields/CountrySelectField'
import { DateTimePickerField } from 'components/FormFields/DateTimePickerField'
import { InputField } from 'components/FormFields/InputField'
import PhoneCodeSelect from 'components/FormFields/PhoneCodeSelectField'
import { StatusField } from 'components/FormFields/StatusField'
import { UploadField } from 'components/FormFields/UploadField'
import dayjs from 'dayjs'
import { parseInt } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
    UserName: yup.string().required('Genre name is required'),
})

export function AddEditUserForm({
    data,
    onSubmit,
    countryList = [],
    phoneCodeList = [],
    onCancel,
}) {
    const [imageUrl, setImageUrl] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: data
            ? {
                  ...data,
                  CountryID: data?.CountryID?.toString(),
                  StatusID: Boolean(data?.StatusID),
                  TypeUserID: parseInt(data?.TypeUserID),
                  Birthday: dayjs(data?.Birthday),
              }
            : {
                  UserName: '',
                  Email: '',
                  Address: '',
                  ImagesPaths: '',
                  PhoneCode: '+84',
                  StatusID: true,
                  CountryID: '239',
                  Birthday: dayjs(),
              },

        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (data && data.ImagesPaths) {
            setImageUrl(data.ImagesPaths)
        }
    }, [data])

    const handleClickShowPassword = () => {
        setShowPassword((x) => !x)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleFormSubmit = handleSubmit((formValues) => {
        const formData = {
            data: {
                ...formValues,
                StatusID: formValues.StatusID ? 1 : 0,
                CountryID: parseInt(formValues?.CountryID),
                Birthday: dayjs(formValues?.Birthday).toISOString(),
            },
        }
        onSubmit?.(formData)
    })

    return (
        <Stack
            component="form"
            spacing={3}
            noValidate
            onSubmit={handleFormSubmit}
        >
            <Stack spacing={3}>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mb: 5, width: 2 / 3 }}
                >
                    <UploadField
                        name="ImagesPaths"
                        control={control}
                        onUploadChange={(image) => setImageUrl(image)}
                    >
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            sx={{
                                aspectRatio: 16 / 9,
                                bgcolor: 'grey.300',
                                color: 'grey.500',
                                borderRadius: '8px',
                            }}
                        >
                            {imageUrl ? (
                                <Box
                                    component={'img'}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        verticalAlign: 'middle',
                                    }}
                                    src={imageUrl}
                                />
                            ) : (
                                <PhotoCameraIcon sx={{ fontSize: 80 }} />
                            )}
                        </Stack>
                    </UploadField>
                </Stack>

                <Box>
                    <Typography variant="body2">Status</Typography>
                    <StatusField name="StatusID" control={control} />
                </Box>

                <Box>
                    <InputField
                        name="UserName"
                        label="User name"
                        control={control}
                        required
                    />
                </Box>

                {!data && (
                    <>
                        <Box>
                            <InputField
                                required
                                control={control}
                                type={showPassword ? 'text' : 'password'}
                                name="PassWord"
                                label="Password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
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
                                required
                                control={control}
                                type={showPassword ? 'text' : 'password'}
                                name="Confirm Password"
                                label="ConfirmPassword"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
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
                    </>
                )}

                <Box>
                    <InputField
                        required
                        name="FullName"
                        label="Display Name"
                        control={control}
                    />
                </Box>

                <Box>
                    <InputField
                        name="Email"
                        label="Email"
                        control={control}
                        required
                    />
                </Box>

                <Box>
                    <DateTimePickerField
                        name="Birthday"
                        label="Birthday"
                        control={control}
                    />
                </Box>

                <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Box width="30%">
                        <PhoneCodeSelect
                            required
                            phoneCodeList={phoneCodeList}
                            name="PhoneCode"
                            label="Phone Code"
                            control={control}
                        />
                    </Box>
                    <Box width="70%">
                        <InputField
                            required
                            name="PhoneNumber"
                            label="Phone Number"
                            control={control}
                        />
                    </Box>
                </Stack>

                <Box>
                    <CountrySelect
                        countryList={countryList}
                        name="CountryID"
                        control={control}
                    />
                </Box>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
                <Button variant="outlined" onClick={() => onCancel?.()}>
                    Cancel
                </Button>
            </Stack>
        </Stack>
    )
}
