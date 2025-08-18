import PlusOneIcon from '@mui/icons-material/PlusOne'
import { Avatar, Box, Chip, Stack, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Loading } from 'components/Common/Loading'
import { useTranslation } from 'react-i18next'

/**
 * @function CoupleList
 * @description Component to display a list of Couple.
 * @param {object} data - List of Couple.
 * @param {boolean} loading - Is loading or not.
 * @param {object} params - pagination params.
 * @param {function} onFilterChange - Function to filter change.
 * @param {function} onAddRound - Function to add round.
 * @param {function} onEndPlayRound - Function to end play round.
 * @returns {ReactElement} - A React element of a list of Couple.
 */
export function CoupleList({
    data,
    loading,
    params,
    onFilterChange,
    onAddRound,
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
        },

        {
            field: 'NamePlayer1',
            headerName: t('player_1'),
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'header',
            renderCell: ({ row }) => (
                <Stack
                    height="100%"
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Box
                        component="img"
                        sx={{
                            width: 32,
                            objectFit: 'cover',
                            aspectRatio: '26/20',
                        }}
                        src={`https://flagpedia.net/data/flags/w702/${row.FlagPlayer1.toLowerCase()}.webp`}
                        alt={row.FlagPlayer1}
                    />
                    <Avatar
                        src={row.Avarta1}
                        alt={row.NamePlayer1}
                        width={50}
                        height={50}
                    />
                    <Typography fontWeight={600}>{row.NamePlayer1}</Typography>
                </Stack>
            ),
        },

        {
            field: 'NamePlayer2',
            headerName: t('player_2'),
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'header',
            renderCell: ({ row }) => (
                <Stack
                    height="100%"
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Box
                        component="img"
                        sx={{
                            width: 32,
                            objectFit: 'cover',
                            aspectRatio: '26/20',
                        }}
                        src={`https://flagpedia.net/data/flags/w702/${row.FlagPlayer2.toLowerCase()}.webp`}
                        alt={row.FlagPlayer2}
                    />
                    <Avatar
                        src={row.Avarta2}
                        alt={row.NamePlayer2}
                        width={50}
                        height={50}
                    />
                    <Typography fontWeight={600}>{row.NamePlayer2}</Typography>
                </Stack>
            ),
        },
        {
            field: 'NumberRound',
            headerName: t('confrontation'),
            width: 100,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: 'header',
            headerAlign: 'center',
            align: 'center',
        },

        {
            field: 'IsWin',
            headerName: t('winner'),
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header',
            renderCell: ({ row }) => {
                return row.IsWin === 1 ? (
                    <Chip
                        sx={{ borderRadius: '4px' }}
                        size="small"
                        label={row.NamePlayer1}
                        color="primary"
                    />
                ) : row.IsWin === 2 ? (
                    <Chip
                        sx={{ borderRadius: '4px' }}
                        size="small"
                        label={row.NamePlayer2}
                        color="error"
                    />
                ) : (
                    <Chip
                        sx={{ borderRadius: '4px' }}
                        size="small"
                        label="Unknown"
                        color="secondary"
                    />
                )
            },
        },
        {
            field: 'Action',
            headerName: t('action'),
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
                            onClick={() => onAddRound?.(row.CoupleID)}
                            icon={
                                <Tooltip title="Insert 1 round" arrow>
                                    <PlusOneIcon />
                                </Tooltip>
                            }
                            label="Edit"
                            color="success"
                            disabled={row.IsWin !== 0}
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
        <Box
            sx={{
                height: '100%',

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
                    autoHeight
                    columns={columns}
                    pagination={true}
                    pageSizeOptions={[4, 8, 16]}
                    disableRowSelectionOnClick
                    paginationModel={{
                        page: params?.page - 1,
                        pageSize: params?.limit,
                    }}
                    onPaginationModelChange={handlePaginationModelChange}
                    disableColumnSelector
                />
            )}
        </Box>
    )
}
