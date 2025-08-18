import { Close } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { couplePlayApi } from 'api/couplePlayApi'
import { Tabs } from 'components/Common/Tabs'
import { useEvent } from 'hooks/Events/useEvent'
import { useExaminersByEvent } from 'hooks/Events/useExaminersByEvent'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useMutationEvent } from 'hooks/Events/useMutationEvent'
import { useGenres } from 'hooks/Genres/useGenres'
import { useGetQualifyingList, useMatches } from 'hooks/Match/useMatches'
import { useMutationMatch } from 'hooks/Match/useMutationMatch'
import { useUsers } from 'hooks/User/useUsers'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { mapCoupleCount } from 'utils/mapping'
import { AddCoupleForm } from '../components/AddCoupleForm'
import { AddEditEventForm } from '../components/AddEditEventForm'
import { AddExaminerForm } from '../components/AddExaminerForm'
import { AddGenreForm } from '../components/AddGenreForm'
import { AddRoundForm } from '../components/AddRoundForm'
import { CoupleFilter } from '../components/CoupleFilter'
import { CoupleList } from '../components/CoupleList'
import { SelectPairsManually } from '../components/SelectPairsManually'
import { AddGenreToJudge } from '../components/AddGenreToJudge'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'
import { UniCriteriaList } from '../components/UniCriteriaList'
import { AddEditCriteriaForm } from '../components/AddEditCriteriaForm'
import { CriteriaFilter } from '../components/CriteriaFilter'
import { useMutationCriteria } from 'hooks/Criteria/useMutationCriteria'
import { useAuth } from 'hooks/Auth/auth'
import { useGenre } from 'hooks/Genres/useGenre'
import { AddUniRound2Form } from '../components/AddUniRound2Form'
import { useMutationUni } from 'hooks/Uni/useMutationUni'
import { globalActions } from 'store/slice/globalSlice'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'
import { useQueryClient } from '@tanstack/react-query'

export function EventDetail() {
  const { id } = useParams()
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'

  const dispatch = useDispatch()

  const [total, setTotal] = useState(0)
  const [selectedJudge, setSelectedJudge] = useState(null)

  const [selectedAddRoundId, setSelectedAddRoundId] = useState(null)
  const [selectedEndRoundId, setSelectedEndRoundId] = useState(null)
  const [selectedGenreId, setSelectedGenreId] = useState(null)
  const [selectedCriteria, setSeletedCriteria] = useState(null)
  const [showCriteria, setShowCriteria] = useState(false)
  const [numberOfTop, setNumberOfTop] = useState(8)
  const [matchesParams, setMatchesParams] = useState({
    EventID: id,
    NumberRound: 1,
    page: 1,
    limit: 8,
  })

  const [params, setParams] = useState({
    eventID: id,
    LanguagesID: lang,
  })

  const token = getToken()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (selectedGenreId) {
      setMatchesParams({
        ...matchesParams,
        GenresID: selectedGenreId,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenreId])

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
    if (!selectedGenreId || !id) return
    fetchMatch(selectedGenreId, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMatch, selectedGenreId, id])
  const { data: uniCriteriaList } = useCriteriaList({
    eventID: id,
    genresID: selectedGenreId,
  })
  // get examiner
  const { data: examinerList } = useUsers({
    page: 1,
    typeUserID: 2,
    statusID: 1,
    limit: 100000,
  })
  const { data: profile } = useAuth(token.UserID)
  // get genres
  const { data: genreList } = useGenres({
    page: 1,
    LanguagesID: lang,
    limit: 500,
  })
  // get all matches
  const { data: matchList, isLoading: isMatchesLoading } =
    useMatches(matchesParams)

  // create round, start new match and create top ranking
  const {
    createRound,
    createTopRanking,
    addMoreRound,
    endRound,
    selectPairsManually,
  } = useMutationMatch()

  // get event detail
  const { data: event, loading } = useEvent(params)

  // add edit event
  const { addEvent, editEvent } = useMutationEvent()
  const { addNumberTeamUni } = useMutationUni()
  const { addCriteria, editCriteria, removeCriteria } = useMutationCriteria()
  //  get genre list by event
  const { data: genreListByEvent, insertGenresToEvent } = useGenresByEvent({
    eventID: id,
    LanguagesID: lang,
  })

  // get examiner list by event
  const {
    data: examinerListByEvent,
    insertExaminersToEvent,
    insertGenreToExaminer,
  } = useExaminersByEvent({
    eventID: id,
  })

  // get Qualifying list
  const { data: qualifyingList } = useGetQualifyingList({
    EventID: Number(id),
    GenresID: Number(selectedGenreId),
    NumberTeam: numberOfTop,
    languageID: lang,
  })

  const { data: genreItem } = useGenre({
    genresID: selectedGenreId,
    LanguagesID: lang,
  })

  const { data: dataUni } = useUniRankingResult({
    eventID: id,
    genresID: selectedGenreId,
    LanguagesID: lang,
    page: 1,
    limit: 10,
  })

  // add edit event
  function handleFormSubmit(formValues) {
    if (id && id !== 'create') {
      editEvent
        .mutateAsync({
          ...formValues,
          data: {
            ...formValues.data,
            EventID: id,
          },
        })
        .then(() => {
          enqueueSnackbar('Update successfully', {
            variant: 'success',
          })
        })
        .catch((error) => {
          console.log('error: ', `${error}`)
          enqueueSnackbar(`${error}`, { variant: 'error' })
        })

      return
    }

    addEvent
      .mutateAsync({
        ...formValues,
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Create successfully', {
            variant: 'success',
          })
          navigate(`/dashboard/events/${res.EventID}`)
          window.location.reload()
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  const handleCreateCriteria = () => {
    setSeletedCriteria(null)
    setShowCriteria(true)
  }
  const handleEditCriteria = (item) => {
    setSeletedCriteria(item)
    setShowCriteria(true)
  }

  function handleFormUniRound2Submit(formValues) {
    formValues.auth = {
      UserID: profile?.UserID,
      UUSerID: profile?.UserName,
    }

    addNumberTeamUni
      .mutateAsync({
        auth: {
          UserID: token.UserID,
          UUSerID: token.UserName,
        },
        data: {
          ...formValues.data,
          EventID: Number(id),
          GenresID: selectedGenreId,
        },
      })
      .then((res) => {
        enqueueSnackbar('Add more round success', {
          variant: 'success',
        })
        dispatch(globalActions.setRounduni(1))
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  function handleFormCriteriaSubmit(formValues) {
    formValues.auth = {
      UserID: profile?.UserID,
      UUSerID: profile?.UserName,
    }

    if (selectedCriteria && selectedCriteria.CritID) {
      editCriteria
        .mutateAsync({
          ...formValues,
          data: {
            ...formValues.data,
            CritID: selectedCriteria.CritID,
          },
        })
        .then(() => {
          enqueueSnackbar('Update successfully', { variant: 'success' })
          queryClient.invalidateQueries(['criteriaList', id, selectedGenreId])

          setShowCriteria(false)
        })
        .catch((error) => {
          console.error(error)
          enqueueSnackbar(`${error}`, { variant: 'error' })
        })
    } else {
      addCriteria
        .mutateAsync({
          ...formValues,
          data: {
            ...formValues.data,
            EventID: id,
            GenresID: selectedGenreId,
          },
        })
        .then((res) => {
          if (res) {
            enqueueSnackbar('Create successfully', { variant: 'success' })
            queryClient.invalidateQueries(['criteriaList', id, selectedGenreId])
            setShowCriteria(false)
          }
        })
        .catch((error) => {
          console.error(error)
          enqueueSnackbar(`${error}`, { variant: 'error' })
        })
    }
  }
  function handleRemoveCriteria(critID) {
    removeCriteria
      .mutateAsync({
        CritID: critID,
      })
      .then(() => {
        enqueueSnackbar('Removed successfully', { variant: 'success' })
        queryClient.invalidateQueries(['criteriaList', id, selectedGenreId])
      })
      .catch((error) => {
        console.error(error)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }
  // insert genre to event
  function handleInsertGenresToEvent(formValues) {
    insertGenresToEvent
      .mutateAsync(formValues)
      .then(() => {
        enqueueSnackbar('Update successfully', { variant: 'success' })
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  // insert examiner to event
  function handleInsertExaminersToEvent(formValues) {
    insertExaminersToEvent
      .mutateAsync(formValues)
      .then(() => {
        enqueueSnackbar('Update successfully', { variant: 'success' })
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  // insert genre to examiner
  function handleInsertGenreToExaminer(formValues) {
    insertGenreToExaminer
      .mutateAsync(formValues)
      .then(() => {
        enqueueSnackbar('Update successfully', { variant: 'success' })
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  // create top ranking
  function handleCreateTopRanking(formValues) {
    createTopRanking
      .mutateAsync({ ...formValues, LanguagesID: lang })
      .then((res) => {
        enqueueSnackbar('Add number of matches successfully', {
          variant: 'success',
        })
        fetchMatch(selectedGenreId, id)
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
        console.log('error: ', `${error}`)
      })
  }

  // add round
  function handleAddRound(formValues) {
    createRound
      .mutateAsync({ ...formValues, LanguagesID: lang })
      .then((res) => {
        enqueueSnackbar('Add number of round successfully', {
          variant: 'success',
        })
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
        console.log('error: ', `${error}`)
      })
  }

  function handleAddMorRound() {
    addMoreRound
      .mutateAsync({
        auth: {
          UserID: token.UserID,
          UUSerID: token.UserName,
        },
        data: {
          EventID: parseInt(id),
          CoupleID: selectedAddRoundId,
        },
      })
      .then((res) => {
        enqueueSnackbar('Add more round success', {
          variant: 'success',
        })
        setSelectedAddRoundId(null)
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  // end a couple play
  function handleEndRound() {
    endRound
      .mutateAsync({
        auth: {
          UserID: token.UserID,
          UUSerID: token.UserName,
        },
        data: {
          CoupleID: selectedEndRoundId,
          EventID: params.EventID,
        },
      })
      .then((res) => {
        enqueueSnackbar('End play round success', {
          variant: 'success',
        })
        setSelectedEndRoundId(null)
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  function handleSelectPairsManually(first, last) {
    selectPairsManually
      .mutateAsync({
        auth: {
          UserID: token?.UserID,
          UUSerID: token?.UserName,
        },
        data: {
          registerPlayGenresID1: first,
          registerPlayGenresID2: last,
          NumberRound: 1,
          EventID: Number(id),
          GenresID: selectedGenreId,
          NumberTeam: numberOfTop,
        },
        lang,
      })
      .then(() => {
        fetchMatch(selectedGenreId, id)
        enqueueSnackbar('Select Pairs Manually successfully', {
          variant: 'success',
        })
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: 'error' })
        console.log('error: ', `${error}`)
      })
  }

  // main list
  const tabList = [
    {
      label: t('Detail'),
      children: (
        <Box>
          <AddEditEventForm
            isEdit={id && id !== 'create'}
            data={event}
            onSubmit={handleFormSubmit}
            onLanguagechange={(lang) =>
              setParams({
                ...params,
                LanguagesID: lang,
              })
            }
          />
        </Box>
      ),
    },
    {
      label: t('Add Genre'),
      disabled: !event,
      children: (
        <Box>
          <AddGenreForm
            EventID={parseInt(id)}
            genreList={genreList || []}
            data={genreListByEvent || []}
            onSubmit={handleInsertGenresToEvent}
            onSettingClick={(id) => setSelectedGenreId(id)}
          />
        </Box>
      ),
    },
    {
      label: t('Add Examiner'),
      disabled: !event,
      children: (
        <Box>
          <AddExaminerForm
            EventID={parseInt(id)}
            examinerList={examinerList || []}
            data={examinerListByEvent || []}
            onSubmit={handleInsertExaminersToEvent}
            onSettingClick={(id) => setSelectedJudge(id)}
          />
        </Box>
      ),
    },
  ]

  const createTopList = [
    {
      label: 'Tạo tự  động',
      children: (
        <Box py={3}>
          {' '}
          <AddCoupleForm
            EventID={parseInt(id)}
            genreList={genreListByEvent}
            lang={lang}
            total={total}
            onSubmit={handleCreateTopRanking}
            GenresID={selectedGenreId}
            onCancel={() => setSelectedGenreId(null)}
            disabled={qualifyingList?.some((item) => item.IsChose === 1)}
          />
        </Box>
      ),
    },
    {
      label: 'Tạo thủ công',
      children: (
        <Box py={3}>
          <SelectPairsManually
            num={numberOfTop}
            onFilterChange={(num) => setNumberOfTop(num)}
            pairOfPlayerList={qualifyingList}
            onConfirm={(first, last) => handleSelectPairsManually(first, last)}
            data={matchList || []}
            loading={isMatchesLoading}
            params={matchesParams}
            onAddRound={(id) => setSelectedAddRoundId(id)}
            onEndPlayRound={(id) => setSelectedEndRoundId(id)}
            onFilterMatchChange={(newPrams) => setMatchesParams(newPrams)}
          />
        </Box>
      ),
    },
  ]

  console.log('genreItem', genreItem)
  console.log('uniCriteriaList', uniCriteriaList)

  const settingList = [
    genreItem?.IsUni === true && {
      label: t('Create Criteria'),
      children: (
        <Box sx={{ p: 3 }}>
          <CriteriaFilter onCreate={handleCreateCriteria} dataUni={dataUni} />
          <UniCriteriaList
            data={uniCriteriaList?.data || []}
            params={matchesParams}
            onEdit={handleEditCriteria}
            onRemove={handleRemoveCriteria}
          />
        </Box>
      ),
    },
    genreItem?.IsUni === true && {
      label: t('Create Uni Round 2'),
      children: (
        <Box sx={{ p: 3 }}>
          <AddUniRound2Form onSubmit={handleFormUniRound2Submit} />
        </Box>
      ),
    },
    genreItem?.IsUni === false && {
      label: t('couple_list'),
      children: (
        <Box sx={{ p: 3 }}>
          <CoupleFilter
            total={total}
            params={matchesParams}
            onFilterChange={(newPrams) => setMatchesParams(newPrams)}
          />
          <CoupleList
            data={matchList || []}
            loading={isMatchesLoading}
            params={matchesParams}
            onAddRound={(id) => setSelectedAddRoundId(id)}
            onEndPlayRound={(id) => setSelectedEndRoundId(id)}
            onFilterChange={(newPrams) => setMatchesParams(newPrams)}
          />
        </Box>
      ),
    },
    genreItem?.IsUni === false && {
      label: t('create_top_ranking'),
      disabled: !event || total === numberOfTop,
      children: <Tabs tabList={createTopList} elevation={0} />,
    },
    genreItem?.IsUni === false && {
      label: t('create_number_of_round'),
      disabled: !event || (total !== 4 && total !== 8 && total !== 16),
      children: (
        <Box sx={{ p: 3 }}>
          <AddRoundForm
            EventID={parseInt(id)}
            lang={lang}
            onSubmit={handleAddRound}
            GenresID={selectedGenreId}
            onCancel={() => setSelectedGenreId(null)}
            confrontationOptionList={
              mapCoupleCount(total).length > 0
                ? mapCoupleCount(total)
                    .map((item, idx) => ({
                      label: `Top ${item * 4}`,
                      value: idx + 1,
                    }))
                    .concat([
                      {
                        label: `${t('final')}`,
                        value: mapCoupleCount(total).length + 1,
                      },
                    ])
                : []
            }
          />
        </Box>
      ),
    },
  ].filter(Boolean)

  if (loading) {
    return (
      <Container>
        <Typography>Loading ...</Typography>
      </Container>
    )
  }
  console.log('confrontationOptionList', mapCoupleCount(total).length)
  console.log('params', params)
  console.log('testing', params.LanguagesID)
  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Box>
              <Typography
                variant="h5"
                textTransform={'uppercase'}
                fontWeight={700}
              >
                {t('event')}
              </Typography>

              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/#/dashboard">
                  Dashboard
                </Link>

                <Link
                  underline="hover"
                  color="inherit"
                  href="/#/dashboard/events"
                >
                  Event
                </Link>

                <Typography color="text.primary">Detail</Typography>
              </Breadcrumbs>
            </Box>
          </Stack>

          <Stack flexGrow={1}>
            <Tabs tabList={tabList} />
          </Stack>
        </Stack>
      </Container>

      <Dialog fullWidth maxWidth="lg" open={!!Boolean(selectedGenreId)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6">Setting</Typography>

            <IconButton onClick={() => setSelectedGenreId(null)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />

        <DialogContent>
          <Stack>
            <Tabs tabList={settingList} elevation={0} />
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog fullWidth maxWidth="lg" open={!!Boolean(selectedJudge)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6">Add genres to Judge</Typography>

            <IconButton onClick={() => setSelectedJudge(null)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />

        <DialogContent>
          {selectedJudge && (
            <Stack>
              <AddGenreToJudge
                EventID={parseInt(id)}
                genreList={genreListByEvent || []}
                data={selectedJudge.lstGenresID}
                judgeId={selectedJudge.UserID}
                onSubmit={handleInsertGenreToExaminer}
              />
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      <Dialog fullWidth maxWidth="lg" open={!!Boolean(showCriteria)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6">
              {selectedCriteria ? t('Edit Criteria') : t('Add Criteria')}
            </Typography>

            <IconButton onClick={() => setShowCriteria(false)}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />

        <DialogContent>
          <Stack>
            <AddEditCriteriaForm
              data={selectedCriteria}
              onSubmit={handleFormCriteriaSubmit}
            />
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedAddRoundId}
        onClose={() => setSelectedAddRoundId(null)}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={600}>Confirm Add Round</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          Are you sure to add one round for this couple ?
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleAddMorRound}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={() => setSelectedAddRoundId(null)}
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!selectedEndRoundId}
        onClose={() => setSelectedEndRoundId(null)}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={600}>Confirm End Play Round</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          Are you sure to end play round for this couple ?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleEndRound}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={() => setSelectedEndRoundId(null)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
