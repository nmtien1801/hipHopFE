import { Box, Button, Stack, Typography } from '@mui/material'
import { CheckIcon } from 'assets/icons/CheckIcon'
import { CountDownTimer } from 'components/Common/CountDownTime'
import { createRef, useEffect, useState } from 'react'
import screen_swapper from 'assets/images/khung-hinh-xanh.png'
import red_swapper from 'assets/images/khung-hinh-do.png'
import btn_screen from 'assets/images/khung-ten-nguoi-choi-xanh.png'
import btn_red from 'assets/images/khung-ten-nguoi-choi-do.png'
import divider from 'assets/images/divider.png'
// import divider from 'assets/images/divider.png'
// import player_1 from 'assets/images/player-1.png'
// import player_2 from 'assets/images/player-2.png'

export function RoundPlayer({ data, showResult, defaultTime }) {
  const [playerStart, setPlayerStart] = useState(0)
  const [time, setTime] = useState(0)
  const newData = data?.CoupleDetail
  const timeRef = createRef()
  const isWin = newData?.IsWin || 0

  useEffect(() => {
    if (!timeRef.current) return

    const interval = setInterval(() => {
      if (timeRef.current) {
        const newTime = timeRef.current.getTime()
        setTime(newTime)
        newTime === 0 && setPlayerStart(0)
      }

      if (time === undefined) {
        timeRef.current = new CountDownTimer()
      }
    }, 1000)
    return () => clearInterval(interval)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRef])

  return (
    <Stack
      direction="row"
      // alignItems="center"
      justifyContent="space-between"
      height="100%"
      sx={{
        width: '100%',
        px: 12.5,
        mt: 5,
      }}
    >
      <Box
        sx={{
          width: 2 / 5,
        }}
      >
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
              sx={{
                objectFit: 'contain',
              }}
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
              disabled={isWin !== 0}
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
                background: `url(${btn_screen})`, // 'linear-gradient(to bottom, #062671 0%, #5191ec 100%)',
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
              {' '}
              <Typography variant="h5" fontWeight={600}>
                {' '}
                {data?.CoupleDetail?.FullName}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Box>

      <Stack alignItems="center" sx={{ width: 1 / 5 }}>
        {isWin === 0 ? null : (
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
                      '0 0 10px #0095eb, 0 0 20px #0095eb, 0 0 30px #0095eb',
                  },
                  '50%': {
                    textShadow:
                      '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700',
                  },
                  '100%': {
                    textShadow:
                      '0 0 10px #ff0095, 0 0 20px #ff0095, 0 0 30px #ff0095',
                  },
                },
              }}
            >
              {isWin === 1
                ? newData?.FullName
                : isWin === 2
                ? newData?.FullName_1
                : ''}
            </Box>
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          width: 2 / 5,
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          sx={{
            width: '100%',
          }}
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
              component="img"
              width="100%"
              height="100%"
              src={data?.CoupleDetail?.ImagesPath_1}
              alt="player"
              sx={{
                objectFit: 'cover',
                // filter:
                //   showResult && isWin === 2
                //     ? 'drop-shadow(0px 0px 10px #ffffff)'
                //     : '',
              }}
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
              color="error"
              onClick={() => {
                setPlayerStart(2)
                timeRef.current?.reset()
                timeRef.current?.start()
                setTime(0)
              }}
              size="large"
              startIcon={playerStart === 2 || isWin !== 0 ? <CheckIcon /> : '0'}
              disabled={newData && newData.IsWin !== 0}
              sx={{
                borderRadius: '10px 10px 20px 20px',
                bgcolor: 'transparent !important',
                background: `url(${btn_red})`, //'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)',
                aspectRatio: '1270/300',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&.Mui-disabled': {
                  color: 'white',

                  boxShadow:
                    showResult && isWin === 2
                      ? `0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff, 0 0 35px #fff, 0 0 40px #fff,0 0 45px #fff, 0 0 50px #fff`
                      : 'none',
                },

                boxShadow:
                  playerStart === 2
                    ? `0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff, 0 0 30px #fff, 0 0 35px #fff, 0 0 40px #fff`
                    : 'none',
              }}
            >
              {' '}
              <Typography variant="h5" fontWeight={600}>
                {' '}
                {data?.CoupleDetail?.FullName_1}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
