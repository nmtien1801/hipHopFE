import { SingleCheckBoxField } from 'components/FormFields/CheckBoxField'
import { auth } from 'constants/common'
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

AddPermissionForm.propTypes = {
    moduleAccessList: PropTypes.array.isRequired,
    UserID: PropTypes.number.isRequired,
    onSubmit: PropTypes.func,
    permission: PropTypes.object,
}

export function AddPermissionForm({ moduleAccessList, UserID, onSubmit, permission }) {
    const { control, handleSubmit, getValues } = useForm({
        defaultValues: permission || {
            ModuleID: 1,
            IsView: 0,
            IsInsert: 0,
            IsDelete: 0,
            IsUpdate: 0,
        },
    })

    const handleFormSubmit = handleSubmit((formValues) => {
        const formData = {
            auth,
            data: {
                ...formValues,
                UserID,
            },
        }
        onSubmit?.(formData)
    })

    return (
        <Stack component="form" spacing={3} onSubmit={handleFormSubmit}>
            <Paper>
                <Box p={3}>
                    <Typography variant="h6" fontWeight="bold">
                        User Permission
                    </Typography>
                    <Typography variant="body2">Add user permission.</Typography>
                </Box>

                <Divider />

                <Stack sx={{ p: 3 }} spacing={3}>
                    {Array.isArray(moduleAccessList) &&
                        moduleAccessList.length > 0 &&
                        moduleAccessList.map((item, idx) => (
                            <Box key={idx}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="ModuleID"
                                            value={item.ModuleID}
                                            onChange={handleFormSubmit}
                                        />
                                    }
                                    label={item.ModuleName}
                                />
                                {item.ModuleID === getValues('ModuleID') && (
                                    <Stack spacing={1}>
                                        <SingleCheckBoxField
                                            control={control}
                                            label="Can view"
                                            name="IsView"
                                        />
                                        <SingleCheckBoxField
                                            control={control}
                                            label="Can insert"
                                            name="IsInsert"
                                        />
                                        <SingleCheckBoxField
                                            control={control}
                                            label="Can update"
                                            name="IsUpdate"
                                        />
                                        <SingleCheckBoxField
                                            control={control}
                                            label="Can delete"
                                            name="IsDelete"
                                        />
                                    </Stack>
                                )}
                            </Box>
                        ))}
                </Stack>

                <Stack direction="row" justifyContent="flex-end" sx={{ p: 3, pt: 0 }}>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    )
}
