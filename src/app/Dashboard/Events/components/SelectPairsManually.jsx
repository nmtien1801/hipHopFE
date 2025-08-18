import { Box, Button, Stack, Typography } from '@mui/material'
import { SortBox } from 'components/FormFields/SortBox'
import { useState } from 'react'

export function SelectPairsManually({
    pairOfPlayerList,
    onConfirm,
    onFilterChange,
    num,
}) {
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [pairs, setPairs] = useState([])

    const handlePlayerClick = (player) => {
        setSelectedPlayers((prev) => {
            const newSelection = [...prev, player]

            if (newSelection.length === 2) {
                setPairs((prevPairs) => [...prevPairs, newSelection])
                return []
            }
            return newSelection
        })
    }

    const handleRemovePair = (index) => {
        setPairs((prevPairs) => prevPairs.filter((_, i) => i !== index))
    }

    const isPlayerSelected = (player) => {
        return selectedPlayers.includes(player) || pairs.flat().includes(player)
    }

    return (
        <Box>
            <Stack alignItems="flex-end">
                <Box>
                    <SortBox
                        disabled={pairOfPlayerList?.some(
                            (item) => item.IsChose === 1,
                        )}
                        hideOptionAll
                        defaultValue={num}
                        onChange={onFilterChange}
                        optionList={[
                            {
                                label: 'Top 8',
                                value: 8,
                            },
                            {
                                label: 'Top 16',
                                value: 16,
                            },
                            {
                                label: 'Top 32',
                                value: 32,
                            },
                        ]}
                    />
                </Box>
            </Stack>
            <Stack direction="row" sx={{ mx: -1 }}>
                <Box sx={{ width: 1 / 3 }}>
                    <Box sx={{ p: 1 }}>
                        <Stack boxShadow={1} spacing={1} sx={{ p: 2 }}>
                            {Array.isArray(pairOfPlayerList) &&
                                pairOfPlayerList.length > 0 &&
                                pairOfPlayerList.map((item, index) => (
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => handlePlayerClick(item)}
                                        key={index}
                                        disabled={
                                            item.IsChose !== 0 ||
                                            isPlayerSelected(item)
                                        }
                                    >
                                        {item.FullName}
                                    </Button>
                                ))}
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ width: 2 / 3 }}>
                    <Box sx={{ p: 1 }}>
                        {pairs.length > 0 && (
                            <Stack boxShadow={3} spacing={1} sx={{ p: 2 }}>
                                {pairs.map((pair, index) => (
                                    <Box key={index}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1.5}
                                        >
                                            <Box flexGrow={1}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    color="primary"
                                                >
                                                    {pair[0].FullName}
                                                </Button>
                                            </Box>

                                            <Typography fontWeight={600}>
                                                VS
                                            </Typography>

                                            <Box flexGrow={1}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    color="error"
                                                >
                                                    {pair[1].FullName}
                                                </Button>
                                            </Box>

                                            <Button
                                                variant="contained"
                                                color="success"
                                                disabled={
                                                    pairOfPlayerList?.find(
                                                        (item) =>
                                                            item.RegisterPlayGenresID ===
                                                            pair[0]
                                                                .RegisterPlayGenresID,
                                                    )?.IsChose === 1
                                                }
                                                onClick={() => {
                                                    onConfirm?.(
                                                        pair[0]
                                                            .RegisterPlayGenresID,
                                                        pair[1]
                                                            .RegisterPlayGenresID,
                                                    )

                                                    handleRemovePair(index)
                                                }}
                                            >
                                                Xác nhận
                                            </Button>
                                            <Button
                                                disabled={
                                                    pairOfPlayerList?.find(
                                                        (item) =>
                                                            item.RegisterPlayGenresID ===
                                                            pair[0]
                                                                .RegisterPlayGenresID,
                                                    )?.IsChose === 1
                                                }
                                                variant="contained"
                                                color="warning"
                                                onClick={() =>
                                                    handleRemovePair(index)
                                                }
                                            >
                                                Xóa
                                            </Button>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}
