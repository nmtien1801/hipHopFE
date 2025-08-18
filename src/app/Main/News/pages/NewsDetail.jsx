import { Box, Container, Stack, Typography } from '@mui/material'
import overlay from 'assets/images/bg-overlay-1.png'
import titleBg from 'assets/images/title-bg.png'
import { MainLoading } from 'components/Common/MainLoading'
import dayjs from 'dayjs'
import { useNews } from 'hooks/News/useNews'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export function NewsDetail() {
  const { id } = useParams()
  const language =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language')

  const { data: newsDetail, isLoading: newsDetailLoading } = useNews({
    newsID: id,
    LanguagesID: language,
  })

  return newsDetailLoading ? (
    <MainLoading />
  ) : (
    <Box
      sx={{
        position: 'relative',
        pb: { xs: 12.5, sm: 30 },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Container maxWidth="md">
          <Box>
            <Stack sx={{ py: 4 }} justifyContent="center" alignItems="center">
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  backgroundImage: `url(${titleBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  aspectRatio: '507/193',
                }}
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight={600}
                  color="primary"
                  sx={{
                    fontFamily: 'BlowBrush',
                    textAlign: 'center',
                  }}
                >
                  News detail
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h3" gutterBottom fontWeight={600}>
                    {newsDetail?.Title}
                  </Typography>
                  <Box>
                    <Typography variant="body2" fontStyle="italic">
                      {dayjs(newsDetail?.DataCreated).format('DD/MM/YYYY')} - by{' '}
                      {newsDetail?.UserCreated}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  boxShadow={3}
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    width="100%"
                    height="100%"
                    component="img"
                    src={newsDetail?.ImagesPaths}
                    sx={{ objectFit: 'cover' }}
                  />
                </Box>

                <Stack spacing={3}>
                  <Box>
                    <Box
                      sx={{
                        '& blockquote': {
                          borderLeft: '5px solid #ccc',
                          padding: '0.5em 1em',

                          '& p': {
                            margin: 0,
                            fontStyle: 'italic',
                            color: 'grey.700',
                          },
                        },
                        '.image': {
                          mx: 'auto',
                          '& img': {
                            width: '100% !important',
                            height: 'auto !important',
                          },

                          '& figcaption': {
                            textAlign: 'center',
                          },
                        },
                      }}
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: newsDetail?.Description,
                      }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

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

export default NewsDetail
