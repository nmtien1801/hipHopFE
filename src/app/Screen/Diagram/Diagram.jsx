import { Box, Button, Stack } from '@mui/material'
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

export function Diagram() {
    const navigate = useNavigate()
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

    if (!EventID || !GenresID) {
        return <Navigate to="/screen/welcome" replace />
    }

    return isLoading || playerCoupleList.length === 0 ? (
        <Loading />
    ) : (
        <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            height="100vh"
            bgcolor="black"
            spacing={7}
            py={3}
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

            <Box sx={{ width: '16%' }}>
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

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    p: 3,

                    color: 'white',
                    opacity: 0.3,
                    '&:hover': {
                        opacity: 0.8,
                    },
                }}
            >
                <Button
                    color="inherit"
                    onClick={() => navigate('/screen/ranking')}
                    startIcon={
                        <DoubleArrowIcon sx={{ transform: 'rotate(180deg)' }} />
                    }
                >
                    Prev
                </Button>
            </Box>
        </Stack>
    )
}
