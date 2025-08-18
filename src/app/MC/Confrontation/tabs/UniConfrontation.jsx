import { Box, Paper, Stack, Typography } from '@mui/material'
import { UniFinalList } from '../components/UniFinalList'
import { useUniQualification } from 'hooks/Player/useUniQualification'
import { useGenre } from 'hooks/Genres/useGenre'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'
import { Button } from 'components/Common/Button'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

export function UniConfrontation({
  onAthleticClick,
  profile,
  eventId,
  genreId,
  lang,
  athletic,
}) {
  console.log('eventId', eventId)
  console.log('genreId', genreId)
  const navigate = useNavigate()
  const { data: dataUniRound2 } = useUniRankingResult({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    isChose: 1,
    page: 1,
    limit: 10,
  })

  const { data: genres } = useGenre({
    genresID: genreId,
    LanguagesID: lang,
  })
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <Paper
        sx={{ width: '100%', height: '75vh', overflow: 'hidden' }}
        elevation={3}
      >
        <Stack sx={{ height: '100%', overflow: 'hidden' }}>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ bgcolor: 'primary.main', height: 50 }}
          >
            <Typography color="white" variant="h6" fontWeight={600}>
              Confrontation
            </Typography>
          </Stack>

          <Box height="calc(100% - 120px)" sx={{ overflow: 'auto' }}>
            <Box sx={{ my: 0.5 }}>
              <Box
                sx={{
                  display: 'inline-block',
                  p: 1,
                  bgcolor: 'black',
                }}
              >
                <Typography color="white">
                  MC NAME: {profile?.FullName}
                </Typography>
              </Box>
            </Box>

            <Stack
              direction={'row'}
              alignContent={'center'}
              justifyContent={'space-between'}
              sx={{ my: 1 }}
            >
              <Stack
                alignContent={'center'}
                justifyContent={'center'}
                sx={{
                  display: 'inline-block',
                  px: 1,

                  height: 40,
                  border: '2px solid',
                  borderColor: 'grey.300',
                  borderLeft: 0,
                }}
              >
                <Typography>UNIVERSITY FINAL</Typography>
              </Stack>
            </Stack>

            <Box sx={{ px: 1.5, mt: 2 }}>
              <UniFinalList
                data={dataUniRound2}
                onClick={(data) => onAthleticClick?.(data)}
                athletic={athletic}
              />
            </Box>
          </Box>

          <Stack
            direction={'row'}
            alignContent={'center'}
            justifyContent={'flex-end'}
            flexWrap="wrap"
            p={0.5}
          >
            <Box width={{ xs: '100%', sm: 'auto' }}>
              <Box sx={{ p: 1 }}>
                <LoadingButton
                  onClick={() => navigate(-1)}
                  sx={{
                    color: 'white',
                    bgcolor: '#00aeff',
                    '&:hover': {
                      bgcolor: '#001119',
                    },
                  }}
                >
                  GO RANKING
                </LoadingButton>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
