import LinearProgress from '@mui/material/LinearProgress'
import { GridOverlay } from '@mui/x-data-grid'
import * as React from 'react'

export function DataGridLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    )
}
