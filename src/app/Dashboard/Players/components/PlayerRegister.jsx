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
import { MultiCheckBoxField } from 'components/FormFields/CheckBoxField'
import CountrySelect from 'components/FormFields/CountrySelectField'
import { DateTimePickerField } from 'components/FormFields/DateTimePickerField'
import { InputField } from 'components/FormFields/InputField'
import PhoneCodeSelect from 'components/FormFields/PhoneCodeSelectField'
import { SelectField } from 'components/FormFields/SelectField'
import { UploadImageField } from 'components/FormFields/UploadImageField'
import dayjs from 'dayjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const schema = yup.object().shape({
  UserName: yup.string().required('UserName is required'),

  PassWord: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password must contain at least 6 characters, including one letter and one number',
    ),
  ConfirmPassWord: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('PassWord'), null], 'Password does not match'),

  FullName: yup.string().required('Display Name is required'),
  Email: yup.string().email('Email is not valid').required('Email is required'),
  PhoneCode: yup.string().required('Phone code is required'),

  PhoneNumber: yup.string().required('Phone number is required'),
  CountryID: yup.number().required('Country is required'),
  EventID: yup.number().required('Event is required'),
  lstGenresID: yup.array().min(1, 'Genre is required'),
  ImagesPaths: yup.string(),
  Birthday: yup.string(),
})

export function LayerRegisterForm({
  loading,
  countryList = [],
  phoneCodeList = [],
  eventList = [],
  genreList = [],
  onSubmit,
  onEventIDChange,
}) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      UserName: '',
      PassWord: '',
      ConfirmPassWord: '',
      FullName: '',
      Email: '',
      Address: '',
      PhoneCode: '+84',
      PhoneNumber: '',
      CountryID: '239',
      ImagesPaths: '',
      EventID: '',
      lstGenresID: [],
      Birthday: dayjs(),
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
    const newFormValue = {
      ...formValues,
      CountryID: parseInt(formValues.CountryID),
      lstGenresID: formValues.lstGenresID.map((item) => parseInt(item)),
      PhoneNumber: formValues.PhoneNumber.startsWith('0')
        ? formValues.PhoneNumber.slice(1)
        : formValues.PhoneNumber,
      Birthday: dayjs(formValues.Birthday).toISOString(),
    }

    onSubmit?.(newFormValue)
  })

  return (
    <Stack
      component="form"
      direction="row"
      noValidate
      onSubmit={handleFormSubmit}
      sx={{ mx: -2 }}
    >
      <Box sx={{ width: { xs: '100%', md: 1 / 2 } }}>
        <Stack sx={{ p: 2 }} spacing={2}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {t('Avatar')}
            </Typography>
            <Typography>{t('note')}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" gutterBottom>
              {t('Upload Avatar')}
            </Typography>
            <UploadImageField name="ImagesPaths" control={control} />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ width: { xs: '100%', md: 1 / 2 } }}>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {t('Information')}
          </Typography>

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
              name="ConfirmPassWord"
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

          <Box>
            <InputField
              required
              name="FullName"
              label={t('Display Name')}
              control={control}
            />
          </Box>

          <Box>
            <InputField required name="Email" label="Email" control={control} />
          </Box>

          <Box>
            <DateTimePickerField
              name="Birthday"
              label={t('birthday')}
              control={control}
            />
          </Box>

          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <Box width="35%">
              <PhoneCodeSelect
                required
                phoneCodeList={phoneCodeList}
                name="PhoneCode"
                label={t('Phone Code')}
                control={control}
              />
            </Box>
            <Box width="65%">
              <InputField
                required
                name="PhoneNumber"
                label={t('Phone Number')}
                control={control}
              />
            </Box>
          </Stack>

          <Box>
            <SelectField
              required
              label={t('Event')}
              name="EventID"
              control={control}
              optionList={eventList || []}
              onChange={(value) => onEventIDChange?.(value)}
            />
          </Box>

          <Stack direction="row" alignItems="flex-start" spacing={1}>
            {genreList?.length > 0 && (
              <Box width="50%">
                <MultiCheckBoxField
                  name="lstGenresID"
                  label={t('Genres')}
                  control={control}
                  optionList={genreList}
                />
              </Box>
            )}

            <Box flexGrow={1}>
              <CountrySelect
                countryList={countryList}
                name="CountryID"
                control={control}
                label={t('Country')}
              />
            </Box>
          </Stack>

          <Stack alignItems="center" justifyContent="center">
            <Button
              disabled={loading}
              sx={{ maxWidth: 200, mx: 'auto' }}
              type="submit"
            >
              {t('register')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}
