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
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GenreFilter } from '../components/GenreFilter'
import { GenreList } from '../components/GenreList'
import { useGenres } from 'hooks/Genres/useGenres'
import { useMutationGenre } from 'hooks/Genres/useMutationGenre'
import { LIMIT } from 'constants/common'

const title = 'genres'
export function GenrePage() {
  const language = useSelector((state) => state.global.language)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
    LanguagesID: language,
  })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, total } = useGenres(params)
  const { remove } = useMutationGenre()

  useEffect(() => {
    setParams({ ...params, LanguagesID: language })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function handleFilterChange(newParams) {
    setParams(newParams)
  }

  function handleRemove(id) {
    remove
      .mutateAsync({ GenresID: id })
      .then(() => {
        enqueueSnackbar('Remove successfully', { variant: 'success' })
        setSelectedGenre(null)
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
              <GenreFilter
                params={params}
                onFilterChange={handleFilterChange}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <GenreList
                data={data || []}
                loading={isLoading}
                total={total || 0}
                onFilterChange={handleFilterChange}
                params={params}
                onEdit={(id) => navigate(`/dashboard/${title}/${id}`)}
                onRemove={(id, name) => setSelectedGenre({ id, name })}
              />
            </Box>
          </Stack>
        </Stack>
      </Container>

      <Dialog
        maxWidth="xs"
        fullWidth
        open={!!selectedGenre}
        onClose={() => setSelectedGenre(null)}
      >
        <DialogTitle>Confirm remove {`"${selectedGenre?.name}"`}</DialogTitle>
        <DialogContent>Any change will not be reverted.</DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setSelectedGenre(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove(selectedGenre.id)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
