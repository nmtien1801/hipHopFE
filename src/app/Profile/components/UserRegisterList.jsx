import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

UserRegisterList.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    params: PropTypes.object,
    pagination: PropTypes.object,
    onPaginationModelChange: PropTypes.func,
}

export function UserRegisterList({ params, pagination, data, loading, onPaginationModelChange }) {
    const rows = data?.map((item, idx) => ({
        ...item,
        key: idx,
    }))

    const columns = [
        {
            field: 'key',
            headerName: '#',
            width: 50,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: ({ row }) => {
                return parseInt(params?.limit) * (parseInt(params?.page) - 1) + row.key
            },
        },
        {
            field: 'FullName',
            headerName: 'Name',
            flex: 1,
            sortable: false,
            filterable: false,
        },
        {
            field: 'EventName',
            headerName: 'Event',
            flex: 1,
            sortable: false,
            filterable: false,
        },
        {
            field: 'GenresName',
            headerName: 'Genres',
            flex: 1,
            sortable: false,
            filterable: false,
        },
    ]

    function handlePaginationModelChange(model) {
        const newParams = {
            ...params,
            page: model.page + 1,
            limit: model.pageSize,
        }

        onPaginationModelChange?.(newParams)
    }

    return (
        <Box>
            <DataGrid
                loading={loading}
                rows={rows || []}
                getRowId={(row) => row?.key}
                columns={columns}
                pagination={true}
                pageSizeOptions={[5, 10, 15, 25, 50, 100]}
                disableRowSelectionOnClick
                paginationMode="server"
                rowCount={pagination?.total || 0}
                paginationModel={{
                    page: params?.page - 1 || 0,
                    pageSize: params?.limit || 5,
                }}
                onRowModesModelChange={(row) => console.log('row: ', row)}
                onPaginationModelChange={handlePaginationModelChange}
                disableColumnSelector
            />
        </Box>
    )
}
