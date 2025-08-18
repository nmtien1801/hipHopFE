import { Box, Stack, Typography } from '@mui/material'

export const languageList = [
  {
    label: 'Vietnamese',
    value: 'vi-VN',
    flag: 'VN',
  },
  {
    label: 'English',
    value: 'en-US',
    flag: 'US',
  },
  {
    label: 'Japanese',
    value: 'ja-JP',
    flag: 'JP',
  },
]

export const languageOptions = [
  {
    value: 'vi-VN',
    label: (
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Box
          component="img"
          sx={{
            width: 32,
            objectFit: 'cover',
            aspectRatio: '26/20',
          }}
          src={`https://flagpedia.net/data/flags/w702/vn.webp`}
          alt="vn"
        />
        <Typography>Vietnamese</Typography>
      </Stack>
    ),
  },
  {
    value: 'en-US',
    label: (
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Box
          component="img"
          sx={{
            width: 32,
            objectFit: 'cover',
            aspectRatio: '26/20',
          }}
          src={`https://flagpedia.net/data/flags/w702/gb.webp`}
          alt="gb"
        />
        <Typography>English</Typography>
      </Stack>
    ),
  },
]
