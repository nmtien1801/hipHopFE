import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import overlay from 'assets/images/bg-overlay-1.png'
import titleBg from 'assets/images/title-bg.png'
import { MainLoading } from 'components/Common/MainLoading'
import { useNewsList } from 'hooks/News/useNewsList'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NewsFilter } from '../components/NewsFilter'
import { NewsList } from '../components/NewsList'

export function NewsPage() {
    const language = useSelector((state) => state.global.language)
    const [params, setParams] = useState({
        page: 1,
        limit: 6,
        LanguagesID: language,
    })
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 6,
    })
    const {
        data: newsList,
        total,
        isLoading: newsLoading,
    } = useNewsList(params)

    const navigate = useNavigate()

    useEffect(() => {
        setParams({ ...params, LanguagesID: language })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    useEffect(() => {
        if (!newsLoading) {
            setPagination({
                ...pagination,
                page: params.page,
                limit: params.limit,
                total: total,
                totalPage: Math.ceil(total / params.limit),
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, params, newsLoading])

    function handleFilterChange(newParams) {
        setParams(newParams)
    }

    return newsLoading ? (
        <MainLoading />
    ) : (
        <Box sx={{ position: 'relative', pb: { xs: 12.5, sm: 30 } }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Container maxWidth="xl">
                    <Box>
                        <Stack
                            sx={{ py: 4 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: '100%',
                                    maxWidth: 600,
                                    backgroundImage: `url(${titleBg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    aspectRatio: '507/193',
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    gutterBottom
                                    fontWeight={600}
                                    color="primary"
                                    sx={{
                                        fontFamily: 'BlowBrush',
                                        textAlign: 'center',
                                    }}
                                >
                                    News
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack spacing={3}>
                            <Box>
                                <NewsFilter
                                    params={params}
                                    onFilterChange={handleFilterChange}
                                />
                            </Box>
                            <Box>
                                <NewsList
                                    newsList={newsList}
                                    onClick={(item) =>
                                        navigate(`/home/news/${item.NewsID}`)
                                    }
                                />
                            </Box>

                            <Stack alignItems="center">
                                <Pagination
                                    shape="rounded"
                                    hidden={pagination?.totalPage <= 1}
                                    count={pagination?.totalPage || 0}
                                    page={params.page}
                                    onChange={(e, page) =>
                                        setParams({ ...params, page })
                                    }
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${overlay})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'repeat-x',
                }}
            />
        </Box>
    )
}

export default NewsPage
