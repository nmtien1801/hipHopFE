import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { CKEditorField } from 'components/FormFields/CKEditor/CkEditorField'
import { InputField } from 'components/FormFields/InputField'
import { SelectField } from 'components/FormFields/SelectField'
import { StatusField } from 'components/FormFields/StatusField'
import { UploadField } from 'components/FormFields/UploadField'
import { languageOptions } from 'constants/language'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const schema = yup.object().shape({
    Title: yup.string().required('Genre name is required'),
})

AddEditNewsForm.propTypes = {
    data: PropTypes.object,
    onSubmit: PropTypes.func,
    onLanguagechange: PropTypes.func,
}

export function AddEditNewsForm({ data, onSubmit, onLanguagechange, isEdit }) {
    const { t } = useTranslation()

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            Title: '',
            LanguagesID: 'vi-VN',
            StatusID: true,
            ShortDescription: '',
            Description: '',
            TypeNewsID: '1',
        },

        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (data) {
            const newData = {
                ...data,
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
            data: {
                ...formValues,
                StatusID: formValues.StatusID ? 1 : 0,
                TypeNewsID: parseInt(formValues.TypeNewsID),
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
            <Paper elevation={3}>
                <Box p={3}>
                    <Typography variant="h6" fontWeight="bold">
                        {t('Detail')}
                    </Typography>
                    <Typography variant="body2">
                        {`${t('title')}, ${t('language')}, ${t('status')}...`}
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
                            name="Title"
                            label={t('title')}
                            control={control}
                        />
                    </Box>

                    <Box>
                        <SelectField
                            name="TypeNewsID"
                            label={t('type')}
                            control={control}
                            optionList={[
                                {
                                    label: 'Latest',
                                    value: '1',
                                },
                                {
                                    label: 'Popular',
                                    value: '2',
                                },
                            ]}
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
                            label={t('description')}
                            name="Description"
                            control={control}
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" gutterBottom>
                            {t('uploadImage')}
                        </Typography>
                        <UploadField name="ImagesPaths" control={control} />
                    </Box>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="flex-end" p={3}>
                    <Button variant="contained" type="submit">
                        {isEdit ? t('Update') : t('Create')}
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    )
}
