import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import CountrySelect from 'components/FormFields/CountrySelectField'
import { DateTimePickerField } from 'components/FormFields/DateTimePickerField'
import { InputField } from 'components/FormFields/InputField'
import PhoneCodeSelect from 'components/FormFields/PhoneCodeSelectField'
import { SelectField } from 'components/FormFields/SelectField'
import { StatusField } from 'components/FormFields/StatusField'
import { UploadField } from 'components/FormFields/UploadField'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const regex = /^[a-z0-9]+$/

const addSchema = yup.object().shape({
  UserName: yup
    .string()
    .required('UserName is required')
    .matches(
      regex,
      'UserName should contain only lowercase letters and numbers',
    ),
  PassWord: yup.string().required('Please enter your password'),
  ConfirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('PassWord'), null], 'Passwords do not match'),
})

const editSchema = yup.object().shape({
  UserName: yup
    .string()
    .required('UserName is required')
    .matches(
      regex,
      'UserName should contain only lowercase letters and numbers',
    ),
})

export function AddEditStaffForm({
  data,
  onSubmit,
  countryList = [],
  phoneCodeList = [],
  isEdit,
}) {
  const { t } = useTranslation()
  const [imageUrl, setImageUrl] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: data
      ? {
          ...data,
          UserID: data?.UserID?.toString(),
          CountryID: data?.CountryID?.toString(),
          StatusID: Boolean(data?.StatusID),
          Birthday: dayjs(data?.Birthday),
        }
      : {
          UserID: '',
          UserName: '',
          Email: '',
          Address: '',
          ImagesPaths: '',
          PhoneCode: '+84',
          StatusID: true,
          TypeUserID: '1',
          CountryID: '239',
          PassWord: '',
          ConfirmPassword: '',
          Birthday: dayjs(),
        },

    resolver: yupResolver(isEdit ? editSchema : addSchema),
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
        TypeUserID: parseInt(formValues.TypeUserID),
        CountryID: parseInt(formValues?.CountryID),
        Birthday: dayjs(formValues?.Birthday).toISOString(),
      },
    }

    onSubmit?.(formData)
  })

  return (
    <Stack component="form" spacing={3} noValidate onSubmit={handleFormSubmit}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold">
            {t('User Detail')}
          </Typography>
          <Typography variant="body2">Username, Email, Status,...</Typography>
        </Box>

        <Divider />

        <Stack spacing={3} p={3}>
          <Stack justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
            <UploadField
              name="ImagesPaths"
              control={control}
              onUploadChange={(image) => setImageUrl(image)}
            >
              <Avatar sx={{ width: 100, height: 100 }} src={imageUrl} />
            </UploadField>
          </Stack>

          <Box>
            <Typography variant="body2">{t('Status')}</Typography>
            <StatusField name="StatusID" control={control} />
          </Box>

          <Box>
            <InputField
              disabled={Boolean(data)}
              name="UserName"
              label={t('User name')}
              control={control}
              required
            />
          </Box>

          <Box>
            <SelectField
              name="TypeUserID"
              label="Role"
              control={control}
              optionList={[
                {
                  label: t('Admin'),
                  value: 1,
                },
                {
                  label: t('Judge'),
                  value: 2,
                },
                {
                  label: 'MC',
                  value: 4,
                },
                {
                  label: t('Guest'),
                  value: 5,
                },
              ]}
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
                  label={t('Password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                  name="ConfirmPassword"
                  label={t('Confirm Password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
              label={t('Display Name')}
              control={control}
            />
          </Box>

          <Box>
            <InputField name="Email" label="Email" control={control} required />
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
                label={t('Phone Code')}
                control={control}
              />
            </Box>
            <Box width="70%">
              <InputField
                required
                name="PhoneNumber"
                label={t('Phone Number')}
                control={control}
              />
            </Box>
          </Stack>

          <Box>
            <CountrySelect
              countryList={countryList}
              name="CountryID"
              control={control}
              label={t('Country')}
            />
          </Box>
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end" p={3}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
