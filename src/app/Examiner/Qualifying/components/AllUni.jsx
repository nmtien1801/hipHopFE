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
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getToken } from 'utils/hash'

export function ScoringForm({ onSubmit, data, isSelected }) {
  const [points, setPoints] = useState({})
  const [point, setPoint] = useState(data?.PointPlay || 0)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...(data?.lstUni || {}),
    },
  })

  // const { control, handleSubmit, reset } = useForm({
  //   defaultValues: {
  //     PointPlay: data?.PointPlay || 0,
  //     ...(data?.CriteriaPoints || {}),
  //   },
  // })

  // const handleReset = () => {
  //   reset({
  //     PointPlay: data?.PointPlay || 0,
  //     ...(data?.CriteriaPoints || {}),
  //   })
  //   setPoints(data?.CriteriaPoints || {})
  //   setPoint(data?.PointPlay || 0)
  // }
  // useEffect(() => {
  //   reset({
  //     PointPlay: data?.PointPlay || 0,
  //     ...(data?.CriteriaPoints || {}),
  //   })
  //   setPoints(data?.CriteriaPoints || {})
  //   setPoint(data?.PointPlay || 0)
  // }, [data, reset])
  const eventIDRef = useRef(data?.EventID)
  const genresIDRef = useRef(data?.GenresID)
  const token = getToken()
  const { data: uniCriteriaList } = useCriteriaList({
    eventID: eventIDRef.current,
    genresID: genresIDRef.current,
  })

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
      const lstPoint = Object.entries(formValues).map(([CritID, Point]) => ({
        CritID: Number(CritID),
        Point: Number(Point),
      }))
      console.log('lstPoint', lstPoint)
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
      onSubmit?.(newData)
    }
  })

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  console.log('data', data)
  return (
    <Stack
      direction="row"
      alignItems="center"
      component="form"
      spacing={1}
      onSubmit={data?.IsUni === true ? handleFormSubmit : handleFormSubmit}
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
              {data?.IsUni === false ? (
                <Stack direction="row" alignItems="center">
                  <Box flexGrow={1}>
                    <SliderField
                      onChange={(value) => setPoint(value)}
                      step={0.5}
                      min={0}
                      max={100}
                      name="PointPlay"
                      control={control}
                      disabled={Boolean(data?.PointPlay)}
                    />
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        '.MuiInputBase-input': {
                          p: 1,
                        },
                      }}
                    >
                      <Typography variant="body2">SCORE</Typography>{' '}
                      <InputField
                        disabled={Boolean(data?.PointPlay)}
                        type="number"
                        size="small"
                        name="PointPlay"
                        step={0.5}
                        max={100}
                        min={0}
                        sx={{ width: 70 }}
                        control={control}
                        onChange={(value) => setPoint(value)}
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
                    {point}
                  </Typography>
                </Stack>
              ) : (
                <Stack direction="column" spacing={2} sx={{ p: 2 }}>
                  {uniCriteriaList?.data?.map((criteria) => (
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
                        name={`${criteria.CritID}`}
                        control={control}
                        // disabled={Boolean(data?.lstPoint?.[criteria.CritID])}
                      />
                      <InputField
                        // disabled={Boolean(data?.lstPoint?.[criteria.CritID])}
                        type="number"
                        size="small"
                        name={`${criteria.CritID}`}
                        step={0.5}
                        max={criteria.Point}
                        min={0}
                        sx={{ width: 110 }}
                        control={control}
                        onChange={(value) => {
                          setPoints((prev) => ({
                            ...prev,
                            [criteria.CritID]: value,
                          }))
                        }}
                      />
                    </Stack>
                  ))}
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
