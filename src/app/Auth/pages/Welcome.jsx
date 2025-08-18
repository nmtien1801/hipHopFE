import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import logo from 'assets/images/logo.png'
import { SortBox } from 'components/FormFields/SortBox'
import { useAuth } from 'hooks/Auth/auth'
import { useEventsByUser } from 'hooks/Events/useEventsByUser'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useGetGenresByUserId } from 'hooks/Genres/useGenresByUserId'
import { useSnackbar } from 'notistack'
import { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { globalActions } from 'store/slice/globalSlice'
import { getToken } from 'utils/hash'

export function Welcome() {
  const { t, i18n } = useTranslation()
  const token = getToken()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'
  const eventID =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const genreID =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')

  const { data: profile, isLoading, logout } = useAuth(token?.UserID)

  const { data: eventList } = useEventsByUser({
    userID: token?.UserID,
    LanguagesID: lang,
  })

  const { data: genreList } = useGenresByEvent({
    eventID: eventID,
    LanguagesID: lang,
  })

  const { data: genreByUserList } = useGetGenresByUserId({
    LanguagesID: lang,
    UserId: profile?.UserID,
    page: 1,
  })

  useEffect(() => {
    if (lang === 'vi-VN') {
      i18n.changeLanguage('vi')
      return
    }

    if (lang === 'en-US') {
      i18n.changeLanguage('en')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    if (genreID) {
      const genre = genreList?.find((item) => item.GenresID === genreID)
      dispatch(globalActions.setGenresName(genre?.GenresName))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreID])

  function handleLogout() {
    logout()
    navigate('/auth/login')
    enqueueSnackbar('Logout successfully!', { variant: 'success' })
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  if (isLoading) {
    return (
      <Typography color="white" sx={{ p: 1.5 }}>
        Loading...
      </Typography>
    )
  }
  console.log('genreID', genreID)
  return (
    <Box sx={{ py: { xs: 5, md: 12.5 } }}>
      <Container maxWidth="sm">
        <Box sx={{ width: 100, mb: 3, mx: 'auto' }}>
          <Box width="100%" component="img" src={logo} alt="logo" />
        </Box>

        <Paper sx={{ overflow: 'hidden' }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{
              p: 1,
              bgcolor: 'primary.main',
              color: 'white',
            }}
          >
            <Typography sx={{ m: 0 }} textAlign="center" fontWeight={600}>
              {t('welcome')}
            </Typography>
          </Stack>

          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ p: 5 }}
          >
            <Box
              component={Avatar}
              sx={{
                width: 200,
                height: 200,
                aspectRatio: '1/1',
                mx: 'auto',
                my: 5,
                border: '3px solid white',
                boxShadow: (theme) => theme.shadows[24],
              }}
              src={profile?.ImagesPaths}
              alt="avatar"
            />

            <QRCode
              value={`http://breakinghipop.gvbsoft.vn/#/home/profile/${profile?.UserID}`}
              size={100}
              viewBox={`0 0 100 100`}
            />

            <Box>
              <Typography variant="h6" textAlign="center" fontWeight={600}>
                {profile?.UserName}
              </Typography>

              <Typography variant="h6" textAlign="center" fontWeight={600}>
                ID: {profile?.UserID}
              </Typography>
            </Box>

            <Stack spacing={2} width="100%">
              {profile?.TypeUserID === 2 && (
                <Fragment>
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <Box width="100%">
                      <SortBox
                        optionList={
                          (Array.isArray(eventList) &&
                            eventList.length > 0 &&
                            eventList.map((item) => ({
                              label: item.EventName,
                              value: item.EventID,
                            }))) ||
                          []
                        }
                        hideOptionAll
                        label="Event*"
                        defaultValue={eventID}
                        onChange={(value) => {
                          dispatch(globalActions.setEventID(value))
                        }}
                      />
                    </Box>

                    {
                      <Box width="100%">
                        <SortBox
                          disabled={!eventID}
                          optionList={
                            (Array.isArray(genreByUserList) &&
                              genreByUserList.length > 0 &&
                              genreByUserList
                                .filter(
                                  (item) => item.EventID === Number(eventID),
                                )
                                .map((item) => ({
                                  label: genreList?.find(
                                    (genre) => item.GenresID === genre.GenresID,
                                  )?.GenresName,
                                  value: item.GenresID,
                                }))) ||
                            []
                          }
                          hideOptionAll
                          label="Genre*"
                          defaultValue={genreID}
                          onChange={(value) => {
                            dispatch(globalActions.setGenresID(value))
                          }}
                        />
                      </Box>
                    }
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                    width="100%"
                  >
                    <Button
                      fullWidth
                      component={Link}
                      variant="contained"
                      to="/examiners/qualifying"
                      disabled={!(eventID && genreID)}
                    >
                      {t('Qualifying')}
                    </Button>
                    <Button
                      fullWidth
                      component={Link}
                      variant="contained"
                      color="success"
                      to="/examiners/confrontation"
                      disabled={!(eventID && genreID)}
                    >
                      {t('Confrontation')}
                    </Button>
                    <Button
                      fullWidth
                      component={Link}
                      variant="outlined"
                      to="/home"
                    >
                      {t('go_to_home')}
                    </Button>
                  </Stack>
                </Fragment>
              )}
            </Stack>

            {(profile?.TypeUserID === 1 || profile?.TypeUserID === 6) && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                width="100%"
              >
                <Button
                  component={Link}
                  variant="contained"
                  to="/dashboard"
                  sx={{ flexGrow: 1 }}
                >
                  {t('dashboard')}
                </Button>

                <Button
                  component={Link}
                  variant="outlined"
                  to="/home"
                  sx={{ flexGrow: 1 }}
                >
                  {t('go_to_home')}
                </Button>
              </Stack>
            )}
            {profile?.TypeUserID === 4 && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                width="100%"
              >
                <Button
                  component={Link}
                  variant="contained"
                  to="/mc/welcome"
                  sx={{ flexGrow: 1 }}
                >
                  {t('dashboard')}
                </Button>

                <Button
                  component={Link}
                  variant="outlined"
                  to="/home"
                  sx={{ flexGrow: 1 }}
                >
                  {t('go_to_home')}
                </Button>
              </Stack>
            )}

            {profile?.TypeUserID === 3 && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                width="100%"
              >
                <Button
                  fullWidth
                  component={Link}
                  variant="contained"
                  to={`/profile/${profile.UserID}`}
                >
                  Profile
                </Button>
                <Button
                  fullWidth
                  component={Link}
                  variant="outlined"
                  to="/home"
                >
                  {t('go_to_home')}
                </Button>
              </Stack>
            )}

            <Typography textAlign="center">
              {t('not')} {profile?.UserName}?{' '}
              <Box
                component="strong"
                color="primary.main"
                onClick={handleLogout}
                sx={{ cursor: 'pointer' }}
              >
                {t('sign_out')}
              </Box>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
