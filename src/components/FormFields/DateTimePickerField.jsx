import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { FormControl, FormHelperText } from '@mui/material'

import { useController } from 'react-hook-form'

import PropTypes from 'prop-types'

DateTimePickerField.propTypes = {
    name: PropTypes.string,
    control: PropTypes.any,
    label: PropTypes.string,
    withTime: PropTypes.bool,
    onChange: PropTypes.func,
}

export function DateTimePickerField({
    name,
    control,
    label,
    withTime = false,
    onChange,
}) {
    const {
        field: { value, onChange: controllerOnChange },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    const Component = withTime ? DateTimePicker : DatePicker
    const format = withTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'

    return (
        <FormControl fullWidth size="small" error={invalid} required={true}>
            <Component
                label={label}
                value={value || undefined}
                onChange={(date) => {
                    onChange?.(date)
                    controllerOnChange(date)
                }}
                format={format}
            />
            {invalid && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
    )
}
