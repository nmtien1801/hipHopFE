import CheckIcon from '@mui/icons-material/Check'
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material'
import { InputField } from 'components/FormFields/InputField'
import { SliderField } from 'components/FormFields/SliderField'
import { useAuth } from 'hooks/Auth/auth'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getToken } from 'utils/hash'

export function UniScoringForm({ onSubmit, data, isSelected }) {
  const token1 = getToken()
  const [points, setPoints] = useState({})
  const { data: profile } = useAuth(token1?.UserID)
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'

  const { data: dataUniRound2 } = useUniRankingResult({
    eventID: data.EventID,
    genresID: data.GenresID,
    LanguagesID: lang,
    page: 1,
    limit: 10,
  })

  const { control, handleSubmit, reset } = useForm({
    defaultValues: data?.isUni
      ? {
          lstPoint:
            dataUniRound2?.[0]?.lstUni?.[0]?.lstJudge?.[0]?.lstScoreCrit || [],
        }
      : { PointPlay: data?.PointPlay || 0 },
  })

  useEffect(() => {
    if (data) {
      reset({
        ...(data.isUni
          ? { lstPoint: data.lstPoint }
          : { PointPlay: data.PointPlay }),
      })
    }
  }, [data, reset])

  const eventIDRef = useRef(data?.EventID)
  const genresIDRef = useRef(data?.GenresID)
  const token = getToken()
  const { data: uniCriteriaList } = useCriteriaList({
    eventID: eventIDRef.current,
    genresID: genresIDRef.current,
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    const lstPoint = Object.entries(formValues)
      .filter(([key]) => key.startsWith('Point-'))
      .map(([CritID, Point]) => ({
        CritID: Number(CritID.split('-')[1]),
        Point: Number(Point),
      }))

    console.log('lstPoint', lstPoint)
    const newData = {
      auth: {
        UserID: token?.UserID,
        UserName: token?.UserName,
      },
      data: {
        RegisterPlayGenresID: data.RegisterPlayGenresID,
        lstPoint,
      },
    }
    onSubmit?.(newData)
  })

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <Stack
      direction="row"
      alignItems="center"
      component="form"
      spacing={1}
      onSubmit={handleFormSubmit}
      noValidate
    >
      <Stack
        direction="row"
        alignItems="center"
        boxShadow={1}
        sx={{
          flexGrow: 1,
          height: 'auto',
          borderRadius: '4px',
          bgcolor: isSelected ? '#001119' : '#004a6d',
          color: 'white',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#001119',
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <Stack direction="row" alignItems="center" width="100%">
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              p: 1,
              height: 90,
              borderRadius: '4px 0 0 4px',
              bgcolor: '#0076ab',
              mr: 2,
            }}
          >
            <Typography>{data?.idx}</Typography>
          </Stack>

          <Box
            component="img"
            sx={{
              width: 40,
              aspectRatio: '26/20',
              mr: 2,
            }}
            src={`https://flagpedia.net/data/flags/w702/${data.Flag.toLowerCase()}.webp`}
            alt="vn"
          />

          <Box flexGrow={1}>
            <Typography textTransform="uppercase" fontWeight={600}>
              {data?.FullName}
            </Typography>
          </Box>

          <Box width={2 / 3}>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              <Stack direction="column" spacing={2} sx={{ p: 2 }}>
                {uniCriteriaList?.data?.map((criteria) => {
                  const existingPoint =
                    data?.lstPoint?.find((p) => p.CritID === criteria.CritID)
                      ?.Point || 0

                  return (
                    <Stack
                      key={criteria.CritID}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography variant="body2" sx={{ width: 150 }}>
                        {criteria.CritName}
                      </Typography>

                      <SliderField
                        onChange={(value) => {
                          setPoints((prev) => ({
                            ...prev,
                            [criteria.CritID]: value,
                          }))
                        }}
                        step={0.5}
                        min={0}
                        max={criteria.Point}
                        name={`Point-${criteria.CritID}`}
                        control={control}
                        defaultValue={existingPoint}
                      />

                      <InputField
                        type="number"
                        size="small"
                        name={`Point-${criteria.CritID}`}
                        step={0.5}
                        max={criteria.Point}
                        min={0}
                        sx={{ width: 150 }}
                        control={control}
                        defaultValue={existingPoint}
                        onChange={(value) => {
                          setPoints((prev) => ({
                            ...prev,
                            [criteria.CritID]: value,
                          }))
                        }}
                      />
                    </Stack>
                  )
                })}
              </Stack>
            </ThemeProvider>
          </Box>
        </Stack>
      </Stack>

      <Button
        type="submit"
        disabled={Boolean(data?.CriteriaPoints)}
        sx={{
          height: '90px',
          width: 95,
          p: 2,
          bgcolor: '#004a6d',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#001119',
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <Typography variant="h5" color="white" fontWeight={600}>
          {data?.CriteriaPoints ? <CheckIcon sx={{ fontSize: 64 }} /> : 'SAVE'}
        </Typography>
      </Button>
    </Stack>
  )
}
