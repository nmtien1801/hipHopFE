import { LoadingButton } from '@mui/lab'
import { Box, FormControl, FormHelperText, Slider } from '@mui/material'
import { uploadApi } from 'api/uploadApi'
import { Upload } from 'assets/icons/Upload'
import { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { useController } from 'react-hook-form'

export function UploadImageField({
  children,
  name,
  control,
  onUploadChange,
  aspectRatio = 16 / 9,
  ...props
}) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [editor, setEditor] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [scale, setScale] = useState(1.2) // Giá trị mặc định của scale

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(URL.createObjectURL(file))
      setIsEditing(true)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    if (editor) {
      const canvas = editor.getImageScaledToCanvas()
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'editedImage.jpg', { type: 'image/jpeg' })
        const formData = new FormData()
        formData.append('image', file)

        try {
          const res = await uploadApi.uploadAvatar(formData)
          if (res) {
            setIsEditing(false)
            onChange(res)
            onUploadChange?.(res)
          }
        } catch (error) {
          console.error(`${error}`)
        } finally {
          setLoading(false)
        }
      }, 'image/jpeg')
    }
  }

  const handleScaleChange = (event, newValue) => {
    setScale(newValue)
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
              overflow: 'hidden',
              position: 'relative',
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
            <Box
              component="input"
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              sx={{ display: 'none' }}
            />
          </Box>
        )}
        {invalid && <FormHelperText error>{error.message}</FormHelperText>}
      </Box>

      {isEditing && (
        <Box sx={{ mt: 3 }}>
          <AvatarEditor
            ref={(ref) => setEditor(ref)}
            image={image}
            border={0}
            width={250}
            height={140}
            borderRadius={8}
            color={[0, 0, 0, 0.1]} // RGBA
            scale={scale} // Sử dụng giá trị scale từ state
            rotate={0}
            style={{
              padding: 0,
              width: '100%',
              height: '56.25%',
              border: '1px dashed',
              borderRadius: '8px',
              aspectRatio: aspectRatio,
            }}
          />
          <Box sx={{ mt: 1 }}>
            <Slider
              value={scale}
              min={1}
              max={3}
              step={0.1}
              onChange={handleScaleChange}
              aria-labelledby="scale-slider"
              valueLabelDisplay="auto"
            />
          </Box>
          <LoadingButton
            loading={loading}
            disabled={loading}
            variant="outlined"
            onClick={() => setIsEditing(false)}
            sx={{ mr: 1 }}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            loading={loading}
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Box>
      )}
    </FormControl>
  )
}
