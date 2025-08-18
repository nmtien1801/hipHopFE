import { SearchBox } from 'components/FormFields/SearchBox'
import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'

EventFilter.propTypes = {
    params: PropTypes.object,
    onFilterChange: PropTypes.func,
}

export function EventFilter({ params, onFilterChange }) {
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
