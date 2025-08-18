import { NewsCard } from 'components/Common/NewsCard'
import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'

NewsList.propTypes = {
    newsList: PropTypes.array,
    onClick: PropTypes.func,
}

export function NewsList({ newsList = [], onClick }) {
    return (
        <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
            {Array.isArray(newsList) &&
                newsList.length > 0 &&
                newsList.map((item, idx) => (
                    <Box
                        key={idx}
                        sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3 } }}
                        onClick={() => onClick?.(item)}
                    >
                        <Box sx={{ p: 2 }}>
                            <NewsCard imageUrl={item.ImagesPaths} title={item.Title} />
                        </Box>
                    </Box>
                ))}
        </Stack>
    )
}
