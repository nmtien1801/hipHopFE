import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
    Stack,
    Typography,
} from '@mui/material'
import { Loading } from 'components/Common/Loading'
import { useMatches } from 'hooks/Match/useMatches'
import { useMutationMatch } from 'hooks/Match/useMutationMatch'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getToken } from 'utils/hash'
import { CoupleFilter } from '../components/CoupleFilter'
import { CoupleList } from '../components/CoupleList'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'

export function CouplePage() {
    const language = useSelector((state) => state.global.language)
    const [selectedAddRoundId, setSelectedAddRoundId] = useState(null)
    const [selectedEndRoundId, setSelectedEndRoundId] = useState(null)

    const [params, setParams] = useState({
        page: 1,
        limit: 4,
        LanguagesID: language,
    })

    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const token = getToken()

    const { data: eventList } = useEvents({
        page: 1,
        LanguagesID: language,
        GenresID: params.GenresID,
        EventID: params.EventID,
        NumberRound: 1,
    })
    const { data: genreList } = useGenresByEvent({
        page: 1,
        eventID: params.EventID,
        LanguagesID: language,
    })

    const { data, isLoading, total } = useMatches(params)
    const { addMoreRound, endRound } = useMutationMatch()

    useEffect(() => {
        setParams({ ...params, LanguagesID: language })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    function handleFilterChange(newParams) {
        setParams(newParams)
    }

    function handleAddRound() {
        addMoreRound
            .mutateAsync({
                auth: {
                    UserID: token.UserID,
                    UUSerID: token.UserName,
                },
                data: {
                    EventID: params.EventID,
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

    return (
        <Box sx={{ height: '100%' }}>
            <Container sx={{ height: '100%' }}>
                <Stack spacing={3} sx={{ height: '100%' }}>
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
                                {t('Couple')}
                            </Typography>

                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/#/dashboard"
                                >
                                    Dashboard
                                </Link>

                                <Typography color="text.primary">
                                    Couple
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Stack>

                    <Stack spacing={3} flexGrow={1}>
                        <Box>
                            <CoupleFilter
                                params={params}
                                onFilterChange={handleFilterChange}
                                eventOptionList={
                                    eventList?.map((item) => ({
                                        label: item.EventName,
                                        value: item.EventID.toString(),
                                    })) || []
                                }
                                genreOptionList={
                                    genreList?.map((item) => ({
                                        label: item.GenresName,
                                        value: item.GenresID.toString(),
                                    })) || []
                                }
                                EventID={params.EventID}
                            />
                        </Box>

                        {isLoading ? (
                            <Loading />
                        ) : (
                            <Box sx={{ flexGrow: 1 }}>
                                <CoupleList
                                    data={data}
                                    loading={isLoading}
                                    onFilterChange={handleFilterChange}
                                    params={params}
                                    total={total}
                                    onAddRound={(id) =>
                                        setSelectedAddRoundId(id)
                                    }
                                    onEndPlayRound={(id) =>
                                        setSelectedEndRoundId(id)
                                    }
                                />
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Container>

            <Dialog
                open={!!selectedAddRoundId}
                onClose={() => setSelectedAddRoundId(null)}
            >
                <DialogTitle>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <WarningAmberIcon color="warning" />
                        <Typography fontWeight={600}>
                            Confirm Add Round
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers>
                    Are you sure to add one round for this couple ?
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={handleAddRound}>
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
                        <WarningAmberIcon color="warning" />
                        <Typography fontWeight={600}>
                            Confirm End Play Round
                        </Typography>
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
