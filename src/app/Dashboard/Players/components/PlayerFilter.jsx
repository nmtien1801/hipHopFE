import { SearchBox } from 'components/FormFields/SearchBox'
import { SortBox } from 'components/FormFields/SortBox'
import { Box, Button, Stack } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useTransition } from 'react'
import { useTranslation } from 'react-i18next'

export function PlayerFilter({
  params,
  onFilterChange,
  eventList = [],
  genreList = [],
  onExport,
  onCreate,
}) {
  function handleSearchChange(value) {
    onFilterChange({ ...params, key: value })
  }
  function handleChangeEventID(value) {
    onFilterChange({ ...params, eventID: value })
  }
  function handleChangeGenresID(value) {
    onFilterChange({ ...params, genresID: value })
  }
  function handleChangeTypeUserID(value) {
    onFilterChange({ ...params, TypeUserID: value })
  }
  const { t } = useTranslation()
  return (
    <Box>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="flex-end"
        sx={{ mx: -1 }}
      >
        <Box>
          <Box sx={{ p: 1 }}>
            <SearchBox onSearchChange={handleSearchChange} />
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <SortBox
            label={t('Filter by role')}
            onChange={handleChangeTypeUserID}
            defaultValue="0"
            hideOptionAll
            optionList={[
              {
                label: t('Player'),
                value: '3',
              },
              {
                label: t('Guest'),
                value: '5',
              },
              {
                label: t('All'),
                value: '0',
              },
            ]}
          />
        </Box>

        <Box sx={{ p: 1 }}>
          <SortBox
            label={t('Filter by event')}
            onChange={handleChangeEventID}
            defaultValue="0"
            hideOptionAll
            optionList={
              eventList.length > 0
                ? eventList.concat([
                    {
                      label: t('All'),
                      value: '0',
                    },
                  ])
                : []
            }
          />
        </Box>
        <Box sx={{ p: 1 }}>
          <SortBox
            label={t('Filter by genre')}
            onChange={handleChangeGenresID}
            defaultValue="0"
            hideOptionAll
            optionList={
              genreList.length > 0
                ? genreList.concat([{ label: t('All'), value: '0' }])
                : []
            }
          />
        </Box>
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="flex-end"
        sx={{ mx: -1 }}
      >
        <Box sx={{ p: 1 }}>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={() => onCreate?.()}
            color="success"
          >
            {t('Add-new')}
          </Button>
        </Box>

        <Box sx={{ p: 1 }}>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={() => onExport?.()}
          >
            {t('Export')}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}
