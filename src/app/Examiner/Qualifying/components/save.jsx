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
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'
import { useUniRankingResult } from 'hooks/Player/useUniRanking'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getToken } from 'utils/hash'

export function ScoringFormSave({ onSubmit, data, isSelected, judgeID }) {
  const token = getToken()
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'
  const eventIDRef = useRef(data?.EventID)
  const genresIDRef = useRef(data?.GenresID)
  const { data: uniCriteriaList } = useCriteriaList({
    eventID: eventIDRef.current,
    genresID: genresIDRef.current,
  })
  const { data: dataUniRound2 } = useUniRankingResult({
    eventID: data.EventID,
    genresID: data.GenresID,
    LanguagesID: lang,
    page: 1,
    limit: 10,
  })

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: data?.IsUni
      ? { Point: data?.PointPlay || 0 }
      : { PointPlay: data?.PointPlay || 0 },
  })

  // useEffect(() => {
  //   if (data) {
  //     reset(
  //       data?.IsUni
  //         ? { Point: data?.PointPlay || 0 }
  //         : { PointPlay: data?.PointPlay || 0 },
  //     )
  //   }
  // }, [data, reset])

  const handleFormSubmit = handleSubmit((formValues) => {
    if (data.IsUni === false) {
      const newData = {
        auth: {
          UserID: token?.UserID,
          UUSerID: token?.UserName,
        },
        data: {
          RegisterPlayGenresID: data.RegisterPlayGenresID,
          PointPlay: formValues.PointPlay,
        },
      }
      onSubmit?.(newData)
    } else {
      const lstPoint = Object.entries(formValues)
        .filter(([key]) => key.startsWith('Point-'))
        .map(([CritID, Point]) => ({
          CritID: Number(CritID.split('-')[1]),
          Point: Number(Point),
        }))
      const newData = {
        auth: {
          UserID: token?.UserID,
          UUSerID: token?.UserName,
        },
        data: {
          RegisterPlayGenresID: data.RegisterPlayGenresID,
          lstPoint,
        },
      }
      console.log('newData', newData)
      onSubmit?.(newData)
    }
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
              {data?.IsUni ? (
                <Stack direction="column" spacing={2} sx={{ p: 2 }}>
                  {uniCriteriaList?.data?.map((criteria) => {
                    const fieldName = `Point-${criteria.CritID}`
                    const existingPoint =
                      dataUniRound2?.[0]?.lstUni
                        ?.find(
                          (uni) =>
                            uni.RegisterPlayGenresID ===
                            data.RegisterPlayGenresID,
                        )
                        ?.lstJudge?.find((judge) => judge.UserID === judgeID)
                        ?.lstScoreCrit?.find(
                          (p) => p.CritID === criteria.CritID,
                        )?.Point || 0

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
                          name={fieldName}
                          control={control}
                          step={0.5}
                          min={0}
                          max={criteria.Point}
                          value={watch(fieldName, existingPoint)}
                          onChange={(value) => setValue(fieldName, value)}
                        />

                        <InputField
                          type="number"
                          size="small"
                          name={fieldName}
                          step={0.5}
                          max={criteria.Point}
                          min={0}
                          sx={{ width: 130 }}
                          control={control}
                          value={watch(fieldName, existingPoint)}
                          onChange={(e) => {
                            let value = Number(e?.target?.value || 0)
                            if (value > criteria.Point) {
                              value = criteria.Point
                            }
                            setValue('PointPlay', value)
                          }}
                        />
                      </Stack>
                    )
                  })}
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center">
                  <Box flexGrow={1}>
                    <SliderField
                      step={0.5}
                      min={0}
                      max={100}
                      name="PointPlay"
                      control={control}
                      value={data?.PointPlay || 0}
                      onChange={(value) => setValue('PointPlay', value)}
                      disabled={Boolean(data?.PointPlay)}
                    />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2">SCORE</Typography>
                      <InputField
                        type="number"
                        size="small"
                        name="PointPlay"
                        step={0.5}
                        max={100}
                        min={0}
                        sx={{ width: 70 }}
                        control={control}
                        value={data?.PointPlay || 0}
                        onChange={(e) =>
                          setValue('PointPlay', Number(e.target.value))
                        }
                        disabled={Boolean(data?.PointPlay)}
                      />
                    </Stack>
                  </Box>

                  <Typography
                    textTransform="uppercase"
                    fontWeight={600}
                    variant="h4"
                    align="right"
                    sx={{ p: 2, width: 100 }}
                  >
                    {data?.PointPlay || 0}
                  </Typography>
                </Stack>
              )}
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
