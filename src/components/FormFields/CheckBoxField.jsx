import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Stack,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

MultiCheckBoxField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.node,
  optionList: PropTypes.array,
  divider: PropTypes.bool,
}

export function MultiCheckBoxField({
  name,
  control,
  label,
  optionList = [],
  divider,
}) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  function handleChange(e) {
    const targetValue = e.target.value
    const isChecked = e.target.checked
    const newValue = [...value]

    if (isChecked && !newValue.includes(targetValue)) {
      newValue.push(targetValue)
    } else {
      newValue.splice(newValue.indexOf(targetValue), 1)
    }

    onChange(newValue)
  }

  return (
    <FormControl fullWidth size="small" sx={{ m: 1 }}>
      <FormLabel>{label}</FormLabel>
      <Stack spacing={0.5} className={'checkbox-wrapper'}>
        {Array.isArray(optionList) &&
          optionList.length > 0 &&
          optionList?.map((option, idx) => (
            <Box
              key={idx}
              sx={{
                '.divider__checkbox': {
                  display: 'none',
                },

                '&:last-child .divider__checkbox': {
                  display: 'block',
                },
              }}
            >
              {divider && <Divider sx={{ my: 1.5 }} />}
              <FormControlLabel
                control={
                  <Checkbox
                    name={name}
                    checked={value?.includes(option.value?.toString())}
                    onChange={handleChange}
                    value={option.value}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: '20px',
                      },
                    }}
                  />
                }
                label={option.label}
              />
              {divider && (
                <Divider className="divider__checkbox" sx={{ my: 1.5 }} />
              )}
            </Box>
          ))}
      </Stack>
      {invalid && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  )
}

export function SingleCheckBoxField({ name, control, label, onFieldChange }) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  function handleChange(e) {
    const isChecked = e.target.checked
    onChange(isChecked ? 1 : 0)
    onFieldChange?.(isChecked ? 1 : 0)
  }

  return (
    <FormControl fullWidth size="medium">
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={Boolean(value)}
            onChange={handleChange}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: '20px' },
            }}
          />
        }
        label={label}
      />

      {invalid && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  )
}
