import { Box, Stack } from '@mui/material'
import { SearchBox } from 'components/FormFields/SearchBox'
import { SortBox } from 'components/FormFields/SortBox'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

NewsFilter.propTypes = {
    params: PropTypes.object,
    onFilterChange: PropTypes.func,
}

export function NewsFilter({ params, onFilterChange }) {
    const { t } = useTranslation()
    function handleSearchChange(value) {
        onFilterChange({ ...params, key: value })
    }

    function handleTypeChange(value) {
        onFilterChange({ ...params, typeNewsID: parseInt(value) })
    }

    return (
        <Stack direction="row" justifyContent="flex-end" sx={{ mx: -1 }}>
            <Box>
                <Box sx={{ p: 1 }}>
                    <SearchBox onSearchChange={handleSearchChange} />
                </Box>
            </Box>

            <Box>
                <Box sx={{ p: 1 }}>
                    <SortBox
                        onChange={handleTypeChange}
                        defaultValue={params.typeNewsID || 'all'}
                        optionList={[
                            {
                                label: t('Latest'),
                                value: '1',
                            },
                            {
                                label: t('Popular'),
                                value: '2',
                            },
                        ]}
                    />
                </Box>
            </Box>
        </Stack>
    )
}
