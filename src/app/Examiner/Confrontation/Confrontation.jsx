import { Box, Container, Stack } from '@mui/material'
import { couplePlayApi } from 'api/couplePlayApi'
import bg from 'assets/images/main-background.jpg'
import { useAuth } from 'hooks/Auth/auth'
import { useGenre } from 'hooks/Genres/useGenre'
import { usePlayerCouples } from 'hooks/useCouplePlayers'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getToken } from 'utils/hash'
import { Couple } from './tabs/Couple'
import { Round } from './tabs/Round'
import { useUniQualification } from 'hooks/Player/useUniQualification'
import { UniConfrontation } from '../Qualifying/UniConfrontation'
export const Confrontation = () => {
  const [total, setTotal] = useState(0)
  const token = getToken()

  const eventID =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const genresID =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')
  const LanguagesID =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language')

  const [tabs, setTabs] = useState(
    localStorage.getItem('confrontation-tab') || 'couple',
  )
  const [selectedCouple, setSelectedCouple] = useState(
    JSON.parse(localStorage.getItem('couple')) || null,
  )
  const [params, setParams] = useState({
    eventID,
    genresID,
    LanguagesID,
    numberRound: 1,
  })

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

  const { data: profile } = useAuth(token?.UserID)
  const { data: playerCoupleList } = usePlayerCouples(params)
  const { data: genre } = useGenre({
    genresID: genresID,
    LanguagesID: LanguagesID,
  })
  const {
    data: playerList,
    updatePointUniPlayer,
    isLoading,
  } = useUniQualification({
    eventID: eventID,
    genresID: genresID,
    LanguagesID: LanguagesID,
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
  return genre?.IsUni === false ? (
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
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100vh' }}
        >
          {tabs === 'couple' && (
            <Couple
              profile={profile}
              selectedCouple={selectedCouple}
              playerCoupleList={playerCoupleList}
              onSelectCouple={(couple) => {
                setSelectedCouple(couple)
              }}
              onGoToRound={() => {
                setTabs('round')
                localStorage.setItem('confrontation-tab', 'round')
              }}
              total={total}
              numberRound={params.numberRound}
              onChangeRound={(value) =>
                setParams({
                  ...params,
                  numberRound: value,
                })
              }
            />
          )}

          {tabs === 'round' && selectedCouple && (
            <Round
              couple={selectedCouple}
              playerCoupleList={playerCoupleList}
              onChooseCouple={() => {
                setTabs('couple')
                localStorage.setItem('confrontation-tab', 'couple')
                setSelectedCouple(null)
              }}
              EventID={parseInt(eventID)}
              genre={genre}
              setTabs={setTabs}
            />
          )}
        </Stack>
      </Container>
    </Box>
  ) : (
    <UniConfrontation />
  )
}
