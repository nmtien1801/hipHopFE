import {
  Box,
  Breadcrumbs,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AddEditGenreForm } from '../components/AddEditGenreForm'
import { useGenre } from 'hooks/Genres/useGenre'
import { useMutationGenre } from 'hooks/Genres/useMutationGenre'
import { getToken } from 'utils/hash'
import { useAuth } from 'hooks/Auth/auth'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'

export function GenreDetail() {
  const { id } = useParams()
  const language = useSelector((state) => state.global.language)
  const [showAddEdit, setShowAddEdit] = useState(null)
  const [params, setParams] = useState({
    genresID: id,
    LanguagesID: language,
  })

  const navigate = useNavigate()

  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading } = useGenre(params)
  const { add, edit } = useMutationGenre()

  // const { data: criteriaList } = useCriteriaList({
  //   // eventID: eventId,
  //   // genresID: id,
  // })

  const criteriaList = []
  const token = getToken()
  const { data: profile } = useAuth(token.UserID)
  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFormSubmit(formValues) {
    const auth = {
      UserID: profile?.UserID,
      UUSerID: profile?.UserName,
    }

    if (id && id !== 'create') {
      edit
        .mutateAsync({
          auth,
          data: {
            ...formValues,
            GenresID: id,
          },
        })
        .then(() => {
          enqueueSnackbar('Update successfully', {
            variant: 'success',
          })
        })
        .catch((error) => {
          console.log('error: ', `${error}`)
          enqueueSnackbar(`${error}`, { variant: 'error' })
        })

      return
    }

    add
      .mutateAsync({
        auth,
        data: {
          ...formValues,
        },
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Create successfully', {
            variant: 'success',
          })
          navigate(`/dashboard/genres/${res.GenresID}`)
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }
  console.log('data-test', data)
  return (
    <Box>
      <Container maxWidth="md">
        {isLoading ? (
          <Typography>Loading ...</Typography>
        ) : (
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
                  {t('Genres')}
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
                    Event
                  </Link>

                  <Typography color="text.primary">Detail</Typography>
                </Breadcrumbs>
              </Box>
            </Stack>

            <Stack spacing={3} flexGrow={1}>
              <Box>
                <AddEditGenreForm
                  isEdit={id && id !== 'create'}
                  data={data}
                  language={params.LanguagesID}
                  onSubmit={handleFormSubmit}
                  onLanguagechange={(lang) =>
                    setParams({
                      ...params,
                      LanguagesID: lang,
                    })
                  }
                  criteriaList={criteriaList}
                />
              </Box>
            </Stack>
          </Stack>
        )}
        <Dialog
          fullWidth
          maxWidth="sm"
          open={showAddEdit}
          onClose={() => setShowAddEdit(false)}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Thêm tiện nghi</DialogTitle>
          <DialogContent>
            <Box></Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}
