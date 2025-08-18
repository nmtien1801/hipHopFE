import { Box, Button, Container, Paper, Stack } from '@mui/material'
import { SortBox } from 'components/FormFields/SortBox'
import { primaryLogo } from 'constants/common'
import { languageOptions } from 'constants/language'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { globalActions } from 'store/slice/globalSlice'

export function Welcome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const eventId =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'
  const genresId =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')

  const { data: eventList } = useEvents({
    page: 1,
    statusID: 1,

    LanguagesID: lang,
  })

  const { data: genreList } = useGenresByEvent({
    eventID: typeof eventId === 'number' ? eventId : parseInt(eventId),
    LanguagesID: lang,
  })

  return (
    <Box>
      <Container maxWidth="sm">
        <Stack height="100vh" justifyContent={'center'} alignItems={'center'}>
          <Paper
            sx={{
              p: 3,
              width: '100%',
            }}
          >
            <Box maxWidth={150} mx="auto" sx={{ mb: 3 }}>
              <Box width="100%" component="img" alt="logo" src={primaryLogo} />
            </Box>

            <Stack spacing={2}>
              <Box width="100%">
                <SortBox
                  defaultValue={
                    typeof eventId === 'number' ? eventId : parseInt(eventId)
                  }
                  optionList={
                    eventList?.map((item) => ({
                      label: item.EventName,
                      value: item.EventID,
                    })) || []
                  }
                  hideOptionAll
                  label={t('Event')}
                  onChange={(value) => {
                    dispatch(globalActions.setEventID(value))
                  }}
                />
              </Box>

              <Box width="100%">
                <SortBox
                  defaultValue={
                    typeof genresId === 'number' ? genresId : parseInt(genresId)
                  }
                  optionList={
                    genreList?.map((item) => ({
                      label: item.GenresName,
                      value: item.GenresID,
                    })) || []
                  }
                  hideOptionAll
                  label={t('Genre')}
                  onChange={(value) => {
                    console.log(value)
                    dispatch(globalActions.setGenresID(value))
                  }}
                />
              </Box>

              <Box width="100%">
                <SortBox
                  defaultValue={'vi-VN'}
                  optionList={languageOptions}
                  hideOptionAll
                  label={t('Language')}
                  onChange={(value) => {
                    console.log(value)
                    dispatch(globalActions.setLanguage(value))
                  }}
                />
              </Box>

              <Button
                onClick={() => navigate('/dashboard/screen/ranking')}
                variant="contained"
              >
                Go to Ranking
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  )
}
