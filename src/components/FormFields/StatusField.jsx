import {
    FormControl,
    FormControlLabel,
    Switch,
    Typography,
} from '@mui/material'
import { useController } from 'react-hook-form'

export function StatusField({
    name,
    control,
    color = 'primary',
    label,
    ...others
}) {
    const {
        field: { value, onChange },
    } = useController({
        name,
        control,
    })

    return (
        <FormControl sx={{ width: '100%' }}>
            {label && <Typography variant="body2">{label}</Typography>}
            <FormControlLabel
                control={
                    <Switch
                        color={color}
                        checked={value}
                        value={value}
                        onChange={onChange}
                        {...others}
                    />
                }
            />
        </FormControl>
    )
}
