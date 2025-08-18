import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material'
import { SortBox } from 'components/FormFields/SortBox'
import { primaryLogo } from 'constants/common'
import { languageOptions } from 'constants/language'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { debounce, trimEnd } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { globalActions } from 'store/slice/globalSlice'

export function Welcome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const time = useSelector((state) => state.global.time)

  const { data: eventList } = useEvents({
    page: 1,
    limit: 20,
    LanguagesID: lang,
    StatusID: 1,
  })

  const { data: genreList } = useGenresByEvent({
    eventID: typeof eventId === 'number' ? eventId : parseInt(eventId),
    LanguagesID: lang,
  })

  const handleTimeChange = debounce((e) => {
    const value = e.target.value
    dispatch(globalActions.setTime(value))
  }, 100)

  console.log('eventList', eventList)
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
                  label="Event"
                  onChange={(value) => {
                    console.log('value: ', value)
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
                  label="Genre"
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
                  label="Genre"
                  onChange={(value) => {
                    console.log(value)
                    dispatch(globalActions.setLanguage(value))
                  }}
                />
              </Box>
              <Box width="100%">
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  label="Time (seconds)"
                  variant="outlined"
                  defaultValue={time}
                  onChange={handleTimeChange}
                />
              </Box>

              <Button
                onClick={() => navigate('/screen/ranking')}
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
