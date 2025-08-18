import { Box, Stack, Typography } from '@mui/material'
import { truncateText } from 'utils/common'
import { Flag } from './Flag'

export function CoupleItem({
  mode,
  player_1,
  player_2,
  isEnd,
  onClick,
  flag_1,
  flag_2,
}) {
  return (
    <Box sx={{ width: '100%', height: '100%' }} onClick={() => onClick?.()}>
      {mode === 'right' && (
        <Box sx={{ py: 3, height: '100%' }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              border: '1.5px solid white',
              borderRight: 0,
              zIndex: 0,
              cursor: 'pointer',

              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: '5%',
                p: 1,
                width: `calc(${isEnd ? 95 : 90}% - 28px)`,
                pr: '28px',
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                background:
                  'linear-gradient(to bottom, #062671 0%, #5191ec 100%)',
              }}
            >
              <Typography>{truncateText(player_1, 15) || '...'}</Typography>

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
                    background:
                      'linear-gradient(to bottom, #062671 0%, #5191ec 100%)',
                  }}
                >
                  {flag_1 && (
                    <Flag
                      code={flag_1}
                      sx={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: -20,
                left: '5%',
                p: 1,
                width: `calc(${isEnd ? 95 : 90}% - 28px)`,
                pr: '28px',

                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                background:
                  'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)',
              }}
            >
              <Typography>{truncateText(player_2, 15) || '...'}</Typography>

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
                    background:
                      'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)',
                  }}
                >
                  {flag_2 && (
                    <Flag
                      code={flag_2}
                      sx={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      )}

      {mode === 'left' && (
        <Box sx={{ py: 3, height: '100%' }}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              border: '1.5px solid white',
              borderLeft: 0,
              zIndex: 0,
              cursor: 'pointer',

              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: '5%',
                p: 1,
                width: `calc(${isEnd ? 95 : 90}% - 28px)`,
                pl: '28px',
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                background:
                  'linear-gradient(to bottom, #062671 0%, #5191ec 100%)',
              }}
            >
              <Typography>{truncateText(player_1, 15) || '...'}</Typography>

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
                    background:
                      'linear-gradient(to bottom, #062671 0%, #5191ec 100%)',
                  }}
                >
                  {flag_1 && (
                    <Flag
                      code={flag_1}
                      sx={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: -20,
                right: '5%',
                p: 1,
                width: `calc(${isEnd ? 95 : 90}% - 28px)`,
                pl: '28px',

                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                background:
                  'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)',
              }}
            >
              <Typography>{truncateText(player_2, 15) || '...'}</Typography>

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
                    background:
                      'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)',
                  }}
                >
                  {flag_2 && (
                    <Flag
                      code={flag_2 || 'VN'}
                      sx={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  )
}
