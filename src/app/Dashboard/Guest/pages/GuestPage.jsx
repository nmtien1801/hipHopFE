import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { Loading } from 'components/Common/Loading'
import { LIMIT } from 'constants/common'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useMutationUser } from 'hooks/User/useMutationUser'
import { useUsers } from 'hooks/User/useUsers'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddGenreForGuest } from '../components/AddGenreForGuest'
import { GuestFilter } from '../components/GuestFilter'
import { GuestList } from '../components/GuestList'
import { getToken } from 'utils/hash'
import { useUserRegister } from 'hooks/Player/useUserRegister'

const title = 'staffs'
export function GuestPage() {
  const language = useSelector((state) => state.global.language)
  const token = getToken()

  const [eventId, setEventId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedGuestId, setSelectedGuestId] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
  })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, total } = useUsers(params)
  const { remove } = useMutationUser()

  const { data: eventList } = useEvents({
    page: 1,
    limit: 100000,
    LanguagesID: language,
  })

  const { data: genreList } = useGenresByEvent({
    eventID: eventId,
    LanguagesID: language,
  })

  const { addEventAndGenreForUser } = useUserRegister()

  function handleFilterChange(params) {
    setParams({ ...params })
  }

  function handleRemove(id) {
    remove
      .mutateAsync({ userID: id })
      .then(() => {
        enqueueSnackbar('Remove successfully', { variant: 'success' })
        setSelectedId(null)
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  function handleAddEventAndGenre(formValues) {
    addEventAndGenreForUser
      .mutateAsync({
        auth: {
          UserID: token?.UserID,
          UUSerID: token?.UserName,
        },
        data: {
          ...formValues,
          UserID: selectedGuestId,
        },
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Add successfully', { variant: 'success' })
          setSelectedGuestId(null)
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Container sx={{ height: '100%' }}>
        <Stack spacing={3} sx={{ height: '100%' }}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Box>
              <Typography
                variant="h5"
                textTransform={'uppercase'}
                fontWeight={700}
              >
                {t(title)}
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/#/dashboard">
                  Dashboard
                </Link>

                <Typography color="text.primary">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Typography>
              </Breadcrumbs>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate(`/dashboard/${title}/create`)}
            >
              {t('add-new')}
            </Button>
          </Stack>

          <Stack spacing={3} flexGrow={1}>
            <Box>
              <GuestFilter
                params={params}
                onFilterChange={handleFilterChange}
              />
            </Box>
            {isLoading ? (
              <Loading />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <GuestList
                  data={data || []}
                  loading={isLoading}
                  total={total}
                  onFilterChange={handleFilterChange}
                  params={params}
                  onEdit={(id) => navigate(`/dashboard/${title}/${id}`)}
                  onRemove={(id) => setSelectedId(id)}
                  onAddEventAndGenre={(id) => setSelectedGuestId(id)}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>

      <Dialog
        maxWidth="sm"
        fullWidth
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      >
        <DialogTitle>{`Confirm remove "${selectedId}"`}</DialogTitle>
        <DialogContent>Any change will not be reverted.</DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setSelectedId(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove(selectedId?.id)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="xs"
        fullWidth
        open={!!selectedGuestId}
        onClose={() => setSelectedGuestId(null)}
      >
        <DialogTitle>{`Add event and genre for guest`}</DialogTitle>
        <DialogContent>
          <Box py={1}>
            <AddGenreForGuest
              eventList={eventList}
              genreList={genreList}
              onEventChange={(id) => setEventId(id)}
              onCancel={() => setSelectedGuestId(null)}
              onSubmit={handleAddEventAndGenre}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
