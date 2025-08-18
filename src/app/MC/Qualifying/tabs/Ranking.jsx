import { Box, Stack, Typography } from '@mui/material'
import { useRanking } from 'hooks/Player/useRanking'
import { RankingList } from '../components/RankingList'

export function Ranking({ profile, genreId, eventId, lang }) {
    const { data } = useRanking({
        eventID: eventId,
        genresID: genreId,
        LanguagesID: lang,
    })

    return (
        <Box>
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
                        <Typography>RANKING</Typography>
                    </Box>
                </Box>

                <Box width="100%" sx={{ px: 3 }}>
                    <RankingList data={data || []} />
                </Box>
            </Stack>
        </Box>
    )
}
