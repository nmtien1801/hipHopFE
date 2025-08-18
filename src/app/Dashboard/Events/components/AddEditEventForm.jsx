import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { CKEditorField } from 'components/FormFields/CKEditor/CkEditorField'
import { DateTimePickerField } from 'components/FormFields/DateTimePickerField'
import { InputField } from 'components/FormFields/InputField'
import { SelectField } from 'components/FormFields/SelectField'
import { StatusField } from 'components/FormFields/StatusField'
import { UploadField } from 'components/FormFields/UploadField'
import { languageOptions } from 'constants/language'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getToken } from 'utils/hash'
import * as yup from 'yup'

const schema = yup.object().shape({
  EventName: yup.string().required('Event name is required'),
  TimeStart: yup.date().required('Start time is required'),
  TimeEnd: yup.date().required('End time is required'),
  ImagesPaths: yup.mixed().nullable(),
})

AddEditEventForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onLanguagechange: PropTypes.func,
}

export function AddEditEventForm({ data, onSubmit, onLanguagechange, isEdit }) {
  const { t } = useTranslation()
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      EventName: '',
      LanguagesID: 'vi-VN',
      StatusID: true,
      ShortDescription: '',
      Description: '',
      ImagesPaths: '',

      TimeStart: dayjs().startOf('day'),
      TimeEnd: dayjs().endOf('day'),
    },

    resolver: yupResolver(schema),
  })
  const token = getToken()

  useEffect(() => {
    if (data) {
      const newData = {
        ...data,
        TimeStart: dayjs(data?.TimeStart),
        TimeEnd: dayjs(data?.TimeEnd),
        StatusID: Boolean(data?.StatusID),
      }
      Object.keys(newData).forEach((key) => {
        setValue(key, newData[key])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleFormSubmit = handleSubmit((formValues) => {
    const formData = {
      auth: {
        UserID: token?.UserID,
        UUSerID: token?.UserName,
      },
      data: {
        ...formValues,
        StatusID: formValues.StatusID ? 1 : 0,
        TimeStart: dayjs(formValues?.TimeStart).toISOString(),
        TimeEnd: dayjs(formValues?.TimeEnd).toISOString(),
      },
    }
    onSubmit?.(formData)
  })

  return (
    <Stack component="form" spacing={3} noValidate onSubmit={handleFormSubmit}>
      <Box>
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold">
            {t('Event Detail')}
          </Typography>
          <Typography variant="body2">
            {`${t('name')}, ${t('language')}, ${t('status')}, ${t(
              'ShortDescription',
            )}, ${t('description')}, ${t('startTime')}, ${t('endTime')}. `}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={3} p={3}>
          <Box>
            <Typography variant="caption">{t('status')}</Typography>
            <StatusField name="StatusID" control={control} />
          </Box>

          <Box>
            <InputField
              name="EventName"
              label={t('Event Name')}
              control={control}
            />
          </Box>

          <Box>
            <SelectField
              name="LanguagesID"
              label={t('language')}
              control={control}
              optionList={languageOptions}
              onChange={(value) => onLanguagechange?.(value)}
            />
          </Box>

          <Box sx={{ width: 1 / 3 }}>
            <Typography variant="body2" gutterBottom>
              {t('Card Image')}
            </Typography>

            <UploadField
              name="ImagesPaths"
              control={control}
              aspectRatio="3/4"
            />
          </Box>

          {/* <Box
                        sx={{
                            '& textarea': {
                                whiteSpace: 'pre-wrap',
                            },
                        }}
                    >
                        <InputField
                            name="ShortDescription"
                            label={t('ShortDescription')}
                            control={control}
                            multiline
                            rows={3}
                            maxLength={300}
                        />
                    </Box> */}

          <Box>
            <CKEditorField
              name="Description"
              label={t('description')}
              control={control}
            />
          </Box>

          <Box>
            <DateTimePickerField
              name="TimeStart"
              label={t('startTime')}
              control={control}
            />
          </Box>

          <Box>
            <DateTimePickerField
              name="TimeEnd"
              label={t('endTime')}
              control={control}
            />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" p={3} pt={0}>
          <Button variant="contained" type="submit">
            {isEdit ? t('Update') : t('Create')}
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
