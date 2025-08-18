import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { CKEditorField } from 'components/FormFields/CKEditor/CkEditorField'
import { CurrencyField } from 'components/FormFields/CurrencyField'
import { InputField } from 'components/FormFields/InputField'
import { SelectField } from 'components/FormFields/SelectField'
import { StatusField } from 'components/FormFields/StatusField'
import { UploadField } from 'components/FormFields/UploadField'
import { languageOptions } from 'constants/language'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UniCriteriaList } from './UniCriteriaList'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'

const schema = yup.object().shape({
  GenresName: yup.string().required('Genre name is required'),
  //   ImageBackground: yup.string().required('Image is required'),
  //   ImageBanner: yup.string().required('Image is required'),
  ImagesPaths: yup.string().required('Image is required'),
})

export function AddEditGenreForm({
  data,
  isEdit,
  onSubmit,
  onLanguagechange,
  language,
  onCreate,
  criteriaList,
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      GenresName: '',
      LanguagesID: language || 'vi-VN',
      StatusID: true,
      ShortDescription: '',
      Description: '',
      Amount: '',
      ImagesPaths: '',
      ImageBanner: '',
      isHot: false,
      IsUni: '',
    },

    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (data) {
      const newData = {
        ...data,
        StatusID: Boolean(data?.StatusID),
        IsUni: data?.IsUni ? 1 : 0,
      }
      Object.keys(newData).forEach((key) => {
        setValue(key, newData[key])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.({
      ...formValues,
      StatusID: formValues.StatusID ? 1 : 0,
    })
  })

  console.log('Data:', data)
  console.log('IsUni:', data?.IsUni)

  return (
    <Stack component="form" spacing={3} noValidate onSubmit={handleFormSubmit}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold">
            {t('Detail')}
          </Typography>

          <Typography variant="body2">
            {`${t('Genre Name')}, ${t('language')}, ${t('status')},...`}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={3} p={3}>
          <Stack direction="row">
            <Box>
              <StatusField
                name="StatusID"
                label={t('status')}
                control={control}
              />
            </Box>
            <Box>
              <Typography variant="caption"></Typography>
              <StatusField
                label={t('Hot event')}
                name="IsHot"
                color="success"
                control={control}
              />
            </Box>
          </Stack>
          <Box>
            <InputField
              name="GenresName"
              label={t('Genre Name')}
              control={control}
            />
          </Box>
          <Box>
            <SelectField
              control={control}
              label={t('Genres Type')}
              name="IsUni"
              optionList={[
                { label: 'University', value: 1 },
                { label: 'Other', value: 0 },
              ]}
            />
          </Box>
          {/* <Box sx={{ px: 1 }}>
            {Boolean(data?.IsUni) ? (
              <Button variant="contained" onClick="">
                {t('Add Criteria')}
              </Button>
            ) : (
              <></>
            )}
          </Box>

          <Box>
            <UniCriteriaList data={criteriaList} />
          </Box> */}

          <Box>
            <CurrencyField
              name="Amount"
              label={t('Unit Price')}
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

          <Box>
            <CKEditorField
              name="Description"
              label={t('description')}
              control={control}
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

          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>
              {t('Background Image')} (16:9)
            </Typography>

            <UploadField
              name="ImageBackground"
              control={control}
              aspectRatio="16/9"
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" gutterBottom>
              {t('Banner Image')}
            </Typography>

            <UploadField
              name="ImageBanner"
              control={control}
              aspectRatio="3/1"
            />
          </Box>
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end" p={3}>
          <Box sx={{ px: 1 }}>
            <Button variant="contained" type="submit">
              {isEdit ? t('Update') : t('Create')}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
