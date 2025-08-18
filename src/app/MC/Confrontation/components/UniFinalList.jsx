import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { UniScoringForm } from './UniScoringForm'
import { useSelector } from 'react-redux'
import { usePlayerByRegistergenreID } from 'hooks/Player/usePlayerByRegistergenre'
import { useRanking } from 'hooks/Player/useRanking'

UniFinalList.propTypes = {
  data: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
}

export function UniFinalList({ data, onSubmit, onClick, judgeID, athletic }) {
  const registerIDs = data?.lstUni?.map((item) => item.RegisterPlayGenresID)

  const filteredItems = data?.lstUni?.filter((item) =>
    registerIDs.includes(item.RegisterPlayGenresID),
  )
  console.log('filteredItems', filteredItems)
  return (
    <Stack spacing={2}>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((item, idx) => (
          <Box key={idx} onClick={() => onClick?.(item)}>
            <UniScoringForm
              data={{ ...item, idx: idx + 1 }}
              onSubmit={(formValues) => onSubmit?.(formValues)}
            />
          </Box>
        ))}
    </Stack>
  )
}
