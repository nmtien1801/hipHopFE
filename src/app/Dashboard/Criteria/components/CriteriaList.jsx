import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Loading } from 'components/Common/Loading'
import { useTranslation } from 'react-i18next'

export function CriteriaList({
  data,
  loading,
  params,
  total,
  onRemove,
  onEdit,
  onFilterChange,
  isUpdate,
  isDelete,
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
      field: 'CriteriaName',
      headerName: t('Criteria Name'),
      width: 250,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },
    {
      field: 'StatusID',
      headerName: t('Status'),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      flex: 1,
      renderCell: ({ row }) => {
        return row.StatusID === 1 ? (
          <Chip label="Active" color="success" variant="filled" />
        ) : (
          <Chip label="Inactive" color="error" />
        )
      },
    },
    {
      field: 'Action',
      headerName: t('Actions'),
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
              disabled={!isUpdate}
              icon={<EditIcon />}
              label="Edit"
              color="success"
              onClick={() => onEdit?.(row.CriteriaID)}
            />
            <GridActionsCellItem
              disabled={!isDelete}
              icon={<DeleteIcon />}
              label="Remove"
              color="error"
              onClick={() => onRemove?.(row.CriteriaID, row.CriteriaName)}
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
    <Paper elevation={3} sx={{ height: '100%', px: 2 }}>
      {loading ? (
        <Loading />
      ) : (
        <DataGrid
          loading={loading}
          rows={rows || []}
          getRowId={(row) => row?.key}
          rowHeight={60}
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
          onPaginationModelChange={handlePaginationModelChange}
          disableColumnSelector
        />
      )}
    </Paper>
  )
}
