import { Box, Container, Paper, Typography } from '@mui/material'
import bg_title_white from 'assets/images/bg-title-white.png'
import { useAuth } from 'hooks/Auth/auth'
import { useCountries } from 'hooks/common/useCountry'
import { usePhoneCode } from 'hooks/common/usePhoneCode'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LayerRegisterForm } from '../components/RegisterForm'
import { useEventByStatus } from 'hooks/Events/useEventByStatus'
import axiosClient from 'api/axiosClient'

export function LayerRegister() {
  const language = useSelector((state) => state.global.language)
  const [eventID, setEventID] = useState(null)
  const [params, setParam] = useState({
    page: 1,
    limit: 500,
    LanguagesID: language,
  })

  const [paramsActiveEvent, setParamsActiveEvent] = useState({
    LanguagesID: language,
    statusID: 1,
  })
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { data: countryList } = useCountries(params)
  const { data: phoneCodeList } = usePhoneCode(params)

  const { data: eventActiveList } = useEventByStatus(paramsActiveEvent)
  const { data: eventList } = useEvents(params)

  const { data: genreList } = useGenresByEvent({
    eventID: eventID,
    LanguagesID: language,
  })
  const { playerRegister } = useAuth()

  useEffect(() => {
    setParam({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])
  useEffect(() => {
    setParamsActiveEvent({ ...paramsActiveEvent, LanguagesID: language })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  async function handleSubmit(formValues) {
    playerRegister
      .mutateAsync(formValues)
      .then((res) => {
        if (res) {
          navigate('/auth/login')
          enqueueSnackbar('Register successfully', {
            variant: 'success',
          })
        }
      })
      .catch((error) => {
        console.error(error)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  console.log('eventActiveList', eventActiveList)
  return (
    <Box sx={{ py: { xs: 5, md: 12.5 } }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            maxWidth: 313,
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
            REGISTER
          </Typography>
        </Box>

        <Paper sx={{ p: 5 }}>
          <Box>
            <LayerRegisterForm
              onEventIDChange={(eventID) => setEventID(eventID)}
              onSubmit={handleSubmit}
              countryList={
                countryList?.map((item) => ({
                  CountryID: item.CountryID,
                  CountryName: item.CountryName,
                  Flag: item.Flag,
                })) || []
              }
              phoneCodeList={
                phoneCodeList
                  ?.map((item) => ({
                    PhoneNumber: item.PhoneNumber,
                    Flag: item.PhoneCode,
                  }))
                  ?.filter(
                    (value, index, self) =>
                      index ===
                      self.findIndex(
                        (t) => t.PhoneNumber === value.PhoneNumber,
                      ),
                  ) || []
              }
              eventList={
                eventActiveList?.map((item) => ({
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
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
