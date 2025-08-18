import { Box, Stack } from '@mui/material'
import bg_2 from 'assets/images/bg-doi-dau.png'
import divider from 'assets/images/divider.png'
export function Player({ couple }) {
    return (
        <Box
            width="100%"
            sx={{
                mt: -5,
                py: 3,
                backgroundImage: `url(${bg_2})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 0',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    px: 3,
                    pt: 16,
                    mx: -8,
                }}
            >
                <Box
                    sx={{
                        width: 1 / 2,
                        height: '100%',
                    }}
                >
                    <Box sx={{ px: 8 }}>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                border: '3px solid #fff',
                                borderRadius: '2px',

                                bgcolor: '#0e4500',
                                overflow: 'hidden',
                                aspectRatio: '16/9',
                            }}
                        >
                            <Box
                                component="img"
                                src={couple?.Avarta1} //couple?.Avarta1 ||
                                alt={couple?.NamePlayer1 || ''}
                                width="100%"
                                height="100%"
                                sx={{
                                    objectFit: 'contain',
                                }}
                            />
                        </Stack>

                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundImage: `url(${divider})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',

                                width: '100%',
                                mx: 'auto',
                                textAlign: 'center',
                                color: '#ffba00',
                                aspectRatio: 671 / 44,
                                my: 1,
                            }}
                        >
                            {couple.NamePlayer1 || ''}
                        </Stack>

                        <Box
                            boxShadow={3}
                            sx={{
                                width: '100%',
                                height: 40,

                                borderRadius: '4px',
                                bgcolor: 'primary.main',
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ width: 1 / 2, height: '100%' }}>
                    <Box sx={{ px: 8 }}>
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                border: '3px solid #fff',
                                borderRadius: '2px',

                                bgcolor: '#0e4500',
                                overflow: 'hidden',
                                aspectRatio: '16/9',
                            }}
                        >
                            <Box
                                width="100%"
                                height="100%"
                                component="img"
                                src={couple?.Avarta2}
                                alt={couple?.NamePlayer2 || ''}
                                sx={{
                                    objectFit: 'contain',
                                }}
                            />
                        </Stack>

                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundImage: `url(${divider})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',

                                width: '100%',
                                mx: 'auto',
                                textAlign: 'center',
                                color: '#ffba00',
                                aspectRatio: 671 / 44,
                                my: 1,
                            }}
                        >
                            {couple.NamePlayer2 || ''}
                        </Stack>

                        <Box
                            boxShadow={3}
                            sx={{
                                width: '100%',
                                height: 40,
                                borderRadius: '4px',
                                bgcolor: 'error.main',
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}
