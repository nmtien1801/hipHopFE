import {
    Avatar,
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
import SettingsIcon from '@mui/icons-material/Settings'

export function AddExaminerForm({
    examinerList = [],
    data,
    EventID,
    onSubmit,
    onSettingClick,
}) {
    const { t } = useTranslation()

    const lstUserID =
        (Array.isArray(data) && data.map((item) => item.UserID.toString())) ||
        []
    const { control, handleSubmit } = useForm({
        defaultValues: {
            lstUserID,
        },
    })

    const handleFormSubmit = handleSubmit((formValues) => {
        const formData = {
            auth,
            data: {
                EventID,
                lstUserID: formValues.lstUserID.map((item) => parseInt(item)),
            },
        }
        onSubmit?.(formData)
    })

    return (
        <Box component="form" onSubmit={handleFormSubmit}>
            <Box p={3}>
                <Typography variant="h6" fontWeight="bold">
                    {t('Add Examiner')}
                </Typography>
                <Typography variant="body2">
                    {t('List of event examiners')}
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
                    divider
                    name="lstUserID"
                    label={t('Examiner')}
                    control={control}
                    optionList={
                        examinerList?.map((item) => ({
                            label: (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Avatar
                                        sx={{ width: 48, height: 48 }}
                                        src={item.ImagesPaths}
                                        alt="avatar"
                                    />

                                    <Box>
                                        <Typography sx={{ m: 0 }}>
                                            {item.UserName}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: 'grey.500' }}
                                        >
                                            {item.FullName}
                                        </Typography>
                                    </Box>

                                    <Box flexGrow={1} />

                                    {lstUserID.includes(`${item.UserID}`) && (
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
                                                    onClick={() => {
                                                        if (
                                                            !(
                                                                Array.isArray(
                                                                    data,
                                                                ) &&
                                                                data.length > 0
                                                            )
                                                        )
                                                            return

                                                        const newItem =
                                                            data.find(
                                                                (i) =>
                                                                    i.UserID ===
                                                                    item.UserID,
                                                            )

                                                        if (!newItem) return
                                                        onSettingClick?.(
                                                            newItem,
                                                        )
                                                    }}
                                                >
                                                    <SettingsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    )}
                                </Stack>
                            ),
                            value: item.UserID,
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
