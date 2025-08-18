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
        background:
          'linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      <Box>
        <Container>
          <Box sx={{ pt: 8 }}>
            <Typography
              variant="h5"
              gutterBottom
              color="white"
              fontWeight={600}
            >
              NHỮNG QUY ĐỊNH CHUNG
            </Typography>
            <br />
            <Typography color="white">
              1. Ban Tổ Chức không chịu trách nhiệm và không có nghĩa vụ giải
              quyết bất kỳ những khiếu nại hay tranh chấp nào liên quan đến vấn
              đề bản quyền của những bài dự thi hay nội dung liên quan đến bài
              dự thi do người tham dự thực hiện.
              <br />
              <br />
              2. Phần trình diễn và trang phục trong bài biểu diển phải đảm bảo
              phù hợp với văn hóa Việt Nam, thực hiện theo Quy chế biểu diễn
              nghệ thuật của Cục nghệ thuật biểu diễn – Bộ văn hóa, Thể thao và
              Du lịch.
              <br />
              <br />
              3. Ban Tổ Chức sẽ không trao giải nếu người chơi vi phạm thể lệ và
              quy định của cuộc thi hoặc thí sinh vi phạm pháp luật của nước
              Cộng Hoà Xã Hội Chủ Nghĩa Việt Nam. Trong trường hợp đó, BTC được
              quyền chọn thí sinh phù hợp nhất để thay thế.
              <br />
              <br />
              4. Ban Tổ Chức bảo lưu quyền sử dụng hình ảnh của thí sinh trong
              quá trình dự thi,cho mục đích quảng bá mà không phải thanh toán
              bất kỳ khoản phí nào.
              <br />
              <br />
              5. Trong trường hợp có tranh chấp, quyết định cuối cùng thuộc về
              Ban Tổ Chức.
              <br />
              <br />
              6. Ban Tổ Chức có quyền sửa đổi, bổ sung quy định trong trường hợp
              cần thiết.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 5, md: 12.5 },
          // mb: -5,
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
                      <Box component="img" src={item.imageUrl} width="100%" />
                    </Box>

                    <Stack
                      sx={{
                        ml: '20%',
                        color: 'white',
                      }}
                    >
                      <Typography variant="h5" fontWeight={600}>
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
    </Box>
  )
}

export default Summary
