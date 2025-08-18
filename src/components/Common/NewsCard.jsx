import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

NewsCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
}

export function NewsCard({ imageUrl, title }) {
    return (
        <Box
            id="news"
            sx={{
                cursor: 'pointer',
                '&:hover': { img: { transform: 'scale(1.1)' }, transition: '0.35s' },
            }}
        >
            <Box
                sx={{ width: '100%', borderRadius: '4px', aspectRatio: '16/9', overflow: 'hidden' }}
            >
                <Box
                    component="img"
                    alt="news"
                    src={imageUrl}
                    width="100%"
                    height="100%"
                    sx={{ objectFit: 'cover', verticalAlign: 'middle' }}
                />
            </Box>
            <Typography variant="h6" textAlign="center" fontWeight={600} sx={{ my: 1.5 }}>
                {title}
            </Typography>
        </Box>
    )
}
