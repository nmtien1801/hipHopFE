import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useController } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'
import { Flag } from 'components/Common/Flag'

export default function CountrySelect({ countryList, label, name, control }) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    const country =
        countryList.find((country) => `${country?.CountryID}` === `${value}`) ||
        null

    return (
        <FormControl fullWidth size="medium" error={invalid}>
            <Autocomplete
                // id="country-select"
                size="medium"
                fullWidth
                options={countryList}
                value={country}
                onChange={(event, newValue) => {
                    event.preventDefault()
                    onChange(newValue?.CountryID)
                }}
                autoHighlight
                getOptionLabel={(option) => option?.CountryName || ''}
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
                            {option?.CountryName} ({option?.Flag})
                        </Box>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label || 'Choose a country'}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        error={invalid}
                        helperText={error?.message}
                    />
                )}
            />

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}
