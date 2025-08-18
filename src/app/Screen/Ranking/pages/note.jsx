import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import bg from 'assets/images/bg-3.jpg'
import ranking_1 from 'assets/images/ranking-1.png'
import yellow_bg from 'assets/images/yellow-title-bg.png'
import { primaryLogo } from 'constants/common'
import { useRankingResult } from 'hooks/Player/useRanking'
import { useSelector } from 'react-redux'
import { RankingList } from '../components/RankingList'
import { Navigate, useNavigate } from 'react-router-dom'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { useGenre } from 'hooks/Genres/useGenre'

export function Ranking1111() {
  const navigate = useNavigate()

  const eventId =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const genreId =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'

  const { data } = useRankingResult({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    page: 1,
  })

  const { data: genres } = useGenre({
    genresID: genreId,
    LanguagesID: lang,
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Automatically switch slides every 10 seconds
  // useEffect(() => {
  //   if (Array.isArray(data) && data.length > 0) {
  //     const interval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev + 1) % data.length)
  //       setElapsedSeconds((prev) => prev + 10) // Increment elapsed time by 10 seconds
  //     }, 10000) // 10 seconds

  //     return () => clearInterval(interval) // Cleanup interval on unmount
  //   }
  // }, [data])

  // Reset elapsed time every time the slide changes
  // useEffect(() => {
  //   setElapsedSeconds(0)
  //   const secondInterval = setInterval(() => {
  //     setElapsedSeconds((prev) => prev + 1) // Increment elapsed seconds
  //   }, 1000) // 1 second

  //   return () => clearInterval(secondInterval) // Cleanup interval
  // }, [currentSlide])

  if (!eventId || !genreId) {
    return <Navigate to="/screen/welcome" replace />
  }

  return (
    <Stack
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <Box flexGrow={1}>
        <Container maxWidth="xl">
          <Box width="100%" sx={{ mx: 'auto' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              height="25vh"
              sx={{ pt: 3 }}
            >
              <Box height="100%" sx={{ width: 1 / 4 }}>
                <Box height={1 / 3}>
                  <Box
                    height="100%"
                    component="img"
                    alt="logo"
                    src={primaryLogo}
                  />
                </Box>
              </Box>

              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  height: '100%',
                  flexGrow: 1,
                  minWidth: '450px',
                  aspectRatio: '715/272',
                  backgroundImage: `url(${yellow_bg})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{ fontFamily: 'BlowBrush' }}
                >
                  {genres?.GenresName}
                </Typography>
              </Stack>

              <Box sx={{ height: '100%', width: 1 / 4 }}>
                <Box
                  height="100%"
                  width="100%"
                  component="img"
                  alt="logo"
                  src={ranking_1}
                  sx={{ objectFit: 'contain' }}
                />
              </Box>
            </Stack>

            {Array.isArray(data) && data.length > 0 && (
              <Box>
                <RankingList data={[data[currentSlide]]} />
              </Box>
            )}

            {/* Display elapsed seconds */}
            {/* <Typography
              variant="h6"
              align="center"
              sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}
            >
              Time Elapsed: {elapsedSeconds}s
            </Typography> */}
          </Box>
        </Container>
      </Box>

      <Stack
        justifyContent="space-between"
        direction="row"
        sx={{
          p: 3,
          width: '100%',
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
            onClick={() => navigate('/screen/welcome')}
            startIcon={<DoubleArrowIcon sx={{ transform: 'rotate(180deg)' }} />}
          >
            Prev
          </Button>
        </Box>

        <Box>
          <Button
            color="inherit"
            onClick={() => navigate('/screen/diagram')}
            startIcon={<DoubleArrowIcon />}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}
