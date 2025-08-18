import { Box, Container, Stack, Typography } from '@mui/material'
import breaking_all_style from 'assets/images/breaking-all-style.png'
import dj_rap_beatbox from 'assets/images/dj-rap-beat-box.png'
import performance from 'assets/images/performance.png'
import showcase from 'assets/images/showcase.png'
import bg from 'assets/images/summary-bg-1.png'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const summaryList = [
    {
        title: 'PERFORMANCE',
        subtitle: 'TREE',
        imageUrl: performance,
        amount: 2983,
    },
    {
        title: 'SHOWCASE',
        subtitle: 'TREE',
        imageUrl: showcase,
        amount: 2114,
    },
    {
        title: 'BREAKING-ALL-STYLE',
        subtitle: 'TREE',
        imageUrl: breaking_all_style,
        amount: 2501,
    },
    {
        title: 'DJ-RAP-BEATBOX',
        subtitle: 'TREE',
        imageUrl: dj_rap_beatbox,
        amount: 1876,
    },
]

function Summary() {
    return (
        <Box
            data-aos="fade-up"
            data-aos-duration="2000"
            sx={{
                py: { xs: 5, md: 12.5 },
                pb: { xs: 5, md: 8 },
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        '.mySwiper': {
                            '.swiper-slide': {
                                height: 'auto',
                                pb: 3,
                            },
                        },
                    }}
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 4,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {summaryList.map((item, idx) => (
                            <SwiperSlide key={idx} sx={{ height: 'auto' }}>
                                <Stack sx={{ height: '100%' }}>
                                    <Box flexGrow={1}>
                                        <Box
                                            component="img"
                                            src={item.imageUrl}
                                            width="100%"
                                        />
                                    </Box>

                                    <Stack
                                        sx={{
                                            ml: '20%',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            fontWeight={600}
                                        >
                                            {item.amount}
                                        </Typography>
                                        <Typography>{item.subtitle}</Typography>
                                        <Typography>{item.title}</Typography>
                                    </Stack>
                                </Stack>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Container>
        </Box>
    )
}

export default Summary
