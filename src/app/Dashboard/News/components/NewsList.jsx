import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Loading } from 'components/Common/Loading'
import { useTranslation } from 'react-i18next'

export function NewsList({
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
      field: 'ImagesPaths',
      headerName: t('Image'),
      width: 160,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: '100%', height: '100%' }}
            spacing={2}
          >
            <Box
              sx={{
                width: 160,
                overflow: 'hidden',
                aspectRatio: '16/9',
              }}
            >
              <Box
                component="img"
                alt={row.Title}
                src={row.ImagesPaths}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  aspectRatio: '16/9',
                }}
              />
            </Box>
          </Stack>
        )
      },
    },
    {
      field: 'Title',
      headerName: t('title'),
      width: 250,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: '100%', height: '100%' }}
            spacing={2}
          >
            <Typography
              variant="body2"
              maxWidth={250}
              fontWeight={600}
              whiteSpace="wrap"
            >
              {row.Title}
            </Typography>
          </Stack>
        )
      },
    },

    {
      field: 'LanguagesID',
      headerName: t('language'),
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
        return row.LanguagesID === 'vi-VN' ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%' }}
          >
            <Box
              component="img"
              sx={{
                width: 32,
                objectFit: 'cover',
                aspectRatio: '26/20',
              }}
              src={`https://flagpedia.net/data/flags/w702/vn.webp`}
              alt="vi"
            />
          </Stack>
        ) : (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Box
              component="img"
              sx={{
                width: 32,
                objectFit: 'cover',
                aspectRatio: '26/20',
              }}
              src={`https://flagpedia.net/data/flags/w702/gb.webp`}
              alt="gb"
            />
          </Stack>
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

      renderCell: ({ row }) => {
        return row.StatusID === 1 ? (
          <Chip
            sx={{ borderRadius: '4px' }}
            size="small"
            label="Active"
            color="success"
            variant="filled"
          />
        ) : (
          <Chip
            sx={{ borderRadius: '4px' }}
            size="small"
            label="Inactive"
            color="error"
          />
        )
      },
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
              disabled={!isUpdate}
              icon={<EditIcon />}
              label="Edit"
              color="success"
              onClick={() => onEdit?.(row.NewsID)}
            />
            <GridActionsCellItem
              disabled={!isDelete}
              icon={<DeleteIcon />}
              label="Remove"
              color="error"
              onClick={() => onRemove?.(row.NewsID, row.Title)}
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
      )}
    </Paper>
  )
}
