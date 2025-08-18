import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useEffect, useRef, useState } from 'react'

import { FormControl, FormHelperText, Typography } from '@mui/material'
import { uploadApi } from 'api/uploadApi'
import { DecoupledEditor } from 'ckeditor5'
import 'ckeditor5/ckeditor5.css'
import { useController } from 'react-hook-form'
import './CKEditor.css'
import { editorConfig } from './editorConfig'

export function CKEditorField({ name, control, label, onChange }) {
    const editorContainerRef = useRef(null)
    const editorMenuBarRef = useRef(null)
    const editorToolbarRef = useRef(null)
    const editorRef = useRef(null)
    const [isLayoutReady, setIsLayoutReady] = useState(false)

    const {
        field: { value, onChange: controllerOnChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    })

    useEffect(() => {
        setIsLayoutReady(true)
        return () => setIsLayoutReady(false)
    }, [])

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    loader.file
                        .then((file) => {
                            const formData = new FormData()
                            formData.append('', file)
                            uploadApi
                                .uploadAvatar(formData)
                                .then((url) => {
                                    resolve({ default: url })
                                })
                                .catch(reject)
                        })
                        .catch(reject)
                })
            },
        }
    }

    function uploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader)
        }
    }

    return (
        <FormControl fullWidth size="medium" error={invalid}>
            <Typography gutterBottom variant="body2">
                {label}
            </Typography>

            <div className="main-container">
                <div
                    className="editor-container editor-container_document-editor editor-container_include-style"
                    ref={editorContainerRef}
                >
                    <div
                        className="editor-container__menu-bar"
                        ref={editorMenuBarRef}
                    />
                    <div
                        className="editor-container__toolbar"
                        ref={editorToolbarRef}
                    />
                    <div className="editor-container__editor-wrapper">
                        <div className="editor-container__editor">
                            <div ref={editorRef}>
                                {isLayoutReady && (
                                    <CKEditor
                                        name={name}
                                        onReady={(editor) => {
                                            editorToolbarRef.current.appendChild(
                                                editor.ui.view.toolbar.element,
                                            )
                                            editorMenuBarRef.current.appendChild(
                                                editor.ui.view.menuBarView
                                                    .element,
                                            )
                                        }}
                                        onAfterDestroy={() => {
                                            Array.from(
                                                editorToolbarRef.current
                                                    .children,
                                            ).forEach((child) => child.remove())
                                            Array.from(
                                                editorMenuBarRef.current
                                                    .children,
                                            ).forEach((child) => child.remove())
                                        }}
                                        editor={DecoupledEditor}
                                        config={{
                                            ...editorConfig,
                                            extraPlugins: [uploadAdapterPlugin],
                                        }}
                                        data={value}
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            controllerOnChange(data)
                                            onChange?.(data)
                                        }}
                                        onBlur={onBlur}
                                        ref={ref}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {invalid && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
    )
}
