import logo from 'assets/images/logo.png'
import { useAuth } from 'hooks/Auth/auth'

import { getToken } from 'utils/hash'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LayerRegisterAgainForm } from '../components/PlayerRegisterAgainForm'
import bg_title_white from 'assets/images/bg-title-white.png'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useEventByStatus } from 'hooks/Events/useEventByStatus'

export function LayerRegisterAgain() {
  const language = useSelector((state) => state.global.language)
  const [eventID, setEventID] = useState(null)
  const [params, setParam] = useState({
    page: 1,
    limit: 500,
    LanguagesID: language,
  })

  const [paramEvent, setParamEvent] = useState({
    statusID: 1,
    LanguagesID: language,
  })

  const { enqueueSnackbar } = useSnackbar()

  // const { data: eventList } = useEvents(params)
  const { data: eventList } = useEventByStatus(paramEvent)

  const { data: genreList } = useGenresByEvent({
    eventID: eventID,
    LanguagesID: language,
  })
  const { playerRegisterAgain } = useAuth()
  const profile = getToken()
  const navigate = useNavigate()

  useEffect(() => {
    setParam({ ...params, LanguagesID: language })
    setParamEvent({ ...paramEvent, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  async function handleSubmit(formValues) {
    playerRegisterAgain
      .mutateAsync(formValues)
      .then((res) => {
        if (res) {
          enqueueSnackbar('Register successfully', {
            variant: 'success',
          })
          navigate(-1)
        }
      })
      .catch((error) => {
        console.error(error)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  return (
    <Box sx={{ py: { xs: 5, md: 12.5 } }}>
      <Container maxWidth="sm">
        <Box sx={{ width: 100, mb: 3, mx: 'auto' }}>
          <Box width="100%" component="img" src={logo} alt="logo" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            maxWidth: 350,
            width: '100%',
            mx: 'auto',

            backgroundImage: `url(${bg_title_white})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            aspectRatio: '313/119',
          }}
        >
          <Typography
            sx={{ m: 0 }}
            variant="h5"
            textAlign="center"
            mb={5}
            color="primary"
            fontWeight={600}
          >
            PLAYER REGISTER AGAIN
          </Typography>
        </Box>

        <Paper sx={{ p: 5 }}>
          <Box>
            <LayerRegisterAgainForm
              onSubmit={handleSubmit}
              eventList={
                eventList?.map((item) => ({
                  label: item.EventName,
                  value: item.EventID,
                })) || []
              }
              genreList={
                genreList?.map((item) => ({
                  label: item.GenresName,
                  value: item.GenresID,
                })) || []
              }
              profile={profile}
              onEventIDChange={(value) => setEventID(value)}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
