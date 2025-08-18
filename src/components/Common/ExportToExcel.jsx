import React from 'react'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import { Button } from '@mui/material'

export const ExportToExcel = ({ apiData, fileName = 'export', ...props }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (apiData, fileName) => {
    if (Array.isArray(apiData) && apiData.length < 1) return

    const ws = XLSX.utils.json_to_sheet(apiData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <Button {...props} onClick={() => exportToCSV(apiData, fileName)}>
      Export
    </Button>
  )
}
