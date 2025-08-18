import { Box, Button, Stack } from '@mui/material'
import { SelectField } from 'components/FormFields/SelectField'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getToken } from 'utils/hash'

export function AddRoundForm({
    onSubmit,
    GenresID,
    onCancel,
    EventID,
    confrontationOptionList = [],
}) {
    const { t } = useTranslation()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            NumberRoundCouple: 1,
            NumberRound: 1,
        },
    })

    const token = getToken()

    const handleFormSubmit = handleSubmit((formValues) => {
        onSubmit?.({
            auth: {
                UserID: token?.UserID,
                UUSerID: token?.UserName,
            },
            data: {
                ...formValues,
                EventID,
                GenresID,
            },
        })
    })

    return (
        <Stack
            component="form"
            spacing={3}
            onSubmit={handleFormSubmit}
            noValidate
        >
            <Box>
                <SelectField
                    name="NumberRoundCouple"
                    label={`${t('confrontation')}`}
                    control={control}
                    optionList={confrontationOptionList || []}
                />
            </Box>
            <Box>
                <SelectField
                    name="NumberRound"
                    label={`${t('create_number_of_round')}`}
                    control={control}
                    optionList={[...Array(4)].map((_, idx) => ({
                        label: `${idx + 1} ${t('round')}`,
                        value: `${idx + 1}`,
                    }))}
                />
            </Box>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
                <Button variant="outlined" onClick={() => onCancel?.()}>
                    Cancel
                </Button>
            </Stack>
        </Stack>
    )
}
