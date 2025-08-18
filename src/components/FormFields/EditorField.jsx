import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

export const EditorField = ({ control, name, label }) => {
    const {
        field: { onChange: controllerOnChange, value },
        // fieldState: { error },
    } = useController({ name, control })

    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData()
                controllerOnChange(data)
            }}
            config={{
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'indent',
                        'outdent',
                        '|',
                        'blockQuote',
                        'undo',
                        'redo',
                    ],
                },
            }}
        />
    )
}

EditorField.propTypes = {
    control: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}
