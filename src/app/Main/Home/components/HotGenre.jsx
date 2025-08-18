import { Box } from '@mui/material'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function HotGenreList({ ruleList }) {
  return (
    <Box
      sx={{
        position: 'relative',
        mt: 5,
        bgcolor: 'grey.300',
      }}
      id="rules"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <Box
        sx={{
          '.swiper-button-prev, .swiper-button-next': {
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={8}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {Array.isArray(ruleList) &&
            ruleList.length > 0 &&
            ruleList.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: { xs: 2 / 1, sm: 3 / 1 },
                  }}
                >
                  <Box
                    width="100%"
                    component="img"
                    alt={item.GenresName}
                    src={item.ImageBanner}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      zIndex: 1,
                      bgcolor: 'rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  )
}
