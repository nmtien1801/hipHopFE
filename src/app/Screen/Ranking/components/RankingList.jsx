/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

RankingList.propTypes = {
  data: PropTypes.array.isRequired,
}

export function RankingList({ data }) {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  })

  const { lstExamier: examinerList, lstUserPlayResult: playerResultList } =
    data[0]

  function handlePaginationModelChange(model) {
    const newParams = {
      page: model.page + 1,
      pageSize: model.pageSize,
    }

    setParams(newParams)
  }

  const rows =
    Array.isArray(playerResultList) &&
    playerResultList.length > 0 &&
    playerResultList.map((item, idx) => ({
      ...item,
      key: idx + 1,
    }))
  const totalPages = Math.ceil(rows.length / params.pageSize)

  useEffect(() => {
    const interval = setInterval(() => {
      setParams((prevParams) => {
        const nextPage = prevParams.page < totalPages ? prevParams.page + 1 : 1
        return { ...prevParams, page: nextPage }
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [totalPages])
  const columns = [
    ...[
      {
        field: 'key',
        headerName: 'NO.',
        width: 50,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        // disableColumnSelector: true,
        disableColumnMenu: true,
        headerClassName: 'header',
        renderCell: ({ row }) => {
          return (
            <Stack justifyContent="center" height="100%">
              <Typography>{row.key < 10 ? `0${row.key}` : row.key}</Typography>
            </Stack>
          )
        },
      },
      {
        field: 'Flag',
        headerName: 'Flag',
        width: 100,
        headerAlign: 'center',
        align: 'center',

        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerClassName: 'header',
        renderCell: ({ row }) => {
          return (
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Box
                component="img"
                sx={{
                  width: 60,
                  aspectRatio: '80/53',
                }}
                src={`https://flagpedia.net/data/flags/w702/${row.Flag.toLowerCase()}.webp`}
                alt="vn"
              />
            </Stack>
          )
        },
      },
      {
        field: 'UserName',
        headerName: 'Athlete',
        width: 200,

        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerClassName: 'header',
        renderCell: ({ row }) => {
          return (
            <Stack justifyContent="center" height="100%">
              <Typography fontWeight={600} textTransform="uppercase">
                {row.UserName}
              </Typography>
            </Stack>
          )
        },
      },
    ],

    ...examinerList.map((examiner) => ({
      field: examiner.ExamierName,
      headerName: examiner.ExamierName,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => {
        const result = row.lstExmierPoint.find(
          (item) => item.ExamierID === examiner.ExamierID,
        )

        return (
          <Stack justifyContent="center" alignItems="center" height="100%">
            <Typography fontWeight={600} textTransform="uppercase">
              {result?.Point}
            </Typography>
          </Stack>
        )
      },
    })),

    ...[
      {
        field: 'TotalPoint',
        headerName: 'Total Score',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        headerClassName: 'header',

        renderCell: ({ row }) => {
          return (
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Typography variant="h5" fontWeight={600}>
                {row?.TotalPoint}
              </Typography>
            </Stack>
          )
        },
      },
    ],
  ]
  return (
    <Box
      boxShadow={3}
      sx={{
        '*': {
          border: 0,
          borderRadius: '0px !important',
        },
        '.header': {
          backgroundColor: '#004a6d',
          color: 'white',
          '*': {
            fontWeight: 700,
            textTransform: 'uppercase',
          },

          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        },

        '.MuiDataGrid-root': {
          border: '10px solid #003750',
        },

        '.MuiDataGrid-root .MuiDataGrid-virtualScrollerContent ': {
          '.MuiDataGrid-row:nth-of-type(2n)': {
            bgcolor: 'white',
          },
          '.MuiDataGrid-row:nth-of-type(2n+1)': {
            bgcolor: '#00aeff',
          },
        },

        '.MuiDataGrid-columnHeader.MuiDataGrid-columnHeader.MuiDataGrid-columnHeader':
          {
            border: '1px solid #8fcce8',
            borderBottom: 0,
            borderTop: 0,

            '&:first-of-type, &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4)':
              {
                borderLeft: 0,
                borderRight: 0,
              },

            '&:last-of-type, &:nth-last-of-type(1), &:nth-last-of-type(2), ': {
              borderRight: 0,
            },
          },

        '.MuiDataGrid-cell.MuiDataGrid-cell.MuiDataGrid-cell': {
          border: '1px solid #8fcce8',
          borderBottom: 0,
          borderTop: 0,

          '&:first-of-type, &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4)':
            {
              borderLeft: 0,
              borderRight: 0,
            },

          '&:last-of-type': {
            borderRight: 0,
          },
        },

        '.MuiDataGrid-cell:nth-of-type(4)': {
          backgroundColor: '#ffea24',
          border: 0,
        },

        '.header:nth-of-type(4)': {
          backgroundColor: '#ffea24',
          color: 'black',
          border: 0,
        },

        '.MuiDataGrid-cell:nth-last-of-type(1)': {
          backgroundColor: '#ff2424',
          color: 'white',
        },

        '.MuiDataGrid-root.MuiDataGrid-root .MuiDataGrid-virtualScrollerContent ':
          {
            '.MuiDataGrid-row:nth-of-type(2n+1)': {
              '.MuiDataGrid-cell:nth-last-of-type(1)': {
                backgroundColor: '#db1924',
              },

              '.MuiDataGrid-cell:nth-of-type(4)': {
                backgroundColor: '#dbdf24',
                border: 0,
              },
            },
          },

        '.header:nth-last-of-type(3)': {
          backgroundColor: '#ba0000',
          color: 'white',
        },

        '.MuiDataGrid-footerContainer': {
          backgroundColor: '#004a6d',
          '*': {
            color: 'white',
          },
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
        paginationMode="client"
        onPaginationModelChange={handlePaginationModelChange}
        paginationModel={{
          page: params.page - 1,
          pageSize: params.pageSize,
        }}
      />
    </Box>
  )
}
