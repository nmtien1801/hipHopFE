import { Box, Stack } from '@mui/material'
import { CoupleItem } from 'components/Common/CoupleItem'
import { useNavigate } from 'react-router-dom'

export function DiagramStartGroup({ diagramLengthList, playerCoupleList }) {
    const navigate = useNavigate()

    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ width: '100%', height: '100%' }}
        >
            {diagramLengthList.length > 0 &&
                diagramLengthList.map((height, index, arr) => (
                    <Stack
                        key={index}
                        justifyContent="space-around"
                        spacing={1 % (arr.length + 1)}
                        sx={{
                            width:
                                index === 0
                                    ? `calc(${100 / arr.length}% - 10px)`
                                    : 1 / arr.length,
                            height: '100%',
                        }}
                    >
                        {[...Array(height)].map((item, idx) => {
                            const coupleList = playerCoupleList
                                .filter(
                                    (item) => item.NumberRound === index + 1,
                                )
                                .filter((item, idx, arr) => idx < height)

                            const couple = coupleList[idx]

                            return (
                                <Stack
                                    key={idx}
                                    justifyContent="center"
                                    sx={{
                                        width: '100%',
                                        height: `calc(${
                                            index > 0
                                                ? 100 / arr[index - 1]
                                                : 100 / height
                                        }% + ${index > 0 ? 50 : 0}px)`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <CoupleItem
                                            onClick={() => {
                                                // if (couple?.IsWin !== 0) return

                                                couple?.CoupleID &&
                                                    navigate(
                                                        `/dashboard/screen/round/${couple?.CoupleID}`,
                                                    )
                                            }}
                                            isEnd={index === 0}
                                            mode="left"
                                            isWin={couple?.IsWin}
                                            player_1={couple?.NamePlayer1}
                                            player_2={couple?.NamePlayer2}
                                            flag_1={couple?.FlagPlayer1}
                                            flag_2={couple?.FlagPlayer2}
                                        />
                                    </Box>
                                </Stack>
                            )
                        })}
                    </Stack>
                ))}
        </Stack>
    )
}
