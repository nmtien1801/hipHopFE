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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AddEditStaffForm } from '../components/AddEditStaffForm'
import { useMutationUser } from 'hooks/User/useMutationUser'
import { useAuth } from 'hooks/Auth/auth'
import { getToken } from 'utils/hash'
import { moduleAccessGetAll } from 'store/slice/moduleAccessSlice'
import { InsertUserTypeModule } from '../components/InsertUserModule'
import {
  getPermission,
  userModuleGetAll,
  userModuleInsert,
} from 'store/slice/userModuleSlice'
import { STATUS } from 'constants/common'

const title = 'staff'
export function StaffDetail() {
  const language = useSelector((state) => state.global.language)
  const { id } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [params, setParams] = useState({
    page: 1,
    limit: 500,
    LanguagesID: language,
  })

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { data, isLoading } = useUser({ UserID: id })
  const { add, edit } = useMutationUser()

  const { data: countryList } = useCountries(params)
  const { data: phoneCodeList } = usePhoneCode(params)

  const token = getToken()
  const { data: profile } = useAuth(token.UserID)

  const moduleAccessList = useSelector((state) => state.moduleAccess.dataList)
  const userModuleList = useSelector((state) => state.userModule.dataList)
  const userModuleStatus = useSelector((state) => state.userModule.status)

  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  useEffect(() => {
    dispatch(moduleAccessGetAll())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (id && id !== 'create') {
      dispatch(userModuleGetAll({ userID: parseInt(id) }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  useEffect(() => {
    if (userModuleStatus === STATUS.CREATED) {
      enqueueSnackbar('Thêm quyền user thành công!')
      dispatch(userModuleGetAll({ userID: parseInt(id) }))

      if (parseInt(id) === profile?.UserID) {
        dispatch(getPermission({ userID: profile?.UserID }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userModuleStatus])

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
          navigate(`/dashboard/staff/${res.UserID}`)
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  function handleModuleChange(formValues) {
    const newValues = {
      auth: {
        UserID: profile?.UserID,
        UUSerID: profile?.UserName,
      },
      data: {
        ...formValues,
        UserID: parseInt(id),
      },
    }

    dispatch(userModuleInsert(newValues))
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
                  href="/#/dashboard/staff"
                >
                  Staff
                </Link>

                <Typography color="text.primary">
                  {id === 'create' ? 'Create' : 'Detail'}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Stack>

          <Stack spacing={3} flexGrow={1}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Box>
                  <AddEditStaffForm
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

                {data && (
                  <Box>
                    <InsertUserTypeModule
                      userModuleList={userModuleList}
                      moduleAccessList={moduleAccessList || []}
                      onModuleChange={handleModuleChange}
                    />
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
