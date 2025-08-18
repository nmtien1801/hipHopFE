import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import CountrySelect from 'components/FormFields/CountrySelectField'
import { DateTimePickerField } from 'components/FormFields/DateTimePickerField'
import { InputField } from 'components/FormFields/InputField'
import PhoneCodeSelect from 'components/FormFields/PhoneCodeSelectField'
import { SelectField } from 'components/FormFields/SelectField'
import { StatusField } from 'components/FormFields/StatusField'
import { UploadImageField } from 'components/FormFields/UploadImageField'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const schema = yup.object().shape({
  UserName: yup.string().required('Genre name is required'),
})

AddEditPlayerForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  countryList: PropTypes.array,
  phoneCodeList: PropTypes.array,
}

export function AddEditPlayerForm({
  data,
  onSubmit,
  countryList = [],
  phoneCodeList = [],
}) {
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm({
    defaultValues: data
      ? {
          ...data,
          CountryID: data?.CountryID?.toString(),
          StatusID: Boolean(data?.StatusID),
          Birthday: dayjs(data?.Birthday),
        }
      : {
          UserName: '',
          Email: '',
          Address: '',
          PhoneNumber: '',
          ImagesPaths: '',
          PhonCode: '',
          StatusID: true,
          CountryID: '239',
          Birthday: dayjs(),
        },

    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    const formData = {
      data: {
        ...formValues,
        StatusID: formValues.StatusID ? 1 : 0,
        TypeUserID: parseInt(formValues.TypeUserID),
        CountryID: parseInt(formValues?.CountryID),
      },
    }
    onSubmit?.(formData)
  })

  return (
    <Stack component="form" spacing={3} noValidate onSubmit={handleFormSubmit}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold">
            User Detail
          </Typography>
          <Typography variant="body2">Username, Email, Status,...</Typography>
        </Box>

        <Divider />

        <Stack spacing={3} p={3}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 5, width: '60%' }}
          >
            <UploadImageField name="ImagesPaths" control={control} />
          </Stack>

          <Box>
            <Typography variant="body2">Status</Typography>
            <StatusField name="StatusID" control={control} />
          </Box>

          <Box>
            <InputField name="UserName" label="User name" control={control} />
          </Box>

          <Box>
            <InputField
              name="FullName"
              label="Display Name"
              control={control}
            />
          </Box>

          <Box>
            <SelectField
              name="TypeUserID"
              label="Role"
              control={control}
              optionList={[
                {
                  label: t('Player'),
                  value: 3,
                },

                {
                  label: 'Guest',
                  value: 5,
                },
              ]}
            />
          </Box>

          <Box>
            <DateTimePickerField
              name="Birthday"
              label="Birthday"
              control={control}
            />
          </Box>

          <Box>
            <InputField name="Email" label="Email" control={control} />
          </Box>

          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <Box width="30%">
              <PhoneCodeSelect
                phoneCodeList={phoneCodeList}
                name="PhoneCode"
                label="Phone Code"
                control={control}
              />
            </Box>
            <Box width="70%">
              <InputField
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

        <Stack direction="row" justifyContent="flex-end" p={3}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
