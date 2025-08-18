import { Box, Stack, Typography } from '@mui/material'

import bg_title_white from 'assets/images/bg-title-white.png'
import header_bg from 'assets/images/header-bg-1.png'
import round_bg_1 from 'assets/images/round-bg-1.png'
import { Flag } from 'components/Common/Flag'
import { useRound } from 'hooks/useCouplePlayers'
import { useEffect, useState } from 'react'
import { getToken } from 'utils/hash'
import { Player } from '../components/Player'
import { RoundList } from '../components/RoundList'

export function Round({
    onChooseCouple,
    couple,
    playerCoupleList,
    EventID,
    genre,
    setTabs,
}) {
    const [numberOfRound, setNumberOfRound] = useState(
        localStorage.getItem('numberOfRound') || 1,
    )
    const token = getToken()

    const isWin = playerCoupleList?.find(
        (item) => item.CoupleID === couple.CoupleID,
    )?.IsWin

    useEffect(() => {
        const newCouple = JSON.parse(localStorage.getItem('couple'))
        if (couple.CoupleID !== newCouple?.CoupleID) {
            console.log('Khác')
            setNumberOfRound(1)
            localStorage.setItem('numberOfRound', 1)
            localStorage.setItem('couple', JSON.stringify(couple))
        }
    }, [couple])

    const { data, updatePointRound, isLoading, refetch } = useRound({
        CoupleID: couple?.CoupleID,
        UserID: token?.UserID,
    })

    function handleChooseCouple() {
        onChooseCouple?.()
    }

    function handleUpdatePointRound(id, point, numberOfRound) {
        setNumberOfRound(numberOfRound)
        localStorage.setItem('numberOfRound', numberOfRound)

        updatePointRound
            .mutateAsync({
                auth: {
                    UserID: token.UserID,
                    UUSerID: token.UserName,
                },
                data: {
                    RoundID: id,
                    ChoseUser: point,
                    EventID,
                },
            })
            .then(() => {})
            .catch((err) => {
                console.log(`${err}`)
            })
    }

    return (
        <Box width="100%" sx={{ py: 3 }}>
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: '60%',
                    mx: 'auto',

                    aspectRatio: '715/272',
                    backgroundImage: `url(${bg_title_white})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight={600}
                    sx={{ color: '#000', fontFamily: 'BlowBrush' }}
                >
                    {genre?.GenresName}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                alignContent="center"
                justifyContent="center"
                spacing={3}
            >
                <Box>
                    <Flag sx={{ width: 55 }} code={couple?.FlagPlayer1 || ''} />
                </Box>
                <Box>
                    <Flag sx={{ width: 55 }} code={couple?.FlagPlayer2 || ''} />
                </Box>
            </Stack>

            <Stack
                position="relative"
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                zIndex={1}
                sx={{
                    width: 'calc(100% + 68px)',
                    backgroundImage: `url(${header_bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    aspectRatio: '860/191',
                    mt: -2,
                    transform: 'translateX(-34px)',
                }}
            >
                <Box sx={{ width: 1 / 3 }}>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        textAlign="center"
                        color="white"
                    >
                        {couple.NamePlayer1}
                    </Typography>
                </Box>

                <Box sx={{ width: 1 / 3 }}>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        textAlign="center"
                        color="white"
                    >
                        {couple.NamePlayer2}
                    </Typography>
                </Box>
            </Stack>

            <Box sx={{ mt: '-66.5px' }}>
                <Box
                    sx={{
                        backgroundImage: `url(${round_bg_1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        pt: '48px',
                    }}
                >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                textAlign="center"
                                fontWeight={600}
                            >
                                ROUND{' '}
                                {data?.length < numberOfRound
                                    ? numberOfRound - 1
                                    : numberOfRound}
                            </Typography>
                            <Typography variant="h5" textAlign="center">
                                KNOCKOUT{' '}
                                <Typography
                                    variant="h5"
                                    component="span"
                                    color="red"
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                    }}
                                >
                                    {genre?.GenresName}
                                </Typography>
                            </Typography>
                        </Box>

                        <Box width="100%">
                            <RoundList
                                data={data}
                                couple={couple}
                                isLoading={isLoading}
                                onUpdatePointRound={handleUpdatePointRound}
                                onChooseCouple={handleChooseCouple}
                                onRefetch={refetch}
                                numberOfRound={Number(numberOfRound)}
                                isFinish={Boolean(isWin)}
                                onReset={() => {
                                    localStorage.removeItem('couple')
                                    localStorage.removeItem('numberOfRound')
                                    localStorage.removeItem('confrontation-tab')
                                    setTabs('couple')
                                }}
                            />

                            <Player couple={couple} />
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
