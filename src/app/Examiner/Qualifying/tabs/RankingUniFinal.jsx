import { Box, Stack, Typography } from '@mui/material'
import { useRanking } from 'hooks/Player/useRanking'
import { RankingList } from '../components/RankingList'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'
import { UniRankingList } from '../components/UniRankingList'

export function RankingUniFinal({ profile, genreId, eventId, lang, dataUni }) {
  const { data: lstUni } = useRanking({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
  })

  const filteredData = Array.isArray(lstUni)
    ? lstUni.filter((item) => item.IsChose === 1)
    : []

  console.log('data', lstUni)
  console.log('dataUni', dataUni)
  console.log('filteredDatafilteredData', filteredData)

  return (
    <Box>
      <Stack justifyContent="center" alignItems="center" spacing={0.5} py={0.5}>
        <Box
          sx={{
            display: 'inline-block',
            p: 1,

            bgcolor: 'black',
          }}
        >
          <Typography color="white">JUDGE NAME: {profile?.FullName}</Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: 'inline-block',
              p: 1,
              my: 0.5,
              border: '2px solid',
              borderColor: 'grey.300',
            }}
          >
            <Typography>RANKING</Typography>
          </Box>
        </Box>

        <Box width="100%" sx={{ px: 3 }}>
          <UniRankingList data={dataUni || []} lstUniData={lstUni} />
        </Box>
      </Stack>
    </Box>
  )
}
