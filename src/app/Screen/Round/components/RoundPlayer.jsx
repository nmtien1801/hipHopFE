import { Box, Button, Stack, Typography } from '@mui/material'
import { CheckIcon } from 'assets/icons/CheckIcon'
import { CountDownTimer } from 'components/Common/CountDownTime'
import { createRef, useEffect, useState } from 'react'
import divider from 'assets/images/divider.png'
import screen_swapper from 'assets/images/khung-hinh-xanh.png'
import red_swapper from 'assets/images/khung-hinh-do.png'
import btn_screen from 'assets/images/khung-ten-nguoi-choi-xanh.png'
import btn_red from 'assets/images/khung-ten-nguoi-choi-do.png'

export function RoundPlayer({ data, showResult, defaultTime }) {
  const [playerStart, setPlayerStart] = useState(0)
  const [time, setTime] = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [countdown, setCountdown] = useState(5)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [showSelectedPlayer, setShowSelectedPlayer] = useState(true)
  const newData = data?.CoupleDetail
  const timeRef = createRef()
  const isWin = newData?.IsWin || 0
  const [isPaused, setIsPaused] = useState(false)

  const handleRandomPick = () => {
    const randomPlayer = Math.random() < 0.5 ? 1 : 2
    setSelectedPlayer(
      randomPlayer === 1 ? newData?.FullName : newData?.FullName_1,
    )
    setPlayerStart(randomPlayer)
    setCountdown(5)
    setIsCountingDown(true)
    setShowSelectedPlayer(true)
  }

  const handlePauseResume = () => {
    if (isPaused) {
      timeRef.current?.start()
    } else {
      timeRef.current?.pause()
    }
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    if (timeRef.current) {
      timeRef.current.pause()
      timeRef.current.reset()
    }
    setIsCountingDown(false)
    setCountdown(5)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      // event.preventDefault()
      switch (event.key.toLowerCase()) {
        case 'j':
          handlePauseResume()
          break
        case 'k':
          handleReset()
          break
        case 'l':
          handleRandomPick()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPaused, timeRef])

  useEffect(() => {
    if (!timeRef.current) return

    const interval = setInterval(() => {
      if (timeRef.current) {
        const newTime = timeRef.current.getTime()
        setTime(newTime)

        if (newTime === 0 && !isCountingDown) {
          setIsCountingDown(true)
          setCountdown(5)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRef, isCountingDown])

  useEffect(() => {
    let countdownInterval
    if (isCountingDown && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else if (countdown === 0 && isCountingDown) {
      setIsCountingDown(false)

      if (time === 0) {
        setPlayerStart((prevPlayer) => (prevPlayer === 1 ? 2 : 1))
        timeRef.current?.reset()
        timeRef.current?.start()
      } else {
        timeRef.current?.reset()
        timeRef.current?.start()
      }
    }

    return () => clearInterval(countdownInterval)
  }, [countdown, isCountingDown, time])

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      height="100%"
      spacing={5}
      sx={{
        width: '100%',
        px: 12.5,
        mt: 5,
        mb: 3,
      }}
    >
      {/* Player 1 */}
      <Box sx={{ width: 2 / 5 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          width="100%"
          zIndex={1}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              aspectRatio: '1317/805',
              p: 3,
            }}
          >
            <Box
              width="100%"
              height="100%"
              component="img"
              src={data?.CoupleDetail?.ImagesPath}
              alt="player"
              sx={{ objectFit: 'contain' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${screen_swapper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundImage: `url(${divider})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              mx: 'auto',
              textAlign: 'center',
              color: '#ffba00',
              textTransform: 'uppercase',
              aspectRatio: 671 / 44,
            }}
          ></Stack>
          <Box width="100%">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isWin !== 0 || isCountingDown}
              onClick={() => {
                setPlayerStart(1)
                timeRef.current?.reset()
                timeRef.current?.start()
              }}
              size="large"
              startIcon={playerStart === 1 || isWin !== 0 ? <CheckIcon /> : '0'}
              sx={{
                borderRadius: '10px 10px 20px 20px',
                bgcolor: 'transparent !important',
                background: `url(${btn_screen})`,
                aspectRatio: '1270/304',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&.Mui-disabled': {
                  color: 'white',
                  boxShadow:
                    showResult && isWin === 1
                      ? `0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff, 0 0 35px #fff, 0 0 40px #fff`
                      : 'none',
                },
                boxShadow:
                  playerStart === 1
                    ? `0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff, 0 0 35px #fff, 0 0 40px #fff`
                    : 'none',
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {data?.CoupleDetail?.FullName}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Box>

      <Stack
        alignItems="center"
        justifyContent="flex-start"
        sx={{ width: 1 / 5 }}
      >
        {!showResult || isWin === 0 ? (
          <>
            {isCountingDown && countdown > 0 ? (
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 700 }}>
                {countdown}
              </Typography>
            ) : (
              <CountDownTimer
                ref={timeRef}
                variant="h2"
                defaultTime={defaultTime}
                sx={{ color: 'white', fontWeight: 700 }}
              />
            )}
            <Stack direction="row" spacing={1} sx={{ display: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePauseResume}
              >
                Pause
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  timeRef.current?.pause()
                  timeRef.current?.reset()
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRandomPick}
              >
                Random
              </Button>
            </Stack>
          </>
        ) : (
          <Typography
            variant="h3"
            color="white"
            textAlign="center"
            sx={{
              pb: 2,
              fontWeight: 900,
              fontFamily: 'Oswald !important',
              animation: 'scaleText 1s',
              '@keyframes scaleText': {
                '0%': {
                  transform: 'scale(0)',
                },
                '100%': {
                  transform: 'scale(1)',
                },
              },
            }}
          >
            <Box>Winner</Box>
            <Box
              sx={{
                animation: 'textShadow 3s ease-in-out infinite alternate',
                '@keyframes textShadow': {
                  '0%': {
                    textShadow:
                      '0 0 10px #ffba00, 0 0 20px #ffba00, 0 0 30px #ffba00, 0 0 40px #ffba00',
                  },
                  '100%': {
                    textShadow:
                      '0 0 10px #ffba00, 0 0 20px #ffba00, 0 0 30px #ffba00, 0 0 40px #ffba00',
                  },
                },
              }}
            >
              {isWin === 1
                ? data?.CoupleDetail?.FullName
                : isWin === 2
                ? data?.CoupleDetail?.FullName_1
                : 'None'}
            </Box>
          </Typography>
        )}
        {selectedPlayer && showSelectedPlayer && (
          <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
            Chosen Player: {selectedPlayer}
          </Typography>
        )}
      </Stack>

      {/* Player 2 */}
      <Box sx={{ width: 2 / 5 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          width="100%"
          zIndex={1}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              aspectRatio: '1317/805',
              p: 3,
            }}
          >
            <Box
              width="100%"
              height="100%"
              component="img"
              src={data?.CoupleDetail?.ImagesPath_1}
              alt="player"
              sx={{ objectFit: 'contain' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${red_swapper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundImage: `url(${divider})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              mx: 'auto',
              textAlign: 'center',
              color: '#ffba00',
              textTransform: 'uppercase',
              aspectRatio: 671 / 44,
            }}
          ></Stack>
          <Box width="100%">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isWin !== 0 || isCountingDown}
              onClick={() => {
                setPlayerStart(2)
                timeRef.current?.reset()
                timeRef.current?.start()
              }}
              size="large"
              startIcon={playerStart === 2 || isWin !== 0 ? <CheckIcon /> : '0'}
              sx={{
                borderRadius: '10px 10px 20px 20px',
                bgcolor: 'transparent !important',
                background: `url(${btn_red})`,
                aspectRatio: '1270/304',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&.Mui-disabled': {
                  color: 'white',
                  boxShadow:
                    showResult && isWin === 2
                      ? `0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff, 0 0 35px #fff, 0 0 40px #fff`
                      : 'none',
                },
                boxShadow:
                  playerStart === 2
                    ? `0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff, 0 0 35px #fff, 0 0 40px #fff`
                    : 'none',
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {data?.CoupleDetail?.FullName_1}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
