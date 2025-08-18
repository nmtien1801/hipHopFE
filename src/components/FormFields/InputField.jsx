import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

InputField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    control: PropTypes.any,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    InputProps: PropTypes.any,
    inputProps: PropTypes.any,
    InputLabelProps: PropTypes.any,
    sx: PropTypes.any,
    size: PropTypes.string,
    onChange: PropTypes.func,
}

export function InputField({
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
}) {
    const {
        field: { value, onChange: controllerOnChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    return (
        <TextField
            fullWidth
            size={size}
            value={value || ''}
            onChange={(e) => {
                const value = e.target.value
                controllerOnChange(value)
                onChange?.(value)
            }}
            onBlur={onBlur}
            inputRef={ref}
            label={label}
            variant={variant}
            error={invalid}
            multiline={multiline}
            rows={rows}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
            helperText={error?.message}
            inputProps={inputProps}
            required={required}
            {...props}
        />
    )
}
