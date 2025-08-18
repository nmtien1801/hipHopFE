import { Box, Stack } from '@mui/material'
import logo from 'assets/images/logo.png'
export function Welcome() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      sx={{ bgcolor: 'black' }}
    >
      <Box component="img" maxWidth={250} alt="logo" src={logo} />
    </Stack>
  )
}
