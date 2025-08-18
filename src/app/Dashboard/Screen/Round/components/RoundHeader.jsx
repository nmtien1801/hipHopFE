import { Box, Stack, Typography } from '@mui/material'
import header_bg from 'assets/images/header-bg-1.png'
import { Flag } from 'components/Common/Flag'
import { primaryLogo } from 'constants/common'

export function RoundHeader({ data, genresName }) {
  return (
    <Stack py={3} direction="row" justifyContent="space-between">
      <Box sx={{ color: 'white', width: 1 / 5 }}>
        <Typography color="inherit">
          <Box component="span" sx={{ color: 'warning.main' }}>
            KNOCKOUT
          </Box>
          /<Box component="span">{genresName}</Box>
        </Typography>
      </Box>

      <Box sx={{ width: 1 / 2 }}>
        <Stack
          direction="row"
          alignContent="center"
          justifyContent="center"
          spacing={3}
          sx={{ mb: -3 }}
        >
          <Box>
            <Flag sx={{ width: 55 }} code={data.Flag} />
          </Box>
          <Box>
            <Flag sx={{ width: 55 }} code={data.Flag_1} />
          </Box>
        </Stack>

        <Stack
          position="relative"
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          zIndex={1}
          sx={{
            width: '100%',
            backgroundImage: `url(${header_bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            aspectRatio: '860/191',
          }}
        >
          <Box sx={{ width: 1 / 3 }}>
            <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              color="white"
            >
              {data.FullName}
            </Typography>
          </Box>
          <Box sx={{ width: 1 / 3 }}>
            <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              color="white"
            >
              {data.FullName_1}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          spacing={1.5}
          sx={{
            position: 'relative',
            mt: -6,
            zIndex: 1,
          }}
        >
          <Stack
            boxShadow={3}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 1 / 8,
              aspectRatio: '3/2',
              bgcolor: 'white',
              borderRadius: '4px',
            }}
          >
            <Typography variant="h2" fontWeight={700} color="primary">
              {data.Core}
            </Typography>
          </Stack>

          <Stack sx={{ width: 3 / 10 }}></Stack>

          <Stack
            boxShadow={3}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 1 / 8,
              aspectRatio: '3/2',
              bgcolor: 'white',
              borderRadius: '4px',
            }}
          >
            <Typography variant="h2" fontWeight={700} color="error">
              {data.Core_1}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ width: 1 / 5 }}>
        <Box sx={{ width: '40%', ml: 'auto' }}>
          <Box width="100%" component="img" alt="logo" src={primaryLogo} />
        </Box>
      </Box>
    </Stack>
  )
}
