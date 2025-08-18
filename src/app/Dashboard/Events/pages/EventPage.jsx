import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EventFilter } from '../components/EventFilter'
import { EventList } from '../components/EventList'
import { useEvents } from 'hooks/Events/useEvents'
import { useMutationEvent } from 'hooks/Events/useMutationEvent'
import { LIMIT } from 'constants/common'

export function EventPage() {
  const language = useSelector((state) => state.global.language)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
    LanguagesID: language,
  })

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data: eventList, total, loading } = useEvents(params)
  const { removeEvent } = useMutationEvent()

  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFilterChange(params) {
    setParams({ ...params })
  }

  function handleRemove(id) {
    removeEvent
      .mutateAsync({ EventID: id })
      .then(() => {
        enqueueSnackbar('Remove successfully', { variant: 'success' })
        setSelectedEvent(null)
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  console.log('eventList', eventList)
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
                {t('event')}
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/#/dashboard">
                  Dashboard
                </Link>

                <Typography color="text.primary">Event</Typography>
              </Breadcrumbs>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/dashboard/events/create')}
            >
              {t('add-new')}
            </Button>
          </Stack>

          <Stack spacing={3} flexGrow={1}>
            <Box>
              <EventFilter
                params={params}
                onFilterChange={handleFilterChange}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <EventList
                data={eventList}
                loading={loading}
                total={total}
                onFilterChange={handleFilterChange}
                params={params}
                onEdit={(id) => navigate(`/dashboard/events/${id}`)}
                onRemove={(id, name) => setSelectedEvent({ id, name })}
              />
            </Box>
          </Stack>
        </Stack>
      </Container>

      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <DialogTitle>{`${t('confirm_remove_event_title')} ${
          selectedEvent?.name
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('remove_confirm')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setSelectedEvent(null)}>
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove(selectedEvent?.id)}
          >
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
