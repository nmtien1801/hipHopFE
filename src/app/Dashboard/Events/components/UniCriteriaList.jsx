import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Loading } from 'components/Common/Loading'
import { useTranslation } from 'react-i18next'

export function UniCriteriaList({
  data,
  loading,
  params,
  total,
  onRemove,
  onEdit,
  onFilterChange,
}) {
  const { t } = useTranslation()
  const rows = data?.map((item, idx) => ({
    ...item,
    key: idx + 1,
  }))
  const columns = [
    {
      field: 'key',
      headerName: 'STT',
      width: 80,
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
    // {
    //   field: 'Order',
    //   headerName: t('Order'),
    //   width: 100,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   headerClassName: 'header',
    //   headerAlign: 'center',
    //   align: 'center',
    // },
    {
      field: 'CritName',
      headerName: t('CritName'),
      width: 300,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },

    {
      field: 'Point',
      headerName: t('Point'),
      width: 150,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'Action',
      headerName: t('actions'),
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              color="success"
              onClick={() => onEdit?.(row)}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Remove"
              color="error"
              onClick={() => onRemove?.(row.CritID)}
            />
          </>
        )
      },
    },
  ]

  function handlePaginationModelChange(model) {
    const newParams = {
      ...params,
      page: model.page + 1,
      limit: model.pageSize,
    }
    onFilterChange?.(newParams)
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
      {loading ? (
        <Loading />
      ) : (
        <DataGrid
          loading={loading}
          rows={rows || []}
          getRowId={(row) => row?.key}
          rowHeight={130}
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
      )}
    </Paper>
  )
}
