import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { InsertModuleForm } from './InsertModuleForm'

export function InsertUserTypeModule({
  userModuleList,
  moduleAccessList,
  onModuleChange,
  loading,
}) {
  const rows = moduleAccessList?.map((item, idx) => ({
    ...item,
    key: idx + 1,
  }))

  function handleSubmit(formValues) {
    onModuleChange(formValues)
  }

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
    },
    {
      field: 'Name',
      headerName: 'Tên module',
      minWidth: 200,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },
    {
      field: 'actions',
      headerName: 'Quyền',
      minWidth: 200,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        const data = userModuleList?.find(
          (item) => item.ModuleID === row.ModuleID,
        )

        return (
          <InsertModuleForm
            data={data}
            onSubmit={(formValues) =>
              handleSubmit({ ...formValues, ModuleID: row.ModuleID })
            }
          />
        )
      },
    },
  ]

  //   function handlePaginationModelChange({ page, pageSize }) {
  //     onFilterChange?.({
  //       ...params,
  //       page: page + 1,
  //       limit: pageSize,
  //     })
  //   }

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
        columns={columns}
        pagination={true}
        disableRowSelectionOnClick
        paginationMode="client"
        paginationModel={{
          page: 0,
          pageSize: 100,
        }}
        disableColumnSelector
      />
    </Paper>
  )
}
