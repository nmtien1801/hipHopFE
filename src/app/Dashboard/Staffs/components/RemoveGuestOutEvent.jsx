import { Box, Button, Stack } from '@mui/material'
import { SelectField } from 'components/FormFields/SelectField'
import { useForm } from 'react-hook-form'

export function RemoveGuestOutEvent({ eventList, onSubmit, onCancel }) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            EventID: undefined,
        },
    })

    const handleFormSubmit = handleSubmit((formValues) => {
        onSubmit?.(formValues)
    })
    return (
        <Stack
            spacing={2}
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
        >
            <Box>
                <SelectField
                    control={control}
                    name="EventID"
                    label="Sự kiện"
                    optionList={
                        Array.isArray(eventList) &&
                        eventList.length > 0 &&
                        eventList.map(
                            (item) =>
                                ({
                                    label: item.EventName,
                                    value: item.EventID,
                                } || []),
                        )
                    }
                />
            </Box>

            <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
                <Box>
                    <Button variant="outlined" onClick={() => onCancel?.()}>
                        Cancel
                    </Button>
                </Box>
                <Box>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Stack>
    )
}
