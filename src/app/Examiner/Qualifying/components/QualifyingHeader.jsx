import { Box, Stack, Typography } from '@mui/material'

export function QualifyingHeader({ tabList = [], tab }) {
    return (
        <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ bgcolor: 'primary.main', height: 50 }}
        >
            {Array.isArray(tabList) &&
                tabList.length > 0 &&
                tabList.map((item, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            mr: 4,
                            pr: 4,
                            borderRight: '2px solid white',

                            '&:last-of-type': {
                                borderRight: 'none',
                            },

                            cursor: 'pointer',
                        }}
                    >
                        <Typography
                            color="grey.300"
                            sx={{
                                lineHeight: '20px',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'white',
                                },
                                fontWeight: tab === item.key ? 700 : 600,
                                color: tab === item.key ? 'white' : 'grey.300',
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                ))}
        </Stack>
    )
}
