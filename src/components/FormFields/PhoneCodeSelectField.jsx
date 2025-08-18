import { FormControl, FormHelperText } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Flag } from 'components/Common/Flag'
import { useController } from 'react-hook-form'

export default function PhoneCodeSelect({
    phoneCodeList = [],
    name,
    control,
    label = 'Choose a phone code',
    required,
    ...props
}) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    return (
        <FormControl fullWidth size="medium" error={invalid}>
            <Autocomplete
                id="phone-code-select"
                fullWidth
                size="medium"
                options={phoneCodeList}
                value={
                    phoneCodeList?.find(
                        (phoneCode) => phoneCode?.PhoneNumber === value,
                    ) || null
                }
                onChange={(event, newValue) => {
                    if (!newValue || !newValue?.PhoneNumber) {
                        return onChange(null)
                    }
                    onChange(newValue.PhoneNumber)
                }}
                autoHighlight
                getOptionLabel={(option) => option?.PhoneNumber || ''}
                onBlur={onBlur}
                ref={ref}
                isOptionEqualToValue={() => true}
                renderOption={(props, option) => {
                    // eslint-disable-next-line react/prop-types
                    const { key, ...optionProps } = props
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                        >
                            <Flag code={option.Flag} sx={{ width: 26 }} />
                            {option?.PhoneNumber} ({option?.Flag})
                        </Box>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        error={invalid}
                        helperText={error?.message}
                        required={required}
                    />
                )}
                {...props}
            />
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}
