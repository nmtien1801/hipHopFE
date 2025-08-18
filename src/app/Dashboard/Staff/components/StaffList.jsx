import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  alpha,
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

export function StaffList({
  data,
  loading,
  params,
  total,
  onRemove,
  onEdit,
  onAddEventAndGenre,
  onFilterChange,
  onRemoveOutEvent,
}) {
  const { t } = useTranslation()
  const rows = data?.map((item, idx) => ({
    ...item,
    key: idx + 1,
  }))

  const columns = [
    {
      field: 'key',
      headerName: '#',
      width: 50,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return parseInt(params?.limit) * (parseInt(params?.page) - 1) + row.key
      },
    },

    {
      field: 'ImagesPaths',
      headerName: t('Image'),
      flex: 1,
      minWidth: 250,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ height: '100%' }}
            spacing={1.5}
          >
            <Avatar
              sx={{ width: 60, height: 60 }}
              src={row?.ImagesPaths}
              alt={row?.UserName}
            />
            <Box>
              <Typography fontWeight={600}>{row?.UserName}</Typography>
              <Typography variant="body2" color="GrayText">
                {row?.Email}
              </Typography>
            </Box>
          </Stack>
        )
      },
    },
    {
      field: 'FullName',
      headerName: t('name'),
      minWidth: 200,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },
    {
      field: 'PhoneNumber',
      headerName: t('phone'),
      flex: 1,
      minWidth: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return `(${row?.PhoneCode})  ${row?.PhoneNumber}`
      },
    },

    {
      field: 'TypeUserID',
      headerName: t('role'),
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Chip
            size="small"
            label={t('staffs')}
            variant="filled"
            sx={{
              borderRadius: '4px',
              fontWeight: 600,
              backgroundColor: (theme) =>
                alpha(theme.palette.warning.main, 0.2),
              color: (theme) => alpha(theme.palette.warning.main, 1),
            }}
          />
        )
      },
    },
    {
      field: 'StatusID',
      headerName: t('status'),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      flex: 1,
      minWidth: 100,
      renderCell: ({ row }) => {
        return (
          <Chip
            sx={{ borderRadius: '4px' }}
            size="small"
            label={row.StatusID === 1 ? 'Active' : 'Inactive'}
            color={row.StatusID === 1 ? 'success' : 'error'}
            variant="filled"
          />
        )
      },
    },
    {
      field: 'Action',
      type: 'actions',
      headerName: t('action'),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            color="success"
            onClick={() => onEdit?.(row.UserID)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Remove"
            color="error"
            onClick={() => onRemove?.(row.UserID)}
          />,
        ]
      },
    },
  ]

  function handlePaginationModelChange({ page, pageSize }) {
    onFilterChange?.({
      ...params,
      page: page + 1,
      limit: pageSize,
    })
  }

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        px: 2,
        '.MuiDataGrid-root': {
          height: '100%',
          border: 'none',
        },
        '.header': {
          // bgcolor: 'grey.300',

          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows || []}
        getRowId={(row) => row?.key}
        rowHeight={90}
        columns={columns}
        pagination={true}
        pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={total || 0}
        paginationModel={{
          page: params?.page - 1 || 0,
          pageSize: params?.limit || 5,
        }}
        onRowModesModelChange={(row) => console.log('row: ', row)}
        onPaginationModelChange={handlePaginationModelChange}
        disableColumnSelector
      />
    </Paper>
  )
}
