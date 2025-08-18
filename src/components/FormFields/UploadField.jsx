import { Box, FormControl, FormHelperText } from '@mui/material'
import { uploadApi } from 'api/uploadApi'
import { Upload } from 'assets/icons/Upload'
import { useController } from 'react-hook-form'
export function UploadField({
  children,
  name,
  control,
  onUploadChange,
  aspectRatio = '16/9',
  ...props
}) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  async function handleChange(e) {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('', file)

    try {
      const res = await uploadApi.uploadAvatar(formData)

      if (res) {
        onChange(res)
        onUploadChange(res)
      }
    } catch (error) {
      console.error(`${error}`)
    }
  }

  return (
    <FormControl fullWidth error={invalid}>
      <Box component="label" {...props}>
        {children ? (
          children
        ) : (
          <Box
            sx={{
              width: '100%',
              border: '1px dashed',
              borderRadius: '8px',
              aspectRatio: aspectRatio,
              bgcolor: 'grey.100',
              borderColor: 'grey.500',
            }}
          >
            {value ? (
              <Box
                width="100%"
                height="100%"
                component="img"
                src={value}
                alt="imagePaths"
                sx={{
                  objectFit: 'contain',
                  verticalAlign: 'middle',
                }}
              />
            ) : (
              <Upload />
            )}
          </Box>
        )}

        <Box
          component="input"
          onChange={handleChange}
          type="file"
          sx={{ display: 'none' }}
        />
        {invalid && <FormHelperText error>{error.message}</FormHelperText>}
      </Box>
    </FormControl>
  )
}
