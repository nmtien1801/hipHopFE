import { Box, Grid, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { useState } from 'react'

UniFinalList.propTypes = {
  data: PropTypes.array.isRequired,
}

export function UniFinalList({ data }) {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  })

  if (!data || !Array.isArray(data) || data.length === 0 || !data[0].lstUni) {
    return <Typography>No data available</Typography>
  }

  const { lstUni: universityList, lstExamier: examinersList } = data[0]

  const adjustData = (universityList, examinersList) => {
    return universityList.map((uni) => {
      const adjustedJudges = examinersList.map((examiner) => {
        const existingJudge = uni.lstJudge.find(
          (judge) => judge.UserID === examiner.ExamierID,
        )
        return (
          existingJudge || {
            UserID: examiner.ExamierID,
            FullName: examiner.ExamierName,
            PointPerJudge: 0,
            lstScoreCrit: [],
          }
        )
      })
      return {
        ...uni,
        lstJudge: adjustedJudges,
      }
    })
  }

  const adjustedUniversityList = adjustData(universityList, examinersList)

  function handlePaginationModelChange(model) {
    const newParams = {
      page: model.page + 1,
      pageSize: model.pageSize,
    }
    setParams(newParams)
  }

  const rows =
    Array.isArray(adjustedUniversityList) &&
    adjustedUniversityList?.length > 0 &&
    adjustedUniversityList?.map((item, idx) => ({
      ...item,
      key: idx + 1,
      lstJudge: item.lstJudge || [],
      lstScoreCrit: item.lstScoreCrit || [],
    }))
  console.log('examinersList', examinersList)

  const columns = [
    {
      field: 'key',
      headerName: 'NO.',
      width: 50,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => (
        <Stack justifyContent="center" height="100%">
          <Typography>{row.key < 10 ? `0${row.key}` : row.key}</Typography>
        </Stack>
      ),
    },
    {
      field: 'FullName',
      headerName: 'University',
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => (
        <Stack justifyContent="center" height="100%">
          <Typography fontWeight={600} textTransform="uppercase">
            {row.FullName}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'lstJudgeName',
      headerName: 'Judges',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => (
        <Stack justifyContent="center" height="100%">
          {row.lstJudge && Array.isArray(row.lstJudge) ? (
            row.lstJudge.map((judge, idx) => (
              <Typography key={idx} fontWeight={600} textTransform="uppercase">
                {judge.FullName}
              </Typography>
            ))
          ) : (
            <Typography fontWeight={600} textTransform="uppercase">
              No judges available
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      field: 'lstScoreCrit',
      flex: 1,
      width: 500,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderHeader: () => {
        const allCriteriaNames = new Set()
        data[0]?.lstUni?.forEach((uni) => {
          uni.lstJudge.forEach((judge) => {
            judge.lstScoreCrit.forEach((crit) => {
              allCriteriaNames.add(crit.CritName)
            })
          })
        })

        return (
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%', width: '100%' }}
          >
            {Array.from(allCriteriaNames).map((critName, index) => (
              <Grid
                item
                key={index}
                xs={12 / allCriteriaNames.size}
                style={{
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                  padding: '8px',
                }}
              >
                <Typography
                  fontWeight={700}
                  textTransform="uppercase"
                  sx={{
                    px: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {critName}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )
      },
      renderCell: ({ row }) => {
        const criteria =
          row.lstJudge?.flatMap((judge) => judge.lstScoreCrit) || []
        const numJudges = row.lstJudge?.length || 1
        const n = Math.ceil(criteria.length / numJudges) || 1
        const groupedCriteria = Array.from(
          { length: numJudges },
          (_, rowIndex) => criteria.slice(rowIndex * n, (rowIndex + 1) * n),
        )

        return (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%' }}
          >
            {groupedCriteria.length > 0 ? (
              groupedCriteria.map((group, rowIndex) => (
                <Grid container item key={rowIndex} justifyContent="center">
                  {group.map((crit, colIndex) => (
                    <Grid
                      item
                      key={colIndex}
                      style={{ flexGrow: 1, textAlign: 'center' }}
                    >
                      <Typography fontWeight={600} textTransform="uppercase">
                        {`${crit.Point}`}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography fontWeight={600} textTransform="uppercase">
                  0
                </Typography>
              </Grid>
            )}
          </Grid>
        )
      },
    },
    {
      field: 'lstJudge',
      headerName: 'Point Per Judge',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => (
        <Stack justifyContent="center" height="100%">
          {row.lstJudge && Array.isArray(row.lstJudge) ? (
            row.lstJudge.map((judge, idx) => (
              <Typography key={idx} fontWeight={600} textTransform="uppercase">
                {judge.PointPerJudge}
              </Typography>
            ))
          ) : (
            <Typography fontWeight={600} textTransform="uppercase">
              No judges available
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      field: 'TotalScore',
      headerName: 'Total Score',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerClassName: 'header',
      renderCell: ({ row }) => (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Typography variant="h5" fontWeight={600}>
            {row?.TotalScore}
          </Typography>
        </Stack>
      ),
    },
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
        '.MuiDataGrid-root .MuiDataGrid-virtualScrollerContent': {
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
            '&:last-of-type, &:nth-last-of-type(1), &:nth-last-of-type(2)': {
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
        '.MuiDataGrid-root.MuiDataGrid-root .MuiDataGrid-virtualScrollerContent':
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
        getRowHeight={(params) => {
          const judgeCount = params.model.lstJudge.length
          if (judgeCount >= 2) {
            return 70 + (judgeCount - 2) * 20
          }
          return 60
        }}
      />
    </Box>
  )
}
