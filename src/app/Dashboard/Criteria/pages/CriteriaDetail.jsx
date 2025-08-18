import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddEditCriteriaForm } from '../components/AddEditCriteriaForm'
import { useMutationCriteria } from 'hooks/Criteria/useMutationCriteria'
import { useCriteria } from 'hooks/Criteria/useCriteria'

const title = 'criteria'
export function CriteriaDetail() {
  const { id } = useParams()
  const [params, setParams] = useState({ CriteriaID: id })

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading } = useCriteria(params)
  const { add, edit } = useMutationCriteria()

  function handleFormSubmit(formValues) {
    if (id && id !== 'create') {
      edit
        .mutateAsync(formValues)
        .then(() => {
          enqueueSnackbar('Criteria updated successfully', {
            variant: 'success',
          })
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' })
        })
    } else {
      add
        .mutateAsync(formValues)
        .then(() => {
          enqueueSnackbar('Criteria added successfully', { variant: 'success' })
          navigate(`/dashboard/${title}`)
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' })
        })
    }
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
                    href="/#/dashboard/criteria"
                  >
                    Criteria
                  </Link>
                  <Typography color="text.primary">Detail</Typography>
                </Breadcrumbs>
              </Box>
            </Stack>

            <Stack spacing={3} flexGrow={1}>
              <Box>
                <AddEditCriteriaForm
                  isEdit={id && id !== 'create'}
                  data={data}
                  onSubmit={handleFormSubmit}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </Container>
    </Box>
  )
}
