import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import DownloadIcon from '@mui/icons-material/Download'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { ExportToExcel } from 'components/Common/ExportToExcel'
import { useGenre } from 'hooks/Genres/useGenre'
import { useRankingResult } from 'hooks/Player/useRanking'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { RankingList } from '../components/RankingList'
import { UniRankingList } from '../components/UniRankingList'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'
import { globalActions } from 'store/slice/globalSlice'

export function Ranking() {
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
  const { data } = useRankingResult({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    page: 1,
    limit: 10,
  })

  const { data: dataUni } = useUniRankingResult({
    eventID: eventId,
    genresID: genreId,
    LanguagesID: lang,
    page: 1,
    limit: 10,
  })
  const { data: dataUniRound2 } = useUniRankingResult({
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

  console.log('dataUni', dataUni)
  console.log('data', data)

  const dataExport = useCallback(() => {
    if (!Array.isArray(data) || data.length === 0) return []

    const firstItem = data[0]
    if (!firstItem || !Array.isArray(firstItem.lstUserPlayResult)) return []

    return firstItem.lstUserPlayResult.map((user, idx) => {
      const examResults = user.lstExmierPoint?.reduce((acc, ex) => {
        const key = `${ex.ExamierName} - ${ex.CriteriaName || 'Unknown'}`
        acc[key] = (acc[key] || 0) + ex.Point
        return acc
      }, {})

      return {
        STT: idx + 1,
        Cờ: user.Flag,
        'Tên đăng nhập': user.UserName,
        ...examResults,
        'Tổng cộng': user.TotalPoint,
      }
    })
  }, [data])
  const dataUniExport = useCallback(() => {
    if (!Array.isArray(dataUni) || dataUni.length === 0) return []

    const firstItem = dataUni[0]
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
  }, [dataUni])

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
              {genres?.IsUni === false ? (
                <ExportToExcel
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  apiData={dataExport() || []}
                />
              ) : (
                <ExportToExcel
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  apiData={dataUniExport() || []}
                />
              )}
            </Box>
          </Stack>
          <Box>
            {Array.isArray(data) && data.length > 0 && (
              <Box>
                {genres?.IsUni === false ? (
                  <RankingList data={data} />
                ) : (
                  <UniRankingList data={dataUni} />
                )}
              </Box>
            )}
          </Box>
        </Box>

        {genres?.IsUni === false ? (
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
                onClick={() => navigate('/dashboard/screen/welcome')}
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
                disabled={!Array.isArray(data) || data.length === 0}
              >
                Next
              </Button>
            </Box>
          </Stack>
        ) : (
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
                onClick={() => navigate('/dashboard/screen/welcome')}
                startIcon={
                  <DoubleArrowIcon sx={{ transform: 'rotate(180deg)' }} />
                }
              >
                Prev
              </Button>
            </Box>

            <Box>
              <Button
                onClick={() => navigate('/dashboard/screen/uniranking')}
                startIcon={<DoubleArrowIcon />}
                disabled={!Array.isArray(data) || data.length === 0}
              >
                Next
              </Button>
            </Box>
          </Stack>
        )}
      </Container>
    </Stack>
  )
}
