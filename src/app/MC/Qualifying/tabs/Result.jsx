import { Avatar, Box, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { ResultList } from '../components/ResultList'
import { useJudgePoint } from 'hooks/Player/useJudgePoint'

Result.propTypes = {
    athletic: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}
export function Result({ athletic, profile }) {
    const { data } = useJudgePoint(athletic.RegisterPlayGenresID)

    return (
        <div>
            <Stack
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                py={0.5}
            >
                <Box
                    sx={{
                        display: 'inline-block',
                        p: 1,

                        bgcolor: 'black',
                    }}
                >
                    <Typography color="white">
                        MC NAME: {profile?.FullName}
                    </Typography>
                </Box>

                <Box>
                    <Box
                        sx={{
                            display: 'inline-block',
                            p: 1,
                            my: 0.5,
                            border: '2px solid',
                            borderColor: 'grey.300',
                        }}
                    >
                        <Typography>RESULT ATHLETIC</Typography>
                    </Box>
                </Box>
            </Stack>
            <Box>
                <Box sx={{ bgcolor: 'white' }}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ py: 2 }}
                    >
                        <Box sx={{ width: 1 / 4 }}>
                            <Avatar
                                variant="rounded"
                                src={athletic.ImagesPaths}
                                alt="image"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    aspectRatio: '1/1',
                                }}
                            />
                        </Box>

                        <Stack alignItems="center" spacing={1}>
                            <Box
                                sx={{
                                    width: 40,
                                    aspectRatio: '26/20',
                                    mr: 2,
                                }}
                                component="img"
                                src={`https://flagpedia.net/data/flags/w702/${athletic.Flag.toLowerCase()}.webp`}
                                alt="flag"
                            />
                            <Box>
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    textTransform="uppercase"
                                    textAlign="center"
                                >
                                    {athletic.FullName}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    textTransform="uppercase"
                                    textAlign="center"
                                >
                                    average score
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'inline-block',
                                    p: 1,
                                    px: 2,
                                    bgcolor: 'black',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    textAlign="center"
                                    fontWeight={600}
                                    textTransform="uppercase"
                                    sx={{ color: '#ffea00' }}
                                >
                                    {data && data.length > 0
                                        ? data.reduce(
                                              (total, curr) =>
                                                  total + curr.PointPlay,
                                              0,
                                          )
                                        : 0}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>

                <Box>
                    <ResultList data={data} />
                </Box>
            </Box>
        </div>
    )
}
