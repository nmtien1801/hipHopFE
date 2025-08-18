import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Container, Paper, Stack } from '@mui/material'
import bg_1 from 'assets/images/bg-1.jpg'
import bg from 'assets/images/main-background.jpg'
import { useAuth } from 'hooks/Auth/auth'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { QualifyingHeader } from './components/QualifyingHeader'
import { Athletic } from './tabs/Athletic'
import { Ranking } from './tabs/Ranking'
import { Result } from './tabs/Result'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'

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
  const navigate = useNavigate()

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
          <Box width="100%" mb={2}>
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/home')}
            >
              Về trang chủ
            </Button>
          </Box>

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
                sx={{ p: 2 }}
                direction={'row'}
                alignContent={'center'}
                justifyContent={'flex-end'}
                spacing={2}
              >
                <Box>
                  <Button
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

                <Box>
                  <Button
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

                <Box>
                  <Button
                    component={Link}
                    variant="contained"
                    to="/examiners/confrontation"
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
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  )
}
