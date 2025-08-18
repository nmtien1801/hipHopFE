import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useCountries } from 'hooks/common/useCountry'
import { usePhoneCode } from 'hooks/common/usePhoneCode'
import { useMutationUser } from 'hooks/User/useMutationUser'
import { useUser } from 'hooks/User/useUser'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { AddEditPlayerForm } from '../components/AddEditPlayerForm'

const title = 'players'
export function PlayerDetail() {
  const language = useSelector((state) => state.global.language)
  const { id } = useParams()
  const { t } = useTranslation()
  const [params, setParam] = useState({
    page: 1,
    limit: 500,
    languagesID: language,
  })
  const token = getToken()

  const { enqueueSnackbar } = useSnackbar()
  const { data, isLoading } = useUser({ UserID: id })
  const { edit } = useMutationUser()

  const { data: countryList } = useCountries(params)
  const { data: phoneCodeList } = usePhoneCode(params)

  useEffect(() => {
    setParam({ ...params, languagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFormSubmit(formValues) {
    if (data?.UserID) {
      edit
        .mutateAsync({
          ...formValues,
          auth: {
            UserID: token?.UserID,
            UUSerID: token?.UserName,
          },
          data: {
            ...formValues.data,
            Birthday: dayjs(formValues.data.Birthday).toISOString(),
            UserID: data.UserID,
          },
        })
        .then((res) => {
          if (res) {
            enqueueSnackbar('Update successfully', {
              variant: 'success',
            })
          }
        })
        .catch((error) => {
          console.log('error: ', `${error}`)
          enqueueSnackbar(`${error}`, { variant: 'error' })
        })
    }
  }

  return (
    <Box>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Box>
              <Typography
                variant="h5"
                textTransform={'uppercase'}
                fontWeight={700}
              >
                {t(title)}
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/#/dashboard">
                  Dashboard
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/#/dashboard/events"
                >
                  Players
                </Link>

                <Typography color="text.primary">Detail</Typography>
              </Breadcrumbs>
            </Box>
          </Stack>

          <Stack spacing={3} flexGrow={1}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Box>
                <AddEditPlayerForm
                  data={data}
                  onSubmit={handleFormSubmit}
                  countryList={
                    countryList?.map((item) => ({
                      CountryID: item.CountryID,
                      CountryName: item.CountryName,
                      Flag: item.Flag,
                    })) || []
                  }
                  phoneCodeList={
                    phoneCodeList
                      ?.map((item) => ({
                        PhoneNumber: item.PhoneNumber,
                        Flag: item.PhoneCode,
                      }))
                      ?.filter(
                        (value, index, self) =>
                          index ===
                          self.findIndex(
                            (t) => t.PhoneNumber === value.PhoneNumber,
                          ),
                      ) || []
                  }
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
