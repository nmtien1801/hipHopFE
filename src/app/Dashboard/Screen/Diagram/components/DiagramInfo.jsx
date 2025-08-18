import { Box, Stack, Typography } from '@mui/material'
import bg_title_white from 'assets/images/bg-title-white.png'
import { Flag } from 'components/Common/Flag'
import { useNavigate } from 'react-router-dom'
import { truncateText } from 'utils/common'
export function DiagramInfo({ genres, data }) {
  const navigate = useNavigate()
  return (
    <Box>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
        onClick={() => navigate(`/dashboard/screen/round/${data?.CoupleID}`)}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            p: '10px',
            aspectRatio: '1/1',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #b1b1b8 0%, #17171d 100%)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '50%',

              background: 'linear-gradient(180deg, #353437 0%, #0f0f15 100%)',
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ height: '50%' }}
            >
              {data?.IsWin > 0 && (
                <Box>
                  <Typography
                    color="white"
                    textAlign="center"
                    sx={{
                      fontWeight: 900,
                      fontStyle: 'italic',
                    }}
                  >
                    Champion
                  </Typography>

                  <Typography
                    variant="h6"
                    color="white"
                    textAlign="center"
                    sx={{
                      pb: 2,
                      fontWeight: 900,
                      fontFamily: 'Oswald !important',

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
                    {data?.IsWin === 1
                      ? data?.NamePlayer1
                      : data?.IsWin === 2
                      ? data?.NamePlayer2
                      : '...'}
                  </Typography>
                  <Box height={30} />
                </Box>
              )}
            </Stack>

            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ height: '50%' }}
            >
              <Typography
                variant="h5"
                color="white"
                sx={{
                  mt: 2,
                  fontWeight: 900,
                  fontStyle: 'italic',
                }}
              >
                FINAL
              </Typography>
            </Stack>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',

                bgcolor: 'white',
                height: '1px',
                transform: 'translate(-50%, -50%)',
                width: 'calc(100% + 108px)',
                zIndex: 2,
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              position="absolute"
              top="50%"
              left="50%"
              sx={{
                transform: 'translate(-50%, -50%)',
                width: 'calc(100% + 30px)',
              }}
              zIndex={3}
            >
              <Box
                flexGrow={1}
                sx={{
                  position: 'relative',
                  p: 1,
                  borderRadius: '8px',
                  background:
                    'linear-gradient(to bottom, #062671 0%, #5191ec 100%)',

                  textAlign: 'center',
                  color: 'white',

                  pl: '28px',
                  pr: '40px',
                  fontWeight: 700,
                }}
              >
                <Typography>
                  {truncateText(data?.NamePlayer1, 15) || '...'}
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: -28,

                    width: 56,
                    aspectRatio: '1/1',
                    borderRadius: '50%',
                    p: 0.75,

                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    backgroundImage:
                      'linear-gradient(180deg, #353437 0%, #0c0c12 100%)',
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'white',
                      overflow: 'hidden',
                    }}
                  >
                    {data?.FlagPlayer1 && (
                      <Flag
                        code={data?.FlagPlayer1}
                        sx={{ width: '100%', aspectRatio: 1 / 1 }}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>

              <Stack
                position="absolute"
                top="50%"
                left="50%"
                direction="row"
                justifyContent="center"
                alignItems="center"
                zIndex={1}
                sx={{
                  width: 80,
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  bgcolor: 'grey.500',
                  border: '6px solid #b1b1b8',

                  //#353437 #0f0f15
                  background:
                    'linear-gradient(180deg, #353437 0%, #0f0f15 100%)',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Typography variant="h4" fontWeight={600} color="white">
                  VS
                </Typography>
              </Stack>
              <Box
                flexGrow={1}
                sx={{
                  position: 'relative',
                  p: 1,
                  borderRadius: '8px',
                  textAlign: 'center',
                  background:
                    'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)',
                  color: 'white',
                  pr: '28px',
                  pl: '40px',
                  fontWeight: 700,
                }}
              >
                <Typography>
                  {truncateText(data?.NamePlayer2, 15) || '...'}
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: -28,

                    width: 56,
                    aspectRatio: '1/1',
                    borderRadius: '50%',
                    p: 0.75,

                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    backgroundImage:
                      'linear-gradient(180deg, #353437 0%, #0c0c12 100%)',
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'white',
                      overflow: 'hidden',
                    }}
                  >
                    {data?.FlagPlayer2 && (
                      <Flag
                        code={data?.FlagPlayer2}
                        sx={{ width: '100%', aspectRatio: 1 / 1 }}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: '50%',

          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          width: 2 / 7,

          backgroundImage: `url(${bg_title_white})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          aspectRatio: '313/119',
        }}
      >
        <Typography
          sx={{
            m: 0,
            fontFamily: 'BlowBrush',
            color: '#ffba00',
          }}
          variant="h3"
          textAlign="center"
          mb={5}
          fontWeight={600}
        >
          {genres?.GenresName}
        </Typography>
      </Box>
    </Box>
  )
}
