import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack } from '@mui/material'
import { CheckIcon } from 'assets/icons/CheckIcon'
import { useState } from 'react'

export function RoundList({
    data,
    onUpdatePointRound,
    isLoading,
    onRefetch,
    onChooseCouple,
    couple,
    numberOfRound,
}) {
    const [selectedRound, setSelectedRound] = useState(null)

    return (
        <>
            {Array.isArray(data) &&
                data.length > 0 &&
                data.map((item, idx, array) => (
                    <Box sx={{ px: 2 }} key={idx}>
                        <Stack direction="row" alignItems="center">
                            {' '}
                            <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ p: 1, color: 'grey.500' }}>
                                    <Button
                                        disabled={
                                            item.ChoseUser > 0 ||
                                            couple.IsWin ||
                                            (array[idx - 1] &&
                                                array[idx - 1].IsCompleted ===
                                                    0)
                                        }
                                        color="inherit"
                                        fullWidth
                                        variant={
                                            item.ChoseUser === 3
                                                ? 'contained'
                                                : selectedRound?.point === 3 &&
                                                  numberOfRound === idx + 1
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        startIcon={
                                            item.ChoseUser === 3 ? (
                                                <CheckIcon />
                                            ) : (
                                                'o  Draw'
                                            )
                                        }
                                        onClick={() => {
                                            setSelectedRound?.({
                                                RoundID: item.RoundID,
                                                point: 3,
                                                numberOfRound: idx + 2,
                                            })
                                        }}
                                        sx={{
                                            '.MuiButton-icon': {
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ p: 1 }}>
                                    <Button
                                        disabled={
                                            item.ChoseUser > 0 ||
                                            couple.IsWin ||
                                            (array[idx - 1] &&
                                                array[idx - 1].IsCompleted ===
                                                    0)
                                        }
                                        color="primary"
                                        fullWidth
                                        variant={
                                            item.ChoseUser === 1
                                                ? 'contained'
                                                : selectedRound?.point === 1 &&
                                                  numberOfRound === idx + 1
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        startIcon={
                                            item.ChoseUser === 1 ? (
                                                <CheckIcon />
                                            ) : (
                                                'o'
                                            )
                                        }
                                        onClick={() => {
                                            setSelectedRound?.({
                                                RoundID: item.RoundID,
                                                point: 1,
                                                numberOfRound: idx + 2,
                                            })
                                        }}
                                        sx={{
                                            '&.Mui-disabled': {
                                                color:
                                                    item.ChoseUser === 1
                                                        ? 'white'
                                                        : 'inherit',
                                                bgcolor:
                                                    item.ChoseUser === 1
                                                        ? 'primary.main'
                                                        : 'inherit',
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ p: 1 }}>
                                    <Button
                                        disabled={
                                            item.ChoseUser > 0 ||
                                            couple.IsWin ||
                                            (array[idx - 1] &&
                                                array[idx - 1].IsCompleted ===
                                                    0)
                                        }
                                        color="error"
                                        fullWidth
                                        variant={
                                            item.ChoseUser === 2
                                                ? 'contained'
                                                : selectedRound?.point === 2 &&
                                                  numberOfRound === idx + 1
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        startIcon={
                                            item.ChoseUser === 2 ? (
                                                <CheckIcon />
                                            ) : (
                                                'o'
                                            )
                                        }
                                        onClick={() =>
                                            setSelectedRound?.({
                                                RoundID: item.RoundID,
                                                point: 2,
                                                numberOfRound: idx + 2,
                                            })
                                        }
                                        sx={{
                                            '&.Mui-disabled': {
                                                color:
                                                    item.ChoseUser === 2
                                                        ? 'white'
                                                        : 'inherit',
                                                bgcolor:
                                                    item.ChoseUser === 2
                                                        ? 'error.main'
                                                        : 'inherit',
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ p: 1 }}>
                                    <Button
                                        disabled={
                                            item.ChoseUser > 0 ||
                                            couple.IsWin ||
                                            (array[idx - 1] &&
                                                array[idx - 1].IsCompleted ===
                                                    0)
                                        }
                                        color="success"
                                        fullWidth
                                        variant={'contained'}
                                        startIcon="Submit"
                                        onClick={() => {
                                            setSelectedRound?.(null)
                                            onUpdatePointRound?.(
                                                selectedRound?.RoundID,
                                                selectedRound?.point,
                                                selectedRound?.numberOfRound,
                                            )
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                ))}

            <Stack
                direction="row"
                justifyContent="flex-end"
                width="100%"
                sx={{ mt: 1, px: 3 }}
                spacing={2}
            >
                <Box>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        onClick={() => onRefetch?.()}
                        startIcon={<RestartAltIcon />}
                        loading={isLoading}
                    >
                        Refresh
                    </LoadingButton>
                </Box>
                <Box>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        disabled={!couple}
                        loading={isLoading}
                        onClick={() => onChooseCouple?.()}
                    >
                        Choose New Couple
                    </LoadingButton>
                </Box>
            </Stack>
        </>
    )
}
