import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import bg from 'assets/images/bg-dau-1.png'
import { useGenre } from 'hooks/Genres/useGenre'
import { useMutationMatch } from 'hooks/Match/useMutationMatch'
import { useGetResultRound } from 'hooks/useCouplePlayers'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { RoundHeader } from '../components/RoundHeader'
import { RoundList } from '../components/RoundList'
import { RoundPlayer } from '../components/RoundPlayer'
export function Round() {
  const [showConfirm, setShowConfirm] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const token = getToken()
  const { enqueueSnackbar } = useSnackbar()

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

  const { addMoreRound } = useMutationMatch()

  const { data: genres } = useGenre({
    genresID: genresId,
    LanguagesID: lang,
  })

  const { data, isLoading } = useGetResultRound({
    EventId,
    CoupleID: id,
  })

  function handleAddRound() {
    addMoreRound
      .mutateAsync({
        auth: {
          UserID: token.UserID,
          UUSerID: token.UserName,
        },
        data: {
          EventID: EventId,
          CoupleID: id,
        },
      })
      .then((res) => {
        setShowConfirm(false)
        enqueueSnackbar('Add more round success', {
          variant: 'success',
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

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
      }}
    >
      <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
        {isLoading ? (
          <Typography py={2} color="white">
            Loading...
          </Typography>
        ) : (
          <Box width="100%">
            <Stack sx={{ minHeight: '100vh' }}>
              {data && (
                <Box>
                  {data?.CoupleDetail && (
                    <RoundHeader
                      data={data.CoupleDetail}
                      genresName={genres?.GenresName}
                    />
                  )}
                </Box>
              )}

              {data && (
                <Box sx={{ mb: 3 }}>
                  <RoundList data={data} />
                </Box>
              )}

              {data && (
                <Box width="100%" flexGrow={1}>
                  <RoundPlayer data={data} />
                </Box>
              )}
            </Stack>
          </Box>
        )}
      </Container>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: 'relative',
          left: 0,
          bottom: 0,
          p: 3,
          color: 'white',
        }}
      >
        <Box flexGrow={1}>
          <Button
            color="inherit"
            onClick={() => navigate('/dashboard/screen/diagram')}
            startIcon={<DoubleArrowIcon sx={{ transform: 'rotate(180deg)' }} />}
          >
            Prev
          </Button>
        </Box>

        <Box>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setShowConfirm(true)}
            startIcon={<PlusOneIcon />}
          >
            Add round
          </Button>
        </Box>
      </Stack>

      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={600}>Confirm Add Round</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          Are you sure to add one round for this couple ?
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleAddRound}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={() => setShowConfirm(false)}>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
