import { Box, Stack } from '@mui/material'
import { CoupleItem } from 'components/Common/CoupleItem'
import { useNavigate } from 'react-router-dom'

export function DiagramEndGroup({
    diagramLengthList = [],
    playerCoupleList = [],
}) {
    const navigate = useNavigate()
    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            sx={{ width: '100%', height: '100%' }}
        >
            {diagramLengthList.length > 0 &&
                diagramLengthList.map((height, index, arr) => (
                    <Stack
                        key={index}
                        justifyContent="space-around"
                        spacing={1 % arr.length}
                        sx={{
                            width:
                                index === arr.length - 1
                                    ? `calc(${100 / arr.length}% - 10px)`
                                    : 1 / arr.length,
                            height: '100%',
                        }}
                    >
                        {[...Array(height)].map((_, idx) => {
                            const coupleList = playerCoupleList
                                .filter(
                                    (item) =>
                                        item.NumberRound === arr.length - index,
                                )
                                .filter((_, idx, arr) => idx >= height)

                            const couple = coupleList[idx]
                            return (
                                <Stack
                                    key={idx}
                                    justifyContent="center"
                                    sx={{
                                        width: '100%',
                                        height: `calc(${
                                            index >= arr.length - 2
                                                ? 100 / arr[arr.length - 1]
                                                : 100 / arr[index + 1] //  0 1 2 3  // 1 2 4 8
                                        }% + ${
                                            index < arr.length - 1 ? 50 : 0
                                        }px)`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <CoupleItem
                                            onClick={() =>
                                                couple?.CoupleID &&
                                                navigate(
                                                    `/dashboard/screen/round/${couple.CoupleID}`,
                                                )
                                            }
                                            mode="right"
                                            isEnd={index === arr.length - 1}
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
