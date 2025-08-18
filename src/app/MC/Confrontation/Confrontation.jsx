import { Box, Container, Stack } from '@mui/material'
import bg from 'assets/images/main-background.jpg'
import { useAuth } from 'hooks/Auth/auth'
import { usePlayerCouples } from 'hooks/useCouplePlayers'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getToken } from 'utils/hash'
import { Couple } from './tabs/Couple'
import { couplePlayApi } from 'api/couplePlayApi'
import { useGenre } from 'hooks/Genres/useGenre'
import { UniConfrontation } from './tabs/UniConfrontation'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'

export const Confrontation = () => {
  const [total, setTotal] = useState(0)
  const token = getToken()
  const [athletic, setAthletic] = useState(null)

  const eventID =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const genresID =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')
  const LanguagesID =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language')

  const [selectedCouple, setSelectedCouple] = useState(null)
  const [params, setParams] = useState({
    eventID,
    genresID,
    LanguagesID,
    numberRound: 1,
  })
  const { data: genres } = useGenre({
    genresID: genresID,
    LanguagesID: LanguagesID,
  })
  const { data: dataUniRound2 } = useUniRankingResult({
    eventID: eventID,
    genresID: genresID,
    LanguagesID: LanguagesID,
    isChose: 1,
    page: 1,
    limit: 20,
  })

  console.log('dataUniRound2', dataUniRound2)

  console.log('genres', genres)
  const fetchMatch = useCallback(async (selectedGenreId, id) => {
    try {
      const { totals } = await couplePlayApi.getAllPlayerCouple({
        EventID: id,
        GenresID: selectedGenreId,
        NumberRound: 1,
      })
      setTotal(totals)
    } catch (error) {
      console.log(`${error}`)
    }
  }, [])

  useEffect(() => {
    if (eventID && genresID) {
      fetchMatch(genresID, eventID)
    }
  }, [eventID, genresID, fetchMatch])

  const { data: profile } = useAuth(token.UserID)
  const { data: playerCoupleList } = usePlayerCouples(params)
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md" px={0}>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ minHeight: '100vh' }}
        >
          {genres?.IsUni === false ? (
            <Couple
              profile={profile}
              selectedCouple={selectedCouple}
              playerCoupleList={playerCoupleList}
              onSelectCouple={(couple) => setSelectedCouple(couple)}
              total={total}
              numberRound={params.numberRound}
              onChangeRound={(value) =>
                setParams({
                  ...params,
                  numberRound: value,
                })
              }
            />
          ) : (
            <UniConfrontation
              onAthleticClick={(data) => setAthletic(data)}
              profile={profile}
              genreId={
                typeof genreId === 'string' ? parseInt(genresID) : genresID
              }
              eventId={
                typeof eventId === 'string' ? parseInt(eventID) : eventID
              }
              lang={LanguagesID}
              athletic={athletic}
            />
            
          )}
        </Stack>
      </Container>
    </Box>
  )
}
