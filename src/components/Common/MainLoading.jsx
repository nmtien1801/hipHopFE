import { Box, Stack, Typography } from '@mui/material'
import { secondaryLogo } from 'constants/common'

export function MainLoading() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,

                bgcolor: 'rgba(0, 0, 0, 1)',

                '@keyframes blinker': {
                    '0%': {
                        filter: 'drop-shadow(0 0 0.25rem #0ff) ',
                    },
                    '25%': {
                        filter: 'drop-shadow(0 0 0.25rem #00f) ',
                    },
                    '50%': {
                        filter: 'drop-shadow(0 0 0.25rem #0f0) ',
                    },
                    '75%': {
                        filter: 'drop-shadow(0 0 0.25rem #f00) ',
                    },

                    '100%': {
                        filter: 'drop-shadow(0 0 0.25rem #ff0) ',
                    },
                },

                '@keyframes blinker-wrapper': {
                    '0%': {
                        boxShadow: '10px 0px 10px 0px #0ff',
                    },
                    '25%': {
                        boxShadow: '10px 0px 10px 0px #00f',
                    },
                    '50%': {
                        boxShadow: '10px 0px 10px 0px #0f0',
                    },
                    '75%': {
                        boxShadow: '10px 0px 10px 0px #f00',
                    },

                    '100%': {
                        boxShadow: '10px 0px 10px 0px #ff0',
                    },
                },

                '& .logo': {
                    animation: 'blinker-wrapper 3s linear infinite',

                    '& img': {
                        animation: 'blinker 3s linear infinite',
                    },
                },
            }}
        >
            <Stack
                justifyContent="center"
                alignItems="center"
                className="logo"
                sx={{
                    maxWidth: 200,
                    width: '100%',
                    p: 4,
                    borderRadius: '50%',
                    mb: 3,
                }}
            >
                <Box
                    component="img"
                    width="100%"
                    src={secondaryLogo}
                    alt="logo"
                />
            </Stack>

            <Typography variant="h6" color="white">
                Loading...
            </Typography>
        </Stack>
    )
}
