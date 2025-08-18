import { Box, Stack } from '@mui/material'
import { SortBox } from 'components/FormFields/SortBox'

export function CoupleFilter({
    params,
    onFilterChange,
    eventOptionList,
    genreOptionList,
    EventID,
}) {
    function handleEventChange(value) {
        onFilterChange({ ...params, EventID: value })
    }
    function handleGenresChange(value) {
        onFilterChange({ ...params, GenresID: value })
    }
    function handleNumberRoundChange(value) {
        onFilterChange({ ...params, NumberRound: value })
    }

    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            flexWrap="wrap"
            sx={{ mx: -1 }}
        >
            <Box sx={{ width: { xs: '100%', sm: 1 / 3 } }}>
                <Box sx={{ p: 1 }}>
                    <SortBox
                        label="Sort by Event"
                        hideOptionAll
                        onChange={handleEventChange}
                        optionList={eventOptionList}
                    />
                </Box>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 1 / 3 } }}>
                <Box sx={{ p: 1 }}>
                    <SortBox
                        disabled={!EventID}
                        label="Sort by Genre"
                        hideOptionAll
                        onChange={handleGenresChange}
                        optionList={genreOptionList}
                    />
                </Box>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: 1 / 3 } }}>
                <Box sx={{ p: 1 }}>
                    <SortBox
                        label="Sort by Round"
                        hideOptionAll
                        onChange={handleNumberRoundChange}
                        optionList={[
                            { label: 'All', value: '0' },
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                        ]}
                    />
                </Box>
            </Box>
        </Stack>
    )
}
