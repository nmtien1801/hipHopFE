import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
    alpha,
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    Tooltip,
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
                return (
                    parseInt(params?.limit) * (parseInt(params?.page) - 1) +
                    row.key
                )
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
                            <Typography fontWeight={600}>
                                {row?.UserName}
                            </Typography>
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
            width: 250,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'header',
        },
        {
            field: 'PhoneNumber',
            headerName: t('phone'),
            flex: 1,

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
                        label={
                            row.TypeUserID === 1
                                ? t('Admin')
                                : row.TypeUserID === 2
                                ? t('Judge')
                                : row.TypeUserID === 5
                                ? t('Guest')
                                : 'MC'
                        }
                        variant="filled"
                        sx={{
                            borderRadius: '4px',
                            fontWeight: 600,
                            backgroundColor: (theme) =>
                                row.TypeUserID === 1
                                    ? alpha(theme.palette.error.main, 0.2)
                                    : row.TypeUserID === 2
                                    ? alpha(theme.palette.info.main, 0.2)
                                    : row.TypeUserID === 5
                                    ? alpha(theme.palette.success.main, 0.2)
                                    : alpha(theme.palette.warning.main, 0.2),
                            color: (theme) =>
                                row.TypeUserID === 1
                                    ? alpha(theme.palette.error.main, 1)
                                    : row.TypeUserID === 2
                                    ? alpha(theme.palette.info.main, 1)
                                    : row.TypeUserID === 5
                                    ? alpha(theme.palette.success.main, 1)
                                    : alpha(theme.palette.warning.main, 1),
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
            width: 100,
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
            headerName: t('action'),
            width: 150,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'header',
            renderCell: ({ row }) => {
                return (
                    <>
                        {row.TypeUserID === 5 && (
                            <GridActionsCellItem
                                icon={
                                    <Tooltip title="Thêm khách mời vào Event">
                                        <AddCircleIcon />
                                    </Tooltip>
                                }
                                label="Add genre"
                                color="warning"
                                onClick={() => onAddEventAndGenre?.(row.UserID)}
                            />
                        )}

                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            color="success"
                            onClick={() => onEdit?.(row.UserID)}
                        />

                        {row.TypeUserID === 5 && (
                            <GridActionsCellItem
                                icon={
                                    <Tooltip title="Xóa khách mời khỏi Event">
                                        <DeleteIcon />
                                    </Tooltip>
                                }
                                label="Add genre"
                                color="warning"
                                onClick={() => onRemoveOutEvent?.(row.UserID)}
                            />
                        )}
                        {row.UserID !== 1 && row.TypeUserID !== 5 && (
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Remove"
                                color="error"
                                onClick={() => onRemove?.(row.UserID)}
                            />
                        )}
                    </>
                )
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
