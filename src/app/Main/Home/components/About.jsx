import { Box, Container, Stack, Typography } from '@mui/material'
import about from 'assets/images/about.png'
import { useTranslation } from 'react-i18next'
export function About() {
    const { t } = useTranslation()
    return (
        <Box
            id="about"
            sx={{
                position: 'relative',
                pt: { xs: 5, md: 12.5 },
            }}
        >
            <Container>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    sx={{ position: 'relative', zIndex: 1 }}
                >
                    <Box
                        sx={{ width: { md: '70%' } }}
                        data-aos="fade-left"
                        data-aos-duration="3000"
                    >
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            {t('about-title')}
                        </Typography>
                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                            {t('about-content')}
                        </Typography>
                    </Box>
                </Stack>
            </Container>

            <Box
                sx={{
                    width: '100%',
                    marginTop: { xs: '-27%' },
                }}
                data-aos="fade-up"
                data-aos-duration="3000"
            >
                <Box
                    component="img"
                    alt="about"
                    src={about}
                    width="100%"
                    sx={{ opacity: 0.8 }}
                />
            </Box>
        </Box>
    )
}
