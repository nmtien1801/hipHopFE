import { Box, Button, Stack } from '@mui/material'
import { SelectField } from 'components/FormFields/SelectField'
import { useForm } from 'react-hook-form'
import { getToken } from 'utils/hash'

export function AddCoupleForm({
    onSubmit,
    GenresID,
    onCancel,
    EventID,
    total = 0,
}) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            NumberTeam: total ? total * 2 : 16,
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
                    name="NumberTeam"
                    label="Choose number of top players"
                    control={control}
                    optionList={[
                        {
                            label: 'Top 16',
                            value: 16,
                        },
                        {
                            label: 'Top 32',
                            value: 32,
                        },
                    ]}
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
