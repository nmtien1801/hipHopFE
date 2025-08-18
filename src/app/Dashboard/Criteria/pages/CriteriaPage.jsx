import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { useMutationCriteria } from 'hooks/Criteria/useMutationCriteria'
import { useCriteriaList } from 'hooks/Criteria/useCriteriaList'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CriteriaFilter } from '../components/CriteriaFilter'
import { CriteriaList } from '../components/CriteriaList'
import { LIMIT } from 'constants/common'

const title = 'criteria'
export function CriteriaPages() {
  const [params, setParams] = useState({
    page: 1,
    limit: LIMIT,
  })

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { data, isLoading, total } = useCriteriaList(params)
  const { remove } = useMutationCriteria()

  function handleFilterChange(params) {
    setParams({ ...params })
  }

  function handleRemove(id) {
    remove
      .mutateAsync({ CriteriaID: id })
      .then(() => {
        enqueueSnackbar('Criteria removed successfully', { variant: 'success' })
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' })
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
                <Typography color="text.primary">{title}</Typography>
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
              <CriteriaFilter
                params={params}
                onFilterChange={handleFilterChange}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <CriteriaList
                data={data || []}
                loading={isLoading}
                total={total}
                onFilterChange={handleFilterChange}
                params={params}
                onEdit={(id) => navigate(`/dashboard/${title}/${id}`)}
                onRemove={handleRemove}
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
