import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import DownloadIcon from '@mui/icons-material/Download'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { ExportToExcel } from 'components/Common/ExportToExcel'
import { useGenre } from 'hooks/Genres/useGenre'
import { useRankingResult } from 'hooks/Player/useRanking'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { useUniRankingResult } from 'hooks/Player/useUniRanking'

import { UniLastRoundList } from '../components/UniLastRoundList'

export function UniLastRound() {
  const navigate = useNavigate()
  const [currentRound, setCurrentRound] = useState(0)
  const dispatch = useDispatch()
  const eventId =
    useSelector((state) => state.global.eventId) ||
    localStorage.getItem('eventId')
  const genreId =
    useSelector((state) => state.global.genresId) ||
    localStorage.getItem('genresId')
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'
  const roundUni =
    useSelector((state) => state.global.roundUni) ||
    localStorage.getItem('roundUni')

  const { data } = useUniRankingResult({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    isChose: 1,
    page: 1,
    limit: 10,
  })
  const { data: genres } = useGenre({
    genresID: genreId,
    LanguagesID: lang,
  })

  // const dataExport = useCallback(() => {
  //   if (Array.isArray(data) && data?.length === 0) return []

  //   let newData = data?.[0].lstUserPlayResult.map((item, idx) => ({
  //     STT: idx + 1,
  //     Cờ: item.Flag,
  //     'Tổng cộng': item.TotalPoint,
  //     'Tên đăng nhập': item.UserName,
  //     'Kết quả: ': item.lstExmierPoint.map((item) => ({
  //       [item.ExamierName]: item.Point,
  //     })),
  //   }))

  //   newData = newData?.map((item) => {
  //     const results = item['Kết quả: '].reduce((acc, curr) => {
  //       return { ...acc, ...curr }
  //     }, {})

  //     return {
  //       STT: item['STT'],
  //       Cờ: item['Cờ'],
  //       'Tên đăng nhập': item['Tên đăng nhập'],
  //       ...results,
  //       'Tổng cộng': item['Tổng cộng'],
  //     }
  //   })

  //   return newData
  // }, [data])

  const dataExport = useCallback(() => {
    if (!Array.isArray(data) || data.length === 0) return []

    const firstItem = data[0]
    if (!firstItem || !Array.isArray(firstItem.lstUni)) return []

    return firstItem.lstUni.map((uni, idx) => {
      const examResults = uni.lstJudge?.reduce((acc, judge) => {
        judge.lstScoreCrit.forEach((crit) => {
          const key = `${judge.FullName} - ${crit.CritName}`
          acc[key] = (acc[key] || 0) + crit.Point
        })
        return acc
      }, {})

      return {
        STT: idx + 1,
        Cờ: uni.RegisterPlayGenresID,
        'Tên đăng nhập': uni.FullName,
        ...examResults,
        'Tổng cộng': uni.TotalScore,
      }
    })
  }, [data])

  if (!eventId || !genreId) {
    return <Navigate to="/screen/welcome" replace />
  }

  return (
    <Stack>
      <Container>
        <Box width="100%" sx={{ mx: 'auto' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ fontFamily: 'BlowBrush' }}
            >
              {genres?.GenresName}
            </Typography>

            <Box>
              <ExportToExcel
                variant="contained"
                startIcon={<DownloadIcon />}
                apiData={dataExport() || []}
              />
            </Box>
          </Stack>
          <Box>
            {Array.isArray(data) && data?.length > 0 && (
              <Box>
                <UniLastRoundList data={data} />
              </Box>
            )}
          </Box>
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          sx={{
            py: 2,
            width: '100%',
          }}
        >
          <Box>
            <Button
              onClick={() => navigate(-1)}
              startIcon={
                <DoubleArrowIcon sx={{ transform: 'rotate(180deg)' }} />
              }
            >
              Prev
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => navigate('/dashboard/screen/diagram')}
              startIcon={<DoubleArrowIcon />}
              disabled={!Array.isArray(data) || data?.length === 0}
            >
              Next
            </Button>
          </Box>
        </Stack>
      </Container>
    </Stack>
  )
}
