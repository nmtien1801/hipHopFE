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
import { useMutationNews } from 'hooks/News/useMutationNews'
import { useNewsList } from 'hooks/News/useNewsList'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NewsFilter } from '../components/NewsFilter'
import { NewsList } from '../components/NewsList'
import { LIMIT, USER_TYPE_ENUM } from 'constants/common'
import { checkPermission, checkRole } from 'utils/checkRole'
import { getToken } from 'utils/hash'

const title = 'news'
export function NewsPages() {
  const language = useSelector((state) => state.global.language)
  const [selectedNews, setSelectedNews] = useState(null)

  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
    LanguagesID: language,
  })

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, total } = useNewsList(params)
  const { remove } = useMutationNews()
  const userModuleList = useSelector((state) => state.userModule.permissionList)
  const token = getToken()

  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFilterChange(params) {
    setParams({ ...params })
  }

  function handleRemove(id) {
    remove
      .mutateAsync({ NewsID: id })
      .then(() => {
        enqueueSnackbar('Remove successfully', { variant: 'success' })
        setSelectedNews(null)
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Container sx={{ height: '100%' }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
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
                disabled={
                  !checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) &&
                  !checkPermission(userModuleList, 1).isInsert
                }
              >
                {t('add-new')}
              </Button>
            </Stack>

            <Stack spacing={3} flexGrow={1}>
              <Box>
                <NewsFilter
                  params={params}
                  onFilterChange={handleFilterChange}
                />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <NewsList
                  isUpdate={
                    checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ||
                    checkPermission(userModuleList, 1).isUpdate
                  }
                  isDelete={
                    checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ||
                    checkPermission(userModuleList, 1).isDelete
                  }
                  data={data || []}
                  loading={isLoading}
                  total={total}
                  onFilterChange={handleFilterChange}
                  params={params}
                  onEdit={(id) => navigate(`/dashboard/${title}/${id}`)}
                  onRemove={(id, title) => setSelectedNews({ id, title })}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </Container>

      <Dialog
        maxWidth="xs"
        fullWidth
        open={!!selectedNews}
        onClose={() => setSelectedNews(null)}
      >
        <DialogTitle>{`Confirm remove "${selectedNews?.title}"`}</DialogTitle>
        <DialogContent>Any change will not be reverted.</DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setSelectedNews(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove(selectedNews?.id)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
