import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Stack, Typography } from '@mui/material'
import { CurrencyField } from 'components/FormFields/CurrencyField'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { formatCurrency } from 'utils/common'
import * as yup from 'yup'

const schema = yup.object().shape({
    Amount: yup
        .number()
        .required('Amount is required')
        .typeError('Amount must be a number'),
})

PaymentForm.propTypes = {
    data: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
}

export function PaymentForm({ data, onCancel, onSubmit }) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            Amount: data?.AmountGenre || 0,
        },

        resolver: yupResolver(schema),
    })

    const handleFormSubmit = handleSubmit((formValues) => {
        const formData = {
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
                Amount for payment:{' '}
                <strong>{formatCurrency(data.AmountGenre)}</strong>
            </Typography>
            <Box py={3}>
                <CurrencyField name="Amount" control={control} label="Amount" />
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
