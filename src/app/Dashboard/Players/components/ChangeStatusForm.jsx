import { InputField } from 'components/FormFields/InputField'
import { auth } from 'constants/common'
import { Box, Button, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

ChangeStatusForm.propTypes = {
    data: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
}

export function ChangeStatusForm({ data, onCancel, onSubmit }) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            Amount: data?.AmountGenre || 0,
        },
    })

    const handleFormSubmit = handleSubmit((formValues) => {
        const formData = {
            auth,
            data: {
                Amount: formValues.Amount,
                UserID: data.UserID,
                EventID: data.EventID,
                GenresID: data.GenresID,
            },
        }
        onSubmit?.(formData)
    })
    return (
        <Stack
            component="form"
            noValidate
            spacing={2}
            onSubmit={handleFormSubmit}
        >
            <Typography>
                Amount for payment: <strong>{data.AmountGenre}</strong>
            </Typography>
            <Box py={3}>
                <InputField
                    type="number"
                    name="Amount"
                    control={control}
                    label="Amount"
                />
            </Box>
            <Button type="submit" variant="contained">
                Submit
            </Button>
            <Button variant="outlined" onClick={() => onCancel?.()}>
                Cancel
            </Button>
        </Stack>
    )
}
