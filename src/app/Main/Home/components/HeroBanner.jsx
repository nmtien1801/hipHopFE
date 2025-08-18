import { Box, Button, Container, Stack, Typography, alpha } from '@mui/material'
import heroBanner from 'assets/images/hero-banner.png'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { truncateText } from 'utils/common'
export function HeroBanner({ ruleList }) {
    const { t } = useTranslation()

    const navigate = useNavigate()
    return (
        <Box
            sx={{
                position: 'relative',
                aspectRatio: { xs: '2/3', md: '1199/747' },
                backgroundImage: `url(${heroBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0px 0px 15px 10px rgba(0, 0, 0, 1)',
                paddingBottom: 4,
            }}
        >
            <Container maxWidth="xl" sx={{ height: '100%' }}>
                <Stack
                    direction="row"
                    width="100%"
                    height="100%"
                    alignItems="flex-end"
                    sx={{ p: { md: 3 } }}
                >
                    <Box
                        sx={{
                            maxWidth: { xs: '100%', md: '40%' },
                            p: { xs: 2, md: 3 },
                            backgroundColor: (theme) =>
                                alpha(theme.palette.common.white, 0.2),
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={16}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="mySwiper"
                        >
                            {Array.isArray(ruleList) &&
                                ruleList.length > 0 &&
                                ruleList.map((item, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Box sx={{ mb: 5 }}>
                                            <Typography
                                                component="h1"
                                                variant="h5"
                                                color="white"
                                                fontWeight={600}
                                                gutterBottom
                                            >
                                                {item.GenresName}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={2}
                                                mb={3}
                                            >
                                                <Box>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            navigate(
                                                                `/home/rules/${item.GenresID}`,
                                                            )
                                                        }
                                                    >
                                                        <Typography variant="body2">
                                                            {t(
                                                                'format-and-rule',
                                                            )}
                                                        </Typography>
                                                    </Button>
                                                </Box>

                                                <Box>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            navigate(
                                                                `/auth/player-register`,
                                                            )
                                                        }
                                                    >
                                                        <Typography variant="body2">
                                                            {t(
                                                                'register-battle',
                                                            )}
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                            </Stack>

                                            <Typography
                                                variant="body2"
                                                component="div"
                                                dangerouslySetInnerHTML={{
                                                    __html: truncateText(
                                                        item.Description,
                                                        200,
                                                    ),
                                                }}
                                            />
                                        </Box>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}
