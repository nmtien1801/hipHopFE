import { Box, Stack, Typography } from '@mui/material'
import { CheckIcon } from 'assets/icons/CheckIcon'
import { Fragment, useEffect, useState } from 'react'
import bgBtn from 'assets/images/khung-cham-diem.png'
export function RoundList({ data, showResult = true, setShowResult }) {
  const [num, setNumber] = useState(3)
  const [showLoading, setShowLoading] = useState(false)
  const { CoupleDetail, lstExamier: examinerList, lstUserPlayResult } = data

  useEffect(() => {
    if (CoupleDetail?.IsWin !== 0) {
      setShowResult?.(true)
      return
    }
    setShowResult?.(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!showLoading) return
    if (num === 0) {
      setShowLoading(false)
      setShowResult?.(true)
      setNumber(3)
      return
    }

    const timer = setTimeout(() => {
      setNumber(num - 1)
    }, 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, showLoading])

  return (
    <Fragment>
      {showLoading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,1)',
            zIndex: 999,
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              fontSize: '600px !important',

              textShadow:
                '0px 0px 30px rgba(255,255,255,0.87), 0px 0px 40px rgba(255,255,255,0.87), 0px 0px 50px rgba(255,255,255,0.87)',
            }}
            color="white"
          >
            {num}
          </Typography>
        </Stack>
      )}
      <Box component="table" width="100%">
        <Box component="thead" width="100%">
          <Box component="tr" width="100%">
            <Box
              component="th"
              sx={{
                height: 50,
                width: 1 / (examinerList?.length + 1),
              }}
            />
            {Array.isArray(examinerList) &&
              examinerList.length > 0 &&
              examinerList.map((item, idx, arr) => (
                <Box
                  component="th"
                  key={idx}
                  sx={{
                    textAlign: 'center',
                    py: 1,
                    width: 1 / (examinerList?.length + 1),
                  }}
                >
                  <Typography color="white" variant="h6" fontWeight={600}>
                    {item.ExamierName}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>

        <Box component="tbody" width="100%">
          {Array.isArray(lstUserPlayResult) &&
            lstUserPlayResult.length > 0 &&
            lstUserPlayResult.map((item, idx, arr) => (
              <Box component="tr" width="100%" key={idx}>
                <Box
                  component="td"
                  sx={{
                    p: 1,
                    width: 1 / (examinerList?.length + 1),
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      bgcolor: 'primary.main',
                      width: '100%',
                      borderRadius: '4px',
                      aspectRatio: 879 / 139,
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      textAlign="center"
                      color="white"
                    >
                      ROUND {idx + 1}
                    </Typography>
                  </Stack>
                </Box>

                {Array.isArray(item.lstExmierPoint) &&
                  item.lstExmierPoint.length > 0 &&
                  item.lstExmierPoint.map((item, index, arr) => {
                    return (
                      <Box
                        component="td"
                        key={index}
                        sx={{
                          p: 1,
                          width: 1 / (examinerList?.length + 1),
                        }}
                      >
                        <Stack
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            background:
                              item.ChoseUser === 0
                                ? `url(${bgBtn})` //</Box>'linear-gradient(to bottom, #bdbdbd 0%, #fafafa 100%)'
                                : !showResult
                                ? `url(${bgBtn})` // 'linear-gradient(to bottom, #05ac00 0%, #32f800 100%)'
                                : item.ChoseUser === 1
                                ? 'linear-gradient(to bottom, #062671 0%, #5191ec 100%)'
                                : item.ChoseUser === 2
                                ? 'linear-gradient(to bottom, #ff0000 0%,  #ffb1b1 100%)'
                                : 'linear-gradient(to bottom, #c7c117 0%,  #fafafa 100%)', //'linear-gradient(to bottom, #4ab6ff 0%,  #fafafa 100%)',
                            width: '100%',
                            transition: '3s',

                            aspectRatio: 879 / 139,

                            borderRadius: '8px',
                            boxShadow: (theme) => theme.shadows[10],
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                          }}
                        >
                          {item.ChoseUser !== 0 && <CheckIcon />}
                        </Stack>
                      </Box>
                    )
                  })}
              </Box>
            ))}
        </Box>
      </Box>
    </Fragment>
  )
}
