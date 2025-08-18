import React from 'react'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
//₫
export const CurrencyField = ({
    name,
    control,
    label,
    multiline = false,
    rows = 5,
    InputProps,
    InputLabelProps,
    size = 'medium',
    onChange,
    required,
    inputProps,
    variant = 'outlined',
    ...props
}) => {
    const {
        field: { value, onChange: controllerOnChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    const handleChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, '')
        const formattedValue = formatNumber(rawValue)
        controllerOnChange(rawValue)
        if (onChange) {
            onChange(formattedValue)
        }
    }

    return (
        <TextField
            fullWidth
            size={size}
            value={formatNumber(value ? parseInt(value, 10) : '')}
            onChange={handleChange}
            onBlur={onBlur}
            inputRef={ref}
            label={label}
            variant={variant}
            error={invalid}
            multiline={multiline}
            rows={rows}
            InputProps={{
                ...InputProps,
                endAdornment: <React.Fragment>₫</React.Fragment>,
            }}
            InputLabelProps={InputLabelProps}
            helperText={error?.message}
            inputProps={inputProps}
            required={required}
            {...props}
        />
    )
}
