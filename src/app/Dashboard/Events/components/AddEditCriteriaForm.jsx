// components/AddEditCriteriaForm.js
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { InputField } from 'components/FormFields/InputField'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const schema = yup.object().shape({
  CritName: yup.string().required('Criteria name is required'),
  Point: yup
    .number()
    .typeError('Point must be a number')
    .required('Point is required'),
  Order: yup
    .number()
    .typeError('Order must be a number')
    .required('Order is required'),
})

AddEditCriteriaForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onLanguagechange: PropTypes.func,
  isEdit: PropTypes.bool,
}

export function AddEditCriteriaForm({ data, onSubmit }) {
  const { t } = useTranslation()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      CritName: '',
      Point: 0,
      Order: 0,
      LanguagesID: 'vi-VN',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleFormSubmit = handleSubmit((formValues) => {
    const payload = {
      data: {
        ...formValues,
        CritID: data?.CritID || null,
        EventID: data?.EventID || null,
        GenresID: data?.GenresID || null,
        DateCreated: data?.DateCreated || new Date().toISOString(),
        DateUpdated: new Date().toISOString(),
        UserCreated: data?.UserCreated || 'administrator',
        UserUpdated: 'administrator',
        key: 1,
      },
    }
    onSubmit?.(payload)
  })
  return (
    <Stack component="form" spacing={3} noValidate onSubmit={handleFormSubmit}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold">
            {data ? t('Edit Criteria') : t('Add Criteria')}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={3} p={3}>
          <Box>
            <InputField
              name="CritName"
              label={t('CritName')}
              control={control}
            />
          </Box>
          <Box>
            <InputField
              name="Point"
              label={t('Point')}
              type="number"
              control={control}
            />
          </Box>
          {/* <Box>
            <InputField
              name="Order"
              label={t('Order')}
              type="number"
              control={control}
            />
          </Box> */}
          <Box>
            <Button variant="contained" type="submit">
              {data ? t('Update') : t('Create')}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
