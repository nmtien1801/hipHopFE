import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function SortBox({
    label,
    optionList = [],
    hideOptionAll = false,
    defaultValue = '',
    onChange,
    ...props
}) {
    const { t } = useTranslation()
    const [value, setValue] = useState(defaultValue)

    function handleChange(e) {
        if (e.target.value === 'all') {
            onChange?.('')
            setValue('all')
            return
        }
        onChange?.(e.target.value)
        setValue(e.target.value)
    }

    return (
        <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleChange}
                {...props}
            >
                {!hideOptionAll && <MenuItem value="all">{t('all')}</MenuItem>}
                {optionList?.map((option, idx) => (
                    <MenuItem value={option.value} key={idx}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
