import { useCountries } from 'hooks/common/useCountry'
import { usePhoneCode } from 'hooks/common/usePhoneCode'
import { useUser } from 'hooks/User/useUser'
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AddEditGuestForm } from '../components/AddEditGuestForm'
import { useMutationUser } from 'hooks/User/useMutationUser'
import { useAuth } from 'hooks/Auth/auth'
import { getToken } from 'utils/hash'

const title = 'staff'

export function GuestDetail() {
  const language = useSelector((state) => state.global.language)
  const { id } = useParams()
  const { t } = useTranslation()
  const [params, setParams] = useState({
    page: 1,
    limit: 500,
    LanguagesID: language,
  })

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { data, isLoading } = useUser({ UserID: id, typeUserId: 3 })
  const { add, edit } = useMutationUser()

  const { data: countryList } = useCountries(params)
  const { data: phoneCodeList } = usePhoneCode(params)

  const token = getToken()
  const { data: profile } = useAuth(token.UserID)

  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFormSubmit(formValues) {
    formValues.auth = {
      UserID: profile?.UserID,
      UUSerID: profile?.UserName,
    }
    if (data?.UserID) {
      edit
        .mutateAsync({
          ...formValues,
          data: {
            ...formValues.data,
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

      return
    }

    add
      .mutateAsync({
        ...formValues,
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Create successfully', {
            variant: 'success',
          })
          navigate(`/dashboard/staffs/${res.UserID}`)
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
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
                  href="/#/dashboard/guest"
                >
                  Guest
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
                <AddEditGuestForm
                  isEdit={id && id !== 'create'}
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
