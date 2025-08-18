import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { Loading } from 'components/Common/Loading'
import { LIMIT } from 'constants/common'
import { useMutationUser } from 'hooks/User/useMutationUser'
import { useUsers } from 'hooks/User/useUsers'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { StaffFilter } from '../components/StaffFilter'
import { StaffList } from '../components/StaffList'

const title = 'staff'
export function StaffPage() {
  const [selectedId, setSelectedId] = useState(null)

  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
    typeUserID: 6,
  })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, total } = useUsers(params)
  const { remove } = useMutationUser()

  function handleFilterChange(params) {
    setParams({ ...params })
  }

  function handleRemove(id) {
    remove
      .mutateAsync({ UserID: id })
      .then(() => {
        enqueueSnackbar('Remove successfully', { variant: 'success' })
        setSelectedId(null)
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

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

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate(`/dashboard/${title}/create`)}
            >
              {t('add-new')}
            </Button>
          </Stack>

          <Stack spacing={3} flexGrow={1}>
            <Box>
              <StaffFilter
                params={params}
                onFilterChange={handleFilterChange}
              />
            </Box>
            {isLoading ? (
              <Loading />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <StaffList
                  data={data || []}
                  loading={isLoading}
                  total={total}
                  onFilterChange={handleFilterChange}
                  params={params}
                  onEdit={(id) => navigate(`/dashboard/${title}/${id}`)}
                  onRemove={(id) => setSelectedId(id)}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>

      <Dialog
        maxWidth="sm"
        fullWidth
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      >
        <DialogTitle>{`Confirm remove "${selectedId}"`}</DialogTitle>
        <DialogContent>Any change will not be reverted.</DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setSelectedId(null)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleRemove(selectedId)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
