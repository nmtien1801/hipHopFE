import { SearchBox } from 'components/FormFields/SearchBox'
import { Box, Stack } from '@mui/material'

export function GuestFilter({ params, onFilterChange }) {
    function handleSearchChange(value) {
        onFilterChange({ ...params, key: value })
    }

    return (
        <Stack direction="row" justifyContent="flex-end" sx={{ mx: -1 }}>
            <Box>
                <Box sx={{ p: 1 }}>
                    <SearchBox onSearchChange={handleSearchChange} />
                </Box>
            </Box>
        </Stack>
    )
}
