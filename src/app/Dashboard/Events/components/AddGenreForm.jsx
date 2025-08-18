import SettingsIcon from '@mui/icons-material/Settings'
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import { MultiCheckBoxField } from 'components/FormFields/CheckBoxField'
import { auth } from 'constants/common'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export function AddGenreForm({
    genreList = [],
    data,
    EventID,
    onSubmit,
    onSettingClick,
}) {
    const { t } = useTranslation()

    const lstGenresID =
        (Array.isArray(data) && data.map((item) => item.GenresID.toString())) ||
        []

    const { control, handleSubmit } = useForm({
        defaultValues: {
            lstGenresID,
        },
    })

    const handleFormSubmit = handleSubmit((formValues) => {
        const formData = {
            auth,
            data: {
                EventID,
                lstGenresID: formValues.lstGenresID.map((item) =>
                    parseInt(item),
                ),
            },
        }
        onSubmit?.(formData)
    })

    return (
        <Box component="form" onSubmit={handleFormSubmit}>
            <Box p={3}>
                <Typography variant="h6" fontWeight="bold">
                    {t('Genres')}
                </Typography>
                <Typography variant="body2">
                    {t('List of event genres')}
                </Typography>
            </Box>

            <Divider />

            <Box
                p={3}
                sx={{
                    '.MuiFormControlLabel-root': {
                        width: '100%',
                    },
                    '.MuiFormControlLabel-label': {
                        width: '100%',
                    },
                }}
            >
                <MultiCheckBoxField
                    name="lstGenresID"
                    label={t('Genres')}
                    control={control}
                    divider
                    optionList={
                        genreList?.map((item) => ({
                            label: (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}
                                >
                                    <Typography>{item.GenresName}</Typography>

                                    {lstGenresID?.includes(
                                        item.GenresID.toString(),
                                    ) && (
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Tooltip
                                                title="Cài đặt thể loại"
                                                arrow
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        onSettingClick?.(
                                                            item.GenresID,
                                                        )
                                                    }
                                                >
                                                    <SettingsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    )}
                                </Stack>
                            ),
                            value: item.GenresID,
                        })) || []
                    }
                />
            </Box>

            <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ p: 3, pt: 0 }}
            >
                <Button variant="contained" type="submit">
                    {t('Update')}
                </Button>
            </Stack>
        </Box>
    )
}
