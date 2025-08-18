import PropTypes from 'prop-types'
import { Box, Stack } from '@mui/material'
import { SearchBox } from 'components/FormFields/SearchBox'
import { SortBox } from 'components/FormFields/SortBox'

NewsFilter.propTypes = {
    params: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func,
}

export function NewsFilter({ params, onFilterChange }) {
    function handleSearchChange(value) {
        onFilterChange?.({
            ...params,
            key: value,
        })
    }

    function handleTypeChange(value) {
        onFilterChange({ ...params, typeNewsID: value })
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            flexWrap="wrap"
            sx={{ mx: -1 }}
        >
            <Box width={{ xs: '100%', sm: 'auto' }}>
                <Box sx={{ p: 1 }}>
                    <SearchBox onSearchChange={handleSearchChange} />
                </Box>
            </Box>

            <Box width={{ xs: '100%', sm: 'auto' }}>
                <Box sx={{ p: 1 }}>
                    <SortBox
                        onChange={handleTypeChange}
                        defaultValue={params?.typeNewsID || 0}
                        hideOptionAll
                        optionList={[
                            {
                                label: 'All',
                                value: 0,
                            },
                            {
                                label: 'Latest',
                                value: 1,
                            },
                            {
                                label: 'Popular',
                                value: 2,
                            },
                        ]}
                    />
                </Box>
            </Box>
        </Stack>
    )
}
