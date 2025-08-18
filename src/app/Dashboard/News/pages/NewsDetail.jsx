import {
  Box,
  Breadcrumbs,
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
import { AddEditNewsForm } from '../components/AddEditNewsForm'
import { useMutationNews } from 'hooks/News/useMutationNews'
import { useNews } from 'hooks/News/useNews'
import { getToken } from 'utils/hash'
import { useAuth } from 'hooks/Auth/auth'

const title = 'news'
export function NewsDetail() {
  const { id } = useParams()
  const language = useSelector((state) => state.global.language)
  const [params, setParams] = useState({ newsID: id, LanguagesID: language })

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading } = useNews(params)
  const { add, edit } = useMutationNews()

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
    if (id && id !== 'create') {
      edit
        .mutateAsync({
          ...formValues,
          data: {
            ...formValues.data,
            NewsID: id,
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
        ...formValues,
      })
      .then((res) => {
        if (res) {
          enqueueSnackbar('Create successfully', {
            variant: 'success',
          })
          navigate(`/dashboard/news/${res.NewsID}`)
        }
      })
      .catch((error) => {
        console.log('error: ', `${error}`)
        enqueueSnackbar(`${error}`, { variant: 'error' })
      })
  }

  return (
    <Box>
      <Container>
        {isLoading ? (
          <Typography>Loading...</Typography>
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
                    News
                  </Link>

                  <Typography color="text.primary">Detail</Typography>
                </Breadcrumbs>
              </Box>
            </Stack>

            <Stack spacing={3} flexGrow={1}>
              <Box>
                <AddEditNewsForm
                  isEdit={id && id !== 'create'}
                  data={data}
                  language={language}
                  onSubmit={handleFormSubmit}
                  onLanguagechange={(lang) =>
                    setParams({
                      ...params,
                      LanguagesID: lang,
                    })
                  }
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </Container>
    </Box>
  )
}

export default NewsDetail
