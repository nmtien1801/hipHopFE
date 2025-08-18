import { Box, Stack, Typography } from '@mui/material'
import { usePlayerByRegistergenreID } from 'hooks/Player/usePlayerByRegistergenre'
import { useRanking } from 'hooks/Player/useRanking'
import { useSelector } from 'react-redux'

export function UniScoringForm({ data, isSelected }) {
  const eventId =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const genreId =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language')

  const { data: test } = useRanking({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
  })

  const registerIDs = data.lstUni.map((item) => item.RegisterPlayGenresID)

  // Lọc danh sách item có registerID nằm trong registerIDs
  const filteredItems = data.lstUni.filter((item) =>
    registerIDs.includes(item.RegisterPlayGenresID),
  )
  console.log('testssss', test)
  console.log('filteredItems11111', filteredItems)

  const filteredRegisterPlayGenresIDs = filteredItems?.map(
    (item) => item.RegisterPlayGenresID,
  )

  const matchedItems = test?.filter((item) =>
    filteredRegisterPlayGenresIDs.includes(item.RegisterPlayGenresID),
  )

  console.log('matchedItems', matchedItems)

  return (
    Array.isArray(matchedItems) &&
    matchedItems.length > 0 &&
    matchedItems.map((item, idx) => (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        noValidate
        sx={{ py: 1 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          boxShadow={1}
          sx={{
            flexGrow: 1,
            height: 90,
            borderRadius: '4px',

            bgcolor:
              isSelected || data?.StatusPoint === 1 ? '#001119' : '#004a6d',
            color: 'white',
            cursor: 'pointer',

            '&:hover': {
              bgcolor: '#001119',
              boxShadow: (theme) => theme.shadows[10],
            },
          }}
        >
          <Stack direction="row" alignItems="center" width="100%">
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                p: 1,
                height: 90,
                borderRadius: '4px 0 0 4px',
                bgcolor: '#0076ab',
                mr: 2,
              }}
            >
              <Typography>{idx + 1}</Typography>
            </Stack>

            <Box
              component="img"
              sx={{
                width: 40,
                aspectRatio: '26/20',
                mr: 2,
              }}
              src={`https://flagpedia.net/data/flags/w702/${item.Flag.toLowerCase()}.webp`}
              alt="vn"
            />

            <Box flexGrow={1}>
              <Typography textTransform="uppercase" fontWeight={600}>
                {item?.FullName}{' '}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    ))
  )
}
