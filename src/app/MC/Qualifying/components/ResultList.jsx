import { Box, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

ResultList.propTypes = {
    data: PropTypes.array.isRequired,
}
export function ResultList({ data = [] }) {
    const rows = data?.map((item, idx) => ({
        ...item,
        key: idx + 1,
    }))

    const columns = [
        {
            field: 'key',
            headerName: '#',
            width: 100,
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
            field: 'FullName',
            headerName: 'Judge Name',
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
            field: 'PointPlay',
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
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ color: '#ff7878' }}
                        >
                            {row.PointPlay}
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
                    backgroundColor: '#e7e7e7',
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
                        bgcolor: '#e8f8ff ',
                    },
                },

                '.MuiDataGrid-root .MuiDataGrid-cell': {
                    border: '1px solid #e7e7e7',
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
