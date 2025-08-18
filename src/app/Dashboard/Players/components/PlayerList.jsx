import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PaymentIcon from '@mui/icons-material/Payment'
import {
  alpha,
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Loading } from 'components/Common/Loading'
import { useTranslation } from 'react-i18next'

export function PlayerList({
  data,
  loading,
  params,
  total,
  onFilterChange,
  onPayment,
  onStatusChange,
  onEditClick,
  disabled,
  onRemove,
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
              <Typography sx={{ color: 'grey.500' }}>
                {row?.FullName}
              </Typography>
            </Box>
          </Stack>
        )
      },
    },

    {
      field: 'UserID',
      headerName: 'ID',
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },

    {
      field: 'EventName',
      headerName: t('Events'),
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },
    {
      field: 'GenresName',
      headerName: t('Genres'),
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
    },

    {
      field: 'TypePayment',
      headerName: t('payment_type'),
      flex: 1,
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
            label={row.TypePayment === 1 ? 'Chuyển Khoản' : 'Tiền mặt'}
            color={row.TypePayment === 1 ? 'info' : 'warning'}
            variant="filled"
            sx={{
              borderRadius: '4px',
              fontWeight: 600,
              backgroundColor: (theme) => alpha(theme.palette.info.main, 0.2),
              color: (theme) => alpha(theme.palette.info.main, 1),
            }}
          />
        )
      },
    },

    {
      field: 'StatusPaymentID',
      headerName: t('payment_status'),
      flex: 1,
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
            label={row.StatusPaymentID === 1 ? 'Yes' : 'No'}
            color={row.StatusPaymentID === 1 ? 'info' : 'error'}
            variant="filled"
            sx={{
              borderRadius: '4px',
              fontWeight: 600,
              backgroundColor: (theme) =>
                row.StatusPaymentID === 1
                  ? alpha(theme.palette.success.main, 0.2)
                  : alpha(theme.palette.error.main, 0.2),
              color: (theme) =>
                row.StatusPaymentID === 1
                  ? alpha(theme.palette.success.main, 1)
                  : alpha(theme.palette.error.main, 1),
            }}
          />
        )
      },
    },
    {
      field: 'TypeUserID',
      headerName: t('role'),
      flex: 1,

      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      renderCell: ({ row }) => {
        const isVip = row?.TypeUserID === 5

        if (isVip) {
          return (
            <Chip
              size="small"
              label={t('Guest')}
              color="success"
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
        }
        return (
          <Chip
            size="small"
            label={t('Player')}
            color="success"
            variant="filled"
            sx={{
              borderRadius: '4px',
              fontWeight: 600,
              backgroundColor: (theme) =>
                alpha(theme.palette.secondary.main, 0.2),
              color: (theme) => alpha(theme.palette.secondary.main, 1),
            }}
          />
        )
      },
    },

    {
      field: 'Action',
      headerName: t('action'),
      minWidth: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
        return (
          <>
            <GridActionsCellItem
              disabled={disabled || row.StatusPaymentID === 1} //  row.AmountGenre <= row.AmountPay
              icon={
                <Tooltip title="Payment" arrow>
                  <PaymentIcon />
                </Tooltip>
              }
              label="Payment"
              color="success"
              onClick={() => onPayment?.(row)}
            />

            <Tooltip title="Roll call" arrow>
              <Switch
                checked={row.StatusID === 1}
                disabled={
                  disabled || row.StatusID === 1 || row.StatusPaymentID === 0
                }
                color="success"
                onChange={() => onStatusChange?.(row)}
              />
            </Tooltip>

            <GridActionsCellItem
              disabled={disabled}
              icon={
                <Tooltip title="Payment" arrow>
                  <EditIcon />
                </Tooltip>
              }
              label="Payment"
              color="success"
              onClick={() => onEditClick?.(row?.UserID)}
            />

            <GridActionsCellItem
              disabled={disabled}
              icon={
                <Tooltip title="Payment" arrow>
                  <DeleteIcon />
                </Tooltip>
              }
              label="Payment"
              color="error"
              onClick={() => onRemove?.(row)}
            />
          </>
        )
      },
    },
  ]

  function handlePaginationModelChange({ page, pageSize }) {
    const newParams = {
      ...params,
      page: page + 1,
      limit: pageSize,
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
          rowHeight={70}
          columns={columns}
          pagination={true}
          pageSizeOptions={[5, 10, 15, 25, 50, 100]}
          paginationMode="server"
          rowCount={total}
          paginationModel={{
            page: params?.page - 1,
            pageSize: params?.limit,
          }}
          disableColumnSelector
          disableRowSelectionOnClick
          onPaginationModelChange={handlePaginationModelChange}
        />
      )}
    </Paper>
  )
}
