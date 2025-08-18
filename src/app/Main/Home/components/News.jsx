import { Box, Container, Stack, Typography } from '@mui/material'
import overlay from 'assets/images/bg-overlay-1.png'
import layer1 from 'assets/images/layer-2.png'
import { Button } from 'components/Common/Button'
import { NewsCard } from 'components/Common/NewsCard'
import { Title } from 'components/Common/Title'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function News({ newsList }) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                position: 'relative',
                pt: { xs: 5, md: 12.5 },
                pb: { xs: 10, md: 25 },
            }}
        >
            <Container maxWidth="xl">
                <Box>
                    <Box data-aos="fade-right" data-aos-duration="2000">
                        <Title
                            type={1}
                            sx={{ position: 'relative', zIndex: 1 }}
                        >
                            <Typography
                                variant="h6"
                                color="white"
                                textTransform="uppercase"
                                fontWeight={600}
                                sx={{ maxWidth: 120 }}
                            >
                                {t('news-title')}
                            </Typography>
                        </Title>
                    </Box>

                    <Typography variant="h6" gutterBottom fontWeight={600}>
                        {t('news-subtitle')}
                    </Typography>

                    <Stack
                        data-aos="fade-up"
                        data-aos-duration="2000"
                        direction="row"
                        alignItems="center"
                        sx={{ position: 'relative', zIndex: 1, mx: -2 }}
                    >
                        <Box sx={{ width: { xs: '100%', md: 2 / 3 } }}>
                            <Stack direction="row" flexWrap="wrap">
                                {Array.isArray(newsList) &&
                                    newsList.length > 0 &&
                                    newsList.map((item, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                width: {
                                                    xs: '100%',
                                                    sm: 1 / 2,
                                                },
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/home/news/${item.NewsID}`,
                                                )
                                            }
                                        >
                                            <Box sx={{ p: 2 }}>
                                                <NewsCard
                                                    imageUrl={item.ImagesPaths}
                                                    title={item.Title}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                            </Stack>

                            <Button
                                sx={{ maxWidth: 200, mx: 'auto' }}
                                onClick={() => navigate('/home/news')}
                            >
                                {t('see-more', { ns: 'translation' })}
                            </Button>
                        </Box>

                        <Box
                            data-aos="fade-left"
                            data-aos-duration="2000"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                width: { xs: '100%', md: 1 / 3 },
                            }}
                        >
                            <Box
                                component="img"
                                alt="layer-1"
                                src={layer1}
                                width="100%"
                            />
                        </Box>
                    </Stack>
                </Box>
            </Container>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${overlay})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'repeat-x',
                }}
            />
        </Box>
    )
}
