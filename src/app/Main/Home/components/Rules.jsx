import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'
import { Box, Container, IconButton } from '@mui/material'
import { RuleCard } from 'components/Common/RuleCard'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { truncateText } from 'utils/common'

export function Rules({ ruleList }) {
    const [swiper, setSwiper] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const navigate = useNavigate()

    return (
      <Box
        sx={{
          position: 'relative',
          mt: '-7%',
        }}
        id="rules"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              '.swiper-button-prev, .swiper-button-next': {
                display: { xs: 'none', md: 'block' },
              },
            }}
          >
            <Swiper
              onSwiper={(swiper) => setSwiper(swiper)}
              onActiveIndexChange={(swiper) =>
                setActiveIndex(swiper.activeIndex)
              }
              slidesPerView={1.5}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
              }}
              modules={[Pagination, Navigation, Autoplay]}
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
                  <SwiperSlide key={idx} style={{ height: 'auto' }}>
                    <Box sx={{ pb: 3, height: '100%' }}>
                      <RuleCard
                        onClick={() => navigate(`/home/rules/${item.GenresID}`)}
                        imageUrl={item.ImagesPaths}
                        title={item.EventName}
                        description={truncateText(item.Description, 200)}
                      />
                    </Box>
                  </SwiperSlide>
                ))}

              <IconButton
                disabled={activeIndex === 0}
                onClick={() => swiper.slidePrev()}
                color="inherit"
                sx={{
                  position: 'absolute',
                  top: 'calc(50% - 20px)',
                  left: 0,
                  zIndex: 1,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <WestIcon />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={() => swiper.slideNext()}
                disabled={activeIndex === ruleList?.length - 3}
                sx={{
                  position: 'absolute',
                  top: 'calc(50% - 20px)',
                  right: 0,
                  zIndex: 1,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <EastIcon />
              </IconButton>
            </Swiper>
          </Box>
        </Container>
      </Box>
    )
}
