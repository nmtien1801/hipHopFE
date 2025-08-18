import { Box, Button, Stack } from '@mui/material'
import { SelectField } from 'components/FormFields/SelectField'
import { useForm } from 'react-hook-form'
import { getToken } from 'utils/hash'

export function CreateNewConfrontation({
    onSubmit,
    GenresID,
    onCancel,
    EventID,
    confrontationOptionList = [],
}) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            NumberRoundCouple: 2,
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
                    label="Confrontation"
                    control={control}
                    optionList={confrontationOptionList || []}
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
