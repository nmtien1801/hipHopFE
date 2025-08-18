import { LoadingButton } from '@mui/lab'
import { Box, Stack } from '@mui/material'

export const CriteriaFilter = ({ loading, onCreate, dataUni }) => {
  const isDataUniExist = dataUni && dataUni.length > 0

  return (
    <Stack direction="row" sx={{ mx: -1 }}>
      <Box sx={{ px: 1, py: { xs: 1, md: 2 } }}>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="success"
          onClick={() => onCreate?.()}
          sx={{ textTransform: 'none' }}
          disabled={isDataUniExist}
        >
          Thêm mới
        </LoadingButton>
      </Box>
    </Stack>
  )
}
