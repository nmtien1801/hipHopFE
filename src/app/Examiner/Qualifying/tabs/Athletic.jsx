import { Box, Stack, Typography } from '@mui/material'
import { useQualification } from 'hooks/Player/useQualification'
import { PlayerList } from '../components/PlayerList'
import { useUniQualification } from 'hooks/Player/useUniQualification'
import { useGenre } from 'hooks/Genres/useGenre'

export function Athletic({
  onAthleticClick,
  profile,
  eventId,
  genreId,
  lang,
  athletic,
}) {
  const { data: genres } = useGenre({
    genresID: genreId,
    LanguagesID: lang,
  })
  console.log('genres', genres)
  const {
    data: playerList,
    updatePointUniPlayer,
    isLoading,
  } = useUniQualification({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    statusID: 1,
    userID_Exammi: profile?.UserID,
  })

  const {
    data: playerRankingList,
    updatePointPlayer,
    isRankingLoading,
  } = useQualification({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    statusID: 1,
    userID_Exammi: profile?.UserID,
  })

  const handleUpdatePoint = (formValues) => {
    updatePointUniPlayer
      .mutateAsync(formValues)
      .then(() => {
        // console.log(`res`, res)
      })
      .catch((err) => {
        console.log(`err`, err)
      })
  }

  const handleRankingUpdatePoint = (formValues) => {
    updatePointPlayer
      .mutateAsync(formValues)
      .then(() => {
        // console.log(`res`, res)
      })
      .catch((err) => {
        console.log(`err`, err)
      })
  }
  return (
    <Stack flexGrow={1}>
      <Box sx={{ my: 0.5 }}>
        <Box
          sx={{
            display: 'inline-block',
            p: 1,

            bgcolor: 'black',
          }}
        >
          <Typography color="white">JUDGE NAME: {profile?.FullName}</Typography>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: 'inline-block',
            p: 1,
            my: 0.5,
            border: '2px solid',
            borderColor: 'grey.300',
            borderLeft: 0,
          }}
        >
          <Typography>{playerList?.length || 0} ATHLETIC</Typography>
        </Box>
      </Box>

      <Box sx={{ px: 1.5, py: 2 }}>
        {/* <PlayerList
          loading={isLoading}
          data={playerList}
          onSubmit={handleUpdatePoint}
          onClick={(data) => onAthleticClick?.(data)}
          athletic={athletic}
          judgeID={profile?.UserID}
        /> */}
        <PlayerList
          loading={genres?.IsUni === true ? isLoading : isRankingLoading}
          data={genres?.IsUni === true ? playerList : playerRankingList}
          onSubmit={
            genres?.IsUni === true
              ? handleUpdatePoint
              : handleRankingUpdatePoint
          }
          onClick={(data) => onAthleticClick?.(data)}
          athletic={athletic}
          judgeID={profile?.UserID}
        />
      </Box>
    </Stack>
  )
}
