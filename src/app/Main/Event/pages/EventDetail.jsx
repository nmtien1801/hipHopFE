import { Box, Container, Stack, Typography } from '@mui/material'
import banner from 'assets/images/rule-banner.png'
import titleBg from 'assets/images/title-bg.png'
import { useParams } from 'react-router-dom'
import Summary from '../components/Summary'
import { MainLoading } from 'components/Common/MainLoading'
import { useEvent } from 'hooks/Events/useEvent'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { Rules } from 'app/Main/Home/components/Rules'
import { useSelector } from 'react-redux'

export function EventDetail() {
  const { id } = useParams()
  const language = useSelector((state) => state.global.language)
  const { data: eventDetail, isLoading: eventDetailLoading } = useEvent({
    eventID: id,
    LanguagesID: language,
  })

  const { data } = useGenresByEvent({
    eventID: id,
    LanguagesID: language,
  })

  return eventDetailLoading ? (
    <MainLoading />
  ) : (
    <Box
      sx={{
        pb: { xs: 5, md: 12.5 },
      }}
    >
      <Box
        component="img"
        src={eventDetail?.ImagesPaths || banner}
        sx={{
          width: '100%',
          aspectRatio: '2/1',
          verticalAlign: 'middle',
        }}
      />

      <Box sx={{ my: 10 }}>
        <Container>
          <Box sx={{ mb: 8 }}>
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
                  sx={{
                    fontFamily: 'BlowBrush',
                    textAlign: 'center',
                    color: '#ffba00',
                  }}
                >
                  {eventDetail?.EventName}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Box
                sx={{
                  '& figure': {
                    mx: 0,
                  },
                  '& img': {
                    width: '100%',
                    height: '100%',
                    verticalAlign: 'middle',
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: eventDetail?.Description,
                }}
              />
            </Stack>
          </Box>
          <Rules ruleList={data} />
        </Container>
      </Box>

      <Summary />
    </Box>
  )
}

export default EventDetail
