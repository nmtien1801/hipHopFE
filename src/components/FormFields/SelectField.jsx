import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

SelectField.propTypes = {
    name: PropTypes.string,
    control: PropTypes.any,
    label: PropTypes.node,
    optionList: PropTypes.array,
    onChange: PropTypes.func,
}

export function SelectField({ name, control, label, optionList, onChange, ...otherSelectProps }) {
    const {
        field: { value, onChange: controllerOnChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    return (
        <React.Fragment>
            <FormControl fullWidth size="medium" error={invalid}>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    name={name}
                    onChange={(e) => {
                        onChange?.(e.target.value)
                        controllerOnChange(e.target.value)
                    }}
                    onBlur={onBlur}
                    inputRef={ref}
                    {...otherSelectProps}
                >
                    {Array.isArray(optionList) &&
                        optionList.length > 0 &&
                        optionList?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </Select>
                {invalid && <FormHelperText error>{error.message}</FormHelperText>}
            </FormControl>
        </React.Fragment>
    )
}
