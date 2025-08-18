import { Box, Button, Container, Paper, Stack } from '@mui/material'
import bg_1 from 'assets/images/bg-1.jpg'
import bg from 'assets/images/main-background.jpg'
import { useAuth } from 'hooks/Auth/auth'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { QualifyingHeader } from './components/QualifyingHeader'
import { Athletic } from './tabs/Athletic'
import { Ranking } from './tabs/Ranking'
import { Result } from './tabs/Result'
import { useGenre } from 'hooks/Genres/useGenre'
const tabList = [
  {
    label: 'ATHLETIC',
    key: 'athletic',
  },
  {
    label: 'RESULT',
    key: 'result',
  },
  {
    label: 'RANKING',
    key: 'ranking',
  },
]
export function Qualifying() {
  const token = getToken()
  const [tab, setTab] = useState('athletic')
  const [athletic, setAthletic] = useState(null)

  const genreId =
    useSelector((state) => state.global.genreId) ||
    localStorage.getItem('genresId')
  const eventId =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language')

  const { data: profile } = useAuth(token?.UserID)
  const { data: genres } = useGenre({
    genresID: genreId,
    LanguagesID: lang,
  })

  if (!token) {
    return <Navigate to="/auth/login" />
  }
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="md">
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ height: '100vh' }}
        >
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              height: '85vh',
              borderRadius: '8px',

              backgroundImage: `url(${bg_1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ height: 50 }}>
              <QualifyingHeader tabList={tabList} tab={tab} />
            </Box>

            <Stack
              sx={{
                height: 'calc(100% - 50px)',
                overflow: 'hidden',
              }}
            >
              <Box flexGrow={1} sx={{ overflow: 'auto' }}>
                <Box sx={{ height: '100%' }}>
                  {tab === 'athletic' && profile && (
                    <Athletic
                      onAthleticClick={(data) => setAthletic(data)}
                      profile={profile}
                      genreId={
                        typeof genreId === 'string'
                          ? parseInt(genreId)
                          : genreId
                      }
                      eventId={
                        typeof eventId === 'string'
                          ? parseInt(eventId)
                          : eventId
                      }
                      lang={lang}
                      athletic={athletic}
                    />
                  )}
                  {tab === 'result' && athletic && (
                    <Result athletic={athletic} profile={profile} />
                  )}

                  {tab === 'ranking' && (
                    <Ranking
                      profile={profile}
                      genreId={
                        typeof genreId === 'string'
                          ? parseInt(genreId)
                          : genreId
                      }
                      eventId={
                        typeof eventId === 'string'
                          ? parseInt(eventId)
                          : eventId
                      }
                      lang={lang}
                    />
                  )}
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
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={tab === 'ranking' ? false : !athletic}
                      onClick={() =>
                        tab === 'athletic'
                          ? setTab?.('result')
                          : setTab?.('athletic')
                      }
                      sx={{
                        bgcolor: '#00aeff',
                        '&:hover': {
                          bgcolor: '#001119',
                        },
                      }}
                    >
                      {tab === 'result' || tab === 'ranking'
                        ? 'GO TO ATHLETIC'
                        : 'GO TO RESULT'}
                    </Button>
                  </Box>
                </Box>

                <Box width={{ xs: '100%', sm: 'auto' }}>
                  <Box sx={{ p: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setTab?.('ranking')}
                      sx={{
                        bgcolor: '#00aeff',
                        '&:hover': {
                          bgcolor: '#001119',
                        },
                      }}
                    >
                      GO RANKING
                    </Button>
                  </Box>
                </Box>

                <Box width={{ xs: '100%', sm: 'auto' }}>
                  <Box sx={{ p: 1 }}>
                    <Button
                      fullWidth
                      component={Link}
                      variant="contained"
                      to="/mc/confrontation"
                      sx={{
                        bgcolor: '#00aeff',
                        '&:hover': {
                          bgcolor: '#001119',
                        },
                      }}
                    >
                      Confrontation
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  )
}
