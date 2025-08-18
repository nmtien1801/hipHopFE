import { Box, Stack, Typography } from '@mui/material'

export function ScoringForm({ data, isSelected }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} noValidate>
      <Stack
        direction="row"
        alignItems="center"
        boxShadow={1}
        sx={{
          flexGrow: 1,
          height: 90,
          borderRadius: '4px',

          bgcolor:
            isSelected || data?.StatusPoint === 1 ? '#001119' : '#004a6d',
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
              {data?.FullName}{' '}
              {data && Math.ceil(data.AmountPay) === 0 && '(Khách mời)'}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
