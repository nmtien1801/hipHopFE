import { Box, Stack, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { Flag } from 'components/Common/Flag'

export function CoupleList({
    playerCoupleList,
    onSelectCouple,
    selectedCouple,
}) {
    return (
        <Stack spacing={1.5}>
            {playerCoupleList?.map((item, idx) => (
                <Box
                    key={idx}
                    onClick={() => {
                        if (item?.IsWin) return
                        onSelectCouple?.(item)
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        boxShadow={3}
                        sx={{
                            height: 70,
                            borderRadius: '4px',
                            color: 'white',
                            bgcolor: item?.IsWin
                                ? '#004a6d'
                                : selectedCouple?.CoupleID === item.CoupleID
                                ? '#001119'
                                : '#004a6d',
                            cursor: item?.IsWin ? 'default' : 'pointer',
                            '&:hover': {
                                bgcolor: item?.IsWin ? '#004a6d' : '#001119',
                                boxShadow: (theme) => theme.shadows[10],
                            },
                        }}
                    >
                        <Stack
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{
                                width: 30,
                                py: 1.5,
                                height: '100%',
                                bgcolor: '#0076ab',
                                borderRadius: '4px 0 0 4px',
                            }}
                        >
                            <Typography
                                color="inherit"
                                textAlign="center"
                                fontWeight={600}
                            >
                                {idx + 1}
                            </Typography>

                            {Boolean(item?.IsWin) && (
                                <CheckIcon fontSize="small" />
                            )}
                        </Stack>

                        <Stack direction="row" alignItems="center" flexGrow={1}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                width={2 / 5}
                            >
                                <Flag
                                    code={item.FlagPlayer1}
                                    sx={{
                                        width: 40,
                                        aspectRatio: '26/20',
                                        mr: 2,
                                    }}
                                />

                                <Typography>{item.NamePlayer1}</Typography>
                            </Stack>

                            <Typography
                                color="inherit"
                                variant="h6"
                                fontWeight={600}
                                width={1 / 5}
                            >
                                VS
                            </Typography>

                            <Stack
                                direction="row"
                                alignItems="center"
                                width={2 / 5}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                        width: 40,
                                        aspectRatio: '26/20',
                                        mr: 2,
                                    }}
                                    src={`https://flagpedia.net/data/flags/w702/${item.FlagPlayer2.toLowerCase()}.webp`}
                                    alt="vn"
                                />

                                <Typography>{item.NamePlayer2}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            ))}
        </Stack>
    )
}
