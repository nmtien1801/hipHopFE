import { Stack } from '@mui/material'
import { SingleCheckBoxField } from 'components/FormFields/CheckBoxField'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function InsertModuleForm({ data, onSubmit }) {
  const { control, handleSubmit, reset } = useForm({
    IsView: 0,
    IsInsert: 0,
    IsUpdate: 0,
    IsDelete: 0,
  })

  useEffect(() => {
    if (data) {
      reset({
        IsView: data.IsView,
        IsInsert: data.IsInsert,
        IsUpdate: data.IsUpdate,
        IsDelete: data.IsDelete,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleFormSubmit = handleSubmit((formValues) => {
    onSubmit?.(formValues)
  })

  return (
    <Stack direction="row" spacing={2}>
      <SingleCheckBoxField
        control={control}
        name="IsView"
        label="Xem"
        onFieldChange={handleFormSubmit}
      />
      <SingleCheckBoxField
        control={control}
        name="IsInsert"
        label="Tạo"
        onFieldChange={handleFormSubmit}
      />
      <SingleCheckBoxField
        control={control}
        name="IsUpdate"
        label="Sửa"
        onFieldChange={handleFormSubmit}
      />
      <SingleCheckBoxField
        control={control}
        name="IsDelete"
        label="Xóa "
        onFieldChange={handleFormSubmit}
      />
    </Stack>
  )
}
