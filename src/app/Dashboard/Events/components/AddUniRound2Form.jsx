import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Paper, Stack } from '@mui/material'
import { Button } from 'components/Common/Button'
import { InputField } from 'components/FormFields/InputField'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'

const schema = yup.object().shape({
  NumberTeam: yup
    .number()
    .typeError('This must be a number')
    .required('This must be required'),
})

AddUniRound2Form.protoTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
}

export function AddUniRound2Form({ onSubmit }) {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm({
    defaultValue: {
      NumberTeam: 0,
    },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    const formData = {
      data: {
        ...formValues,
      },
    }
    onSubmit?.(formData)
  })
  return (
    <Stack component="form" spacing={1} noValidate onSubmit={handleFormSubmit}>
      <Paper elevation={3}>
        <Stack spacing={3} p={3}>
          <Box>
            <InputField
              type="number"
              name="NumberTeam"
              label={t('Add number of uni team')}
              control={control}
              rules={{
                required: 'This field is required',
                min: { value: 1, message: 'Must be greater than 0' },
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: 'Only positive integers are allowed',
                },
              }}
            />
          </Box>

          <Box sx={{ width: 200 }}>
            <LoadingButton type="submit">{t('Start Round 2')}</LoadingButton>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
