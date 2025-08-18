import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import bg from 'assets/images/bg-dau-1.png'
import { useGenre } from 'hooks/Genres/useGenre'
import { useGetResultRound } from 'hooks/useCouplePlayers'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { RoundHeader } from '../components/RoundHeader'
import { RoundList } from '../components/RoundList'
import { RoundPlayer } from '../components/RoundPlayer'

export function Round() {
  const [showResult, setShowResult] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const EventId =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')

  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'

  const genresId =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')

  const time =
    useSelector((state) => state.global.time) || localStorage.getItem('time')

  const { data: genres } = useGenre({
    genresID: genresId,
    LanguagesID: lang,
  })

  const { data, isLoading } = useGetResultRound({
    EventId,
    CoupleID: id,
  })

  if (!EventId) {
    return <Navigate to="/screen/welcome" replace />
  }

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        {isLoading ? (
          <Typography py={2} color="white">
            Loading...
          </Typography>
        ) : (
          <Box width="100%">
            <Stack py={3}>
              {data && (
                <Box>
                  {data?.CoupleDetail && (
                    <RoundHeader
                      data={data.CoupleDetail}
                      genresName={genres?.GenresName}
                      showResult={showResult}
                    />
                  )}
                </Box>
              )}

              {data && (
                <Box sx={{ mb: 3 }}>
                  <RoundList
                    data={data}
                    setShowResult={setShowResult}
                    showResult={showResult}
                  />
                </Box>
              )}

              {data && (
                <Box width="100%" flexGrow={1}>
                  <RoundPlayer
                    data={data}
                    showResult={showResult}
                    defaultTime={time}
                  />
                </Box>
              )}
            </Stack>
          </Box>
        )}
      </Container>

      <Stack
        direction="row"
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          p: 3,
          color: 'white',
          opacity: 0.3,

          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Box>
          <Button
            color="inherit"
            onClick={() => navigate('/screen/diagram')}
            startIcon={<DoubleArrowIcon sx={{ transform: 'rotate(180deg)' }} />}
          >
            Prev
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
