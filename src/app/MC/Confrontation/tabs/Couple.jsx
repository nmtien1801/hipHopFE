import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { CoupleList } from '../components/CoupleList'
import { SortBox } from 'components/FormFields/SortBox'
import { mapCoupleCount } from 'utils/mapping'
import { useNavigate } from 'react-router-dom'
import { useGenre } from 'hooks/Genres/useGenre'

export function Couple({
  playerCoupleList,
  profile,
  numberRound,
  onSelectCouple,
  selectedCouple,
  onGoToRound,
  onChangeRound,
  total,
}) {
  const navigate = useNavigate()

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
                <Typography>{playerCoupleList?.length || 0} COUPLE</Typography>
              </Stack>

              <Box sx={{ px: 2 }}>
                <SortBox
                  hideOptionAll
                  label={'Sort By Round'}
                  defaultValue={numberRound}
                  onChange={(value) => onChangeRound?.(value)}
                  optionList={
                    mapCoupleCount(total).length > 0
                      ? mapCoupleCount(total)
                          .map((item, idx) => ({
                            label: `top ${item * 2}`,
                            value: idx + 1,
                          }))
                          .concat([
                            {
                              label: `Final`,
                              value: mapCoupleCount(total).length + 1,
                            },
                          ])
                      : []
                  }
                />
              </Box>
            </Stack>

            <Box sx={{ px: 1.5, mt: 2 }}>
              <CoupleList
                onSelectCouple={(couple) => onSelectCouple?.(couple)}
                selectedCouple={selectedCouple}
                playerCoupleList={playerCoupleList}
              />
            </Box>
          </Box>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
            sx={{ py: 2, px: 1.5 }}
          >
            <Box>
              <Button
                onClick={() => navigate('/mc/qualifying')}
                variant="contained"
                sx={{
                  bgcolor: '#00aeff',
                  '&:hover': {
                    bgcolor: '#001119',
                  },
                }}
              >
                GO TO Qualifying
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
