import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { ScoringForm } from './ScoringForm'

PlayerList.propTypes = {
  data: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
}

export function PlayerList({ data, onSubmit, onClick, athletic, judgeID }) {
  return (
    <Stack spacing={2}>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((item, idx) => (
          <Box key={idx} onClick={() => onClick?.(item)}>
            <ScoringForm
              data={{ ...item, idx: idx + 1 }}
              onSubmit={(formValues) => onSubmit?.(formValues)}
              isSelected={athletic?.RegisterPlayID === item.RegisterPlayID}
              judgeID={judgeID}
            />
          </Box>
        ))}
    </Stack>
  )
}
