import { FormControl, FormHelperText, FormLabel, Slider } from '@mui/material'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

SliderField.propTypes = {
    name: PropTypes.string,
    control: PropTypes.any,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func,
}
export function SliderField({
    name,
    control,
    label,
    min,
    max,
    step,
    onChange,
    ...props
}) {
    const {
        field: { onChange: controllerOnChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    return (
        <FormControl
            error={invalid}
            fullWidth
            sx={{
                '.MuiSlider-root': {
                    py: '13px',
                    height: '8px',
                    '.MuiSlider-thumb': {
                        width: 36,
                        height: 16,
                        borderRadius: '8px',
                        bgcolor: 'grey.200',
                    },
                },
            }}
        >
            {label && <FormLabel>{label}</FormLabel>}
            <Slider
                value={value}
                onChange={(e, value) => {
                    controllerOnChange(value)
                    onChange(value)
                }}
                min={min}
                max={max}
                step={step}
                color="primary"
                {...props}
            />

            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
    )
}
