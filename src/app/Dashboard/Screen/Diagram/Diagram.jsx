import { Box, Button, Dialog, DialogContent, Stack } from '@mui/material'
import { Loading } from 'components/Common/Loading'
import { usePlayerCouples } from 'hooks/useCouplePlayers'
import { useSelector } from 'react-redux'
import { mapCoupleCount } from 'utils/mapping'
import { DiagramEndGroup } from './components/DiagramEndGroup'
import { DiagramInfo } from './components/DiagramInfo'
import { DiagramStartGroup } from './components/DiagramStartGroup'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Navigate, useNavigate } from 'react-router-dom'
import { useGenre } from 'hooks/Genres/useGenre'
import { AddRoundForm } from './components/AddRoundForm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutationMatch } from 'hooks/Match/useMutationMatch'
import { useSnackbar } from 'notistack'
import AddIcon from '@mui/icons-material/Add'
import { ExportToExcel } from 'components/Common/ExportToExcel'

export function Diagram() {
    const [showAddRound, setShowAddRound] = useState(false)
    const { t } = useTranslation('screen')
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const EventID =
        useSelector((state) => state.global.E) ||
        localStorage.getItem('eventId')
    const GenresID =
        useSelector((state) => state.global.genresId) ||
        localStorage.getItem('genresId')

    const language =
        useSelector((state) => state.global.language) ||
        localStorage.getItem('language') ||
        'vi-VN'

    const { data: genres } = useGenre({
        genresID: GenresID,
        LanguagesID: language,
    })

    const { data: playerCoupleList, isLoading } = usePlayerCouples({
        EventID,
        GenresID,
    })

    const exportData = playerCoupleList?.map((item) => ({
        STT: item.CoupleNumber,
        ID: item.CoupleID,
        Vòng: item.NumberRound,
        'Người chơi 1': item.NamePlayer1,
        'Người chơi 2': item.NamePlayer2,
        'Người chiến thắng':
            item.IsWin === 1
                ? item.NamePlayer1
                : item.IsWin === 2
                ? item.NamePlayer2
                : 'unknown',
    }))

    const { createRound } = useMutationMatch()

    const firstDiagramLengthList =
        !isLoading &&
        mapCoupleCount(
            playerCoupleList.filter((item) => item.NumberRound === 1)?.length,
        )

    const lastDiagramLengthList =
        !isLoading &&
        mapCoupleCount(
            playerCoupleList.filter((item) => item.NumberRound === 1)?.length,
        ).map((item, idx, arr) => arr[arr.length - idx - 1])

    const finalData =
        playerCoupleList?.filter(
            (item) => item.NumberRound === firstDiagramLengthList?.length + 1,
        )?.[0] || null

    function handleAddRound(formValues) {
        createRound
            .mutateAsync({ ...formValues, LanguagesID: language })
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

    if (!EventID || !GenresID || playerCoupleList?.length === 0) {
        return <Navigate to="/dashboard/screen/welcome" replace />
    }

    return isLoading || playerCoupleList?.length === 0 ? (
        <Loading />
    ) : (
        <Box
            bgcolor="black"
            sx={{
                aspectRatio: '16/10',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={7}
                py={3}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{
                        flexGrow: 1,
                        height: `${100 - 100 / firstDiagramLengthList[0]}%`,
                    }}
                >
                    <DiagramStartGroup
                        diagramLengthList={firstDiagramLengthList || []}
                        playerCoupleList={playerCoupleList}
                    />
                </Stack>

                <Box sx={{ width: '19%' }}>
                    <DiagramInfo data={finalData} genres={genres} />
                </Box>

                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{
                        flexGrow: 1,
                        height: `${100 - 100 / firstDiagramLengthList[0]}%`,
                    }}
                >
                    <DiagramEndGroup
                        diagramLengthList={lastDiagramLengthList || []}
                        playerCoupleList={playerCoupleList || []}
                    />
                </Stack>
            </Stack>

            <Stack
                direction="row"
                alignContent="center"
                spacing={2}
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    p: 3,
                    color: 'white',
                }}
            >
                <Box flexGrow={1}>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/dashboard/screen/ranking')}
                        startIcon={
                            <DoubleArrowIcon
                                sx={{ transform: 'rotate(180deg)' }}
                            />
                        }
                    >
                        Prev
                    </Button>
                </Box>
                <Box>
                    <Button
                        disabled={firstDiagramLengthList.length === 0}
                        color="inherit"
                        variant="outlined"
                        onClick={() => setShowAddRound(true)}
                        startIcon={<AddIcon />}
                    >
                        Add Round
                    </Button>
                </Box>
                <Box>
                    <ExportToExcel
                        color="inherit"
                        variant="outlined"
                        apiData={exportData}
                        fileName="vong-doi-dau"
                    />
                </Box>
            </Stack>

            <Dialog
                fullWidth
                maxWidth="sm"
                open={showAddRound}
                onClose={() => setShowAddRound(false)}
            >
                <DialogContent>
                    <AddRoundForm
                        EventID={EventID}
                        lang={language}
                        onSubmit={handleAddRound}
                        GenresID={GenresID}
                        onCancel={() => setShowAddRound(false)}
                        confrontationOptionList={
                            firstDiagramLengthList.length > 0
                                ? firstDiagramLengthList
                                      .map((item, idx) => ({
                                          label: `Top ${item * 2 * 2}`,
                                          value: idx + 1,
                                      }))
                                      .concat([
                                          {
                                              label: `${t('Final')}`,
                                              value:
                                                  firstDiagramLengthList.length +
                                                  1,
                                          },
                                      ])
                                : []
                        }
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}
