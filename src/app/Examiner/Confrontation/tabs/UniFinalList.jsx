import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { UniScoringForm } from '../components/UniScoringForm'

UniFinalList1.propTypes = {
  data: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
}

export function UniFinalList1({ data, onSubmit, onClick, athletic }) {
  const filteredData = Array.isArray(data)
    ? data.filter((item) => item.IsChose === 1)
    : []

  return (
    <Stack spacing={2}>
      {Array.isArray(filteredData) &&
        filteredData.length > 0 &&
        filteredData.map((item, idx) => (
          <Box key={idx} onClick={() => onClick?.(item)}>
            <UniScoringForm
              data={{ ...item, idx: idx + 1 }}
              onSubmit={(formValues) => onSubmit?.(formValues)}
              // isSelected={athletic?.RegisterPlayID === item.RegisterPlayID}
            />
          </Box>
        ))}
    </Stack>
  )
}
