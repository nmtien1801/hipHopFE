import { Box, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

RankingList.propTypes = {
  data: PropTypes.array.isRequired,
}
export function RankingList({ data = [] }) {
  const rows =
    Array.isArray(data) &&
    data.length > 0 &&
    data.map((item, idx) => ({
      ...item,
      key: idx + 1,
    }))

  console.log('rows', rows)
  const columns = [
    {
      field: 'key',
      headerName: 'NO.',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent="center" height="100%">
            <Typography variant="h5" fontWeight={600}>
              {row.key}
            </Typography>
          </Stack>
        )
      },
    },
    {
      field: 'Flag',
      headerName: 'Flag',
      width: 100,
      headerAlign: 'center',
      align: 'center',

      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Stack alignItems="center" justifyContent="center" height="100%">
            <Box
              component="img"
              sx={{
                width: 60,
                aspectRatio: '26/20',
              }}
              src={`https://flagpedia.net/data/flags/w702/${row?.Flag?.toLowerCase()}.webp`}
              alt="vn"
            />
          </Stack>
        )
      },
    },
    {
      field: 'FullName',
      headerName: 'Athlete',
      flex: 1,

      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent="center" height="100%">
            <Typography variant="h5" fontWeight={600}>
              {row.FullName}
            </Typography>
          </Stack>
        )
      },
    },
    {
      field: 'PointPlayTotal',
      headerName: 'Score',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',

      renderCell: ({ row }) => {
        return (
          <Stack alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h5" fontWeight={600}>
              {row.PointPlayTotal}
            </Typography>
          </Stack>
        )
      },
    },
  ]
  return (
    <Box
      sx={{
        '.header': {
          backgroundColor: '#004a6d',
          color: 'white',
          '*': {
            fontWeight: 700,
            textTransform: 'uppercase',
          },
        },

        '.MuiDataGrid-root .MuiDataGrid-virtualScrollerContent ': {
          '.MuiDataGrid-row:nth-of-type(2n)': {
            bgcolor: 'white',
          },
          '.MuiDataGrid-row:nth-of-type(2n+1)': {
            bgcolor: '#00aeff',
          },
        },

        '.MuiDataGrid-root .MuiDataGrid-cell': {
          border: '0px',
        },
      }}
    >
      <DataGrid
        rows={rows || []}
        getRowId={(row) => row?.key}
        autoHeight
        columns={columns}
        disableRowSelectionOnClick
        disableColumnSelector
        hideFooter
      />
    </Box>
  )
}
