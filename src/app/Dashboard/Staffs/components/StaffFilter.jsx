import { SearchBox } from 'components/FormFields/SearchBox'
import { SortBox } from 'components/FormFields/SortBox'
import { Box, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

StaffFilter.propTypes = {
  params: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export function StaffFilter({ params, onFilterChange }) {
  const { t } = useTranslation()
  function handleSearchChange(value) {
    onFilterChange({ ...params, key: value })
  }

  function handleChangeUserType(value) {
    onFilterChange({ ...params, typeUserID: parseInt(value) })
  }
  function handleChangeStatus(value) {
    onFilterChange({ ...params, statusID: parseInt(value) })
  }
  return (
    <Stack direction="row" justifyContent="flex-end" sx={{ mx: -1 }}>
      <Box>
        <Box sx={{ p: 1 }}>
          <SearchBox onSearchChange={handleSearchChange} />
        </Box>
      </Box>
      <Box>
        <Box sx={{ p: 1 }}>
          <SortBox
            onChange={handleChangeStatus}
            defaultValue={parseInt(params?.statusID) || 'all'}
            optionList={[
              {
                label: t('Active'),
                value: '1',
              },
              {
                label: t('Not active'),
                value: '0',
              },
            ]}
          />
        </Box>
      </Box>
      <Box>
        <Box sx={{ p: 1 }}>
          <SortBox
            onChange={handleChangeUserType}
            defaultValue={parseInt(params?.typeUserID) || 'all'}
            optionList={[
              {
                label: 'Admin',
                value: '1',
              },
              {
                label: 'Judge',
                value: '2',
              },
              {
                label: 'MC',
                value: '4',
              },
              {
                label: 'Guest',
                value: '5',
              },
            ]}
          />
        </Box>
      </Box>
    </Stack>
  )
}
