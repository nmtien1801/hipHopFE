import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { Loading } from 'components/Common/Loading'
import { LIMIT, USER_TYPE_ENUM } from 'constants/common'
import dayjs from 'dayjs'
import { useAuth } from 'hooks/Auth/auth'
import { useEvents } from 'hooks/Events/useEvents'
import { useGenresByEvent } from 'hooks/Events/useGenresByEvent'
import { useGenres } from 'hooks/Genres/useGenres'
import { useUserRegister } from 'hooks/Player/useUserRegister'
import { useCountries } from 'hooks/common/useCountry'
import { usePhoneCode } from 'hooks/common/usePhoneCode'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkPermission, checkRole } from 'utils/checkRole'
import { formatCurrency } from 'utils/common'
import { getToken } from 'utils/hash'
import * as XLSX from 'xlsx'
import { PaymentForm } from '../components/PaymentForm'
import { PlayerFilter } from '../components/PlayerFilter'
import { PlayerList } from '../components/PlayerList'
import { LayerRegisterForm } from '../components/PlayerRegister'

const title = 'Players'
export function PlayerPage() {
  const language = useSelector((state) => state.global.language)
  const [showRegister, setShowRegister] = useState(false)
  const [eventID, setEventID] = useState()
  const [selectedRemoveItem, setSelectedRemoveItem] = useState(null)

  const { data: countryList } = useCountries({
    page: 1,
    limit: 500,
    LanguagesID: language,
  })
  const { data: phoneCodeList } = usePhoneCode({
    page: 1,
    limit: 500,
    LanguagesID: language,
  })

  const [selectedPayment, setSelectedPayment] = useState(null)
  const [selectedChangeStatus, setSelectedChangeStatus] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
    eventID: 0,
    genresID: 0,
    LanguagesID: language,
  })

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const token = getToken()

  const { data, isLoading, payment, updateStatus, total, remove } =
    useUserRegister(params)

  const { data: eventList } = useEvents({
    page: 1,
    limit: 20,
    LanguagesID: language,
  })
  const { data: genreList } = useGenres({ page: 1, LanguagesID: language })
  const userModuleList = useSelector((state) => state.userModule.permissionList)

  const { data: genreByEventList } = useGenresByEvent({
    eventID: eventID,
    LanguagesID: language,
  })
  const { playerRegister } = useAuth()

  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFilterChange(params) {
    setParams(params)
  }

  function handlePayment(formValues) {
    payment
      .mutateAsync({
        ...formValues,
        auth: { UserID: token?.UserID, UUSerID: token?.UserName },
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Payment successfully', {
            variant: 'success',
          })
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
      .finally(() => {
        setSelectedPayment(null)
      })
  }

  function handleChangeStatus() {
    updateStatus
      .mutateAsync({
        auth: { UserID: token?.UserID, UUSerID: token?.UserName },
        data: {
          UserID: selectedChangeStatus.UserID,
          EventID: selectedChangeStatus.EventID,
          GenresID: selectedChangeStatus.GenresID,
        },
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Update status successfully', {
            variant: 'success',
          })
          setSelectedChangeStatus(null)
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  function handleExport() {
    const dataExport = data.map((item, idx) => {
      return {
        STT: idx + 1,
        ID: item.UserID,
        USERNAME: item.UserName,
        'HỌ VÀ TÊN': item.FullName,
        'TÊN SỰ KIỆN': item.EventName,
        'TÊN THỂ LOẠI': item.GenresName,

        'NGÀY TẠO': dayjs(item.DateCreated).format('DD/MM/YYYY'),
        'NGÀY CHỈNH SỬA': dayjs(item.DateUpdated).format('DD/MM/YYYY'),
        'NGƯỜI TẠO': item.UserCreated,
        'NGƯỜI CHỈNH SỬA': item.UserUpdated,
        'TRẠNG THÁI':
          item.StatusPaymentID === 1 ? 'Đã thanh toán' : 'Chưa thanh toán',
        'ĐƠN GIÁ': item.AmountGenre || 0,
        'ĐÃ THANH TOÁN': item.AmountPay || 0,
      }
    })

    const sumAmountPay = dataExport.reduce(
      (total, item) => total + item['ĐÃ THANH TOÁN'],
      0,
    )

    const dataExportExcel = [
      ...dataExport,
      { 'ĐÃ THANH TOÁN': `TOTAL: ${formatCurrency(sumAmountPay || 0)}` },
    ]

    const ws = XLSX.utils.json_to_sheet(dataExportExcel)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    XLSX.writeFile(wb, `Player_${new Date().toLocaleString()}.xlsx`)
  }

  async function handleRegister(formValues) {
    playerRegister
      .mutateAsync(formValues)
      .then((res) => {
        if (res) {
          enqueueSnackbar('Register successfully', {
            variant: 'success',
          })
          setShowRegister(false)
        }
      })
      .catch((error) => {
        console.error(error)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  function handleRemove(RegisterPlayID) {
    remove
      .mutateAsync({
        auth: { UserID: token?.UserID, UUSerID: token?.UserName },
        data: {
          RegisterPlayID,
        },
      })
      .then(() => {
        enqueueSnackbar('Remove successfully', { variant: 'success' })
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }
  console.log('dataaaaa', data)
  console.log('params', params)
  return (
    <Box sx={{ height: '100%' }}>
      <Container sx={{ height: '100%' }}>
        <Stack spacing={3} sx={{ height: '100%' }}>
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

                <Typography color="text.primary">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Stack>

          <Stack spacing={3} flexGrow={1}>
            <Box>
              <PlayerFilter
                params={params}
                onFilterChange={handleFilterChange}
                eventList={
                  eventList?.map((item) => ({
                    label: `${item.EventName}`,
                    value: `${item.EventID}`,
                  })) || []
                }
                genreList={
                  genreList?.map((item) => ({
                    label: `${item.GenresName}`,
                    value: `${item.GenresID}`,
                  })) || []
                }
                onExport={handleExport}
                onCreate={() => setShowRegister(true)}
              />
            </Box>

            {isLoading ? (
              <Loading />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <PlayerList
                  isUpdate={
                    checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ||
                    checkPermission(userModuleList, 2).isUpdate
                  }
                  isInsert={
                    checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ||
                    checkPermission(userModuleList, 2).isInsert
                  }
                  data={data || []}
                  onRemove={(row) => setSelectedRemoveItem(row)}
                  loading={isLoading}
                  onFilterChange={handleFilterChange}
                  params={params}
                  onPayment={(item) => setSelectedPayment(item)}
                  total={total}
                  onStatusChange={(item) => setSelectedChangeStatus(item)}
                  onEditClick={(UserID) =>
                    navigate(`/dashboard/${title}/${UserID}`)
                  }
                />
              </Box>
            )}
          </Stack>
        </Stack>

        <Dialog
          maxWidth="sm"
          fullWidth
          open={!!selectedPayment}
          onClose={() => setSelectedPayment(null)}
        >
          <DialogContent>
            <Typography gutterBottom variant="h6" fontWeight={700}>
              Payment for {selectedPayment?.EventName} -{' '}
              {selectedPayment?.GenresName}
            </Typography>
            <PaymentForm
              data={selectedPayment || {}}
              onCancel={() => setSelectedPayment(null)}
              onSubmit={handlePayment}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          maxWidth="md"
          fullWidth
          open={showRegister}
          onClose={() => setShowRegister(false)}
        >
          <DialogContent>
            <LayerRegisterForm
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
              eventList={
                eventList?.map((item) => ({
                  label: item.EventName,
                  value: item.EventID,
                })) || []
              }
              genreList={
                genreByEventList?.map((item) => ({
                  label: item.GenresName,
                  value: item.GenresID,
                })) || []
              }
              onEventIDChange={(id) => setEventID(id)}
              onSubmit={handleRegister}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!selectedChangeStatus}
          onClose={() => setSelectedChangeStatus(null)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Confirm change status
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Be sure to change your player status! Any changes cannot be
              undone.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              autoFocus
              variant="outlined"
              onClick={() => setSelectedChangeStatus(null)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleChangeStatus}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={!!selectedRemoveItem}
        onClose={() => setSelectedRemoveItem(null)}
      >
        <DialogTitle>Cảnh Báo: Hành động không thể hoàn tác!</DialogTitle>

        <DialogContent>
          Bạn có chắc chắn muốn xóa{' '}
          <strong>{selectedRemoveItem?.FullName}</strong> không? Sau khi xác
          nhận, hành động này sẽ không thể hoàn tác. Hoặc bạn có thể đổi trạng
          thái ngừng hoạt động thay vì xóa.
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setSelectedRemoveItem(null)}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemove(selectedRemoveItem?.RegisterPlayID)}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
