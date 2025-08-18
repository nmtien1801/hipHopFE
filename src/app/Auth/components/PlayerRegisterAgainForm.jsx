import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Stack } from '@mui/material'
import { MultiCheckBoxField } from 'components/FormFields/CheckBoxField'
import { SelectField } from 'components/FormFields/SelectField'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { getToken } from 'utils/hash'
import * as yup from 'yup'

const schema = yup.object().shape({
  EventID: yup.number().required('Event is required'),
  lstGenresID: yup.array().min(1, 'Genre is required'),
})
LayerRegisterAgainForm.propTypes = {
  eventList: PropTypes.array.isRequired,
  genreList: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  profile: PropTypes.object,
  onEventIDChange: PropTypes.func,
}

export function LayerRegisterAgainForm({
  eventList = [],
  genreList = [],
  onSubmit,
  profile,
  onEventIDChange,
}) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      EventID: '',
      lstGenresID: [],
    },
    resolver: yupResolver(schema),
  })
  const token = getToken()

  const handleFormSubmit = handleSubmit((formValues) => {
    const newFormValue = {
      auth: {
        UserID: token?.UserID,
        UUSerID: token?.UserName,
      },
      data: {
        ...formValues,
        UserID: profile.UserID,
        lstGenresID: formValues.lstGenresID.map((item) => parseInt(item)),
      },
    }

    onSubmit?.(newFormValue)
  })

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2}>
      <Box>
        <SelectField
          label="Event"
          name="EventID"
          control={control}
          optionList={eventList || []}
          onChange={onEventIDChange}
        />
      </Box>

      {genreList.length > 0 && (
        <Box>
          <MultiCheckBoxField
            name="lstGenresID"
            label="Genres"
            control={control}
            optionList={genreList}
          />
        </Box>
      )}

      <Button size="large" variant="contained" type="submit">
        REGISTER
      </Button>
    </Stack>
  )
}
