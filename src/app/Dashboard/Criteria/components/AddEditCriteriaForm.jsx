import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { InputField } from 'components/FormFields/InputField';
import { StatusField } from 'components/FormFields/StatusField';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const schema = yup.object().shape({
  CriteriaName: yup.string().required('Criteria name is required'),
});

AddEditCriteriaForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  isEdit: PropTypes.bool,
};

export function AddEditCriteriaForm({ data, onSubmit, isEdit }) {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      CriteriaName: '',
      StatusID: true,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      const newData = {
        ...data,
        StatusID: Boolean(data?.StatusID),
      };
      Object.keys(newData).forEach((key) => {
        setValue(key, newData[key]);
      });
    }
  }, [data, setValue]);

  const handleFormSubmit = handleSubmit((formValues) => {
    const formData = {
      ...formValues,
      StatusID: formValues.StatusID ? 1 : 0,
    };
    onSubmit?.(formData);
  });

  return (
    <Stack component="form" spacing={3} noValidate onSubmit={handleFormSubmit}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold">
            {t('Detail')}
          </Typography>
          <Typography variant="body2">
            {`${t('Criteria Name')}, ${t('Status')}...`}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={3} p={3}>
          <Box>
            <Typography variant="caption">{t('Status')}</Typography>
            <StatusField name="StatusID" control={control} />
          </Box>

          <Box>
            <InputField
              name="CriteriaName"
              label={t('Criteria Name')}
              control={control}
            />
          </Box>
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end" p={3}>
          <Button variant="contained" type="submit">
            {isEdit ? t('Update') : t('Create')}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}