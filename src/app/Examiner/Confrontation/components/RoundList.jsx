import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ReplayIcon from '@mui/icons-material/Replay'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from '@mui/material'
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
    isFinish,
    onReset,
}) {
    const [selectedRound, setSelectedRound] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
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
                        color="error"
                        onClick={() => setShowConfirm(true)}
                        startIcon={<RestartAltIcon />}
                        loading={isLoading}
                    >
                        Reset
                    </LoadingButton>
                </Box>
                <Box>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        onClick={() => onRefetch?.()}
                        startIcon={<ReplayIcon />}
                        loading={isLoading}
                    >
                        Refresh
                    </LoadingButton>
                </Box>
                <Box>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        loading={isLoading}
                        disabled={!isFinish}
                        onClick={() => onChooseCouple?.()}
                    >
                        Choose New Couple
                    </LoadingButton>
                </Box>

                <Dialog open={showConfirm} onClose={() => setShowConfirm(null)}>
                    <DialogTitle>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography fontWeight={600}>
                                Confirm RESET
                            </Typography>
                        </Stack>
                    </DialogTitle>
                    <DialogContent dividers>
                        Are you sure you want to reset everything? Any thing
                        will be lost.
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" onClick={() => onReset?.()}>
                            Confirm
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setShowConfirm(null)}
                        >
                            cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </>
    )
}
