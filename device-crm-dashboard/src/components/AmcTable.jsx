import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Chip, Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAmcEntry } from '../features/amc/amcSlice'
import { saveAs } from 'file-saver'
import styles from './DeviceTable.module.scss'

const calculateDaysLeft = (endDate) => {
  const today = new Date()
  const end = new Date(endDate)
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
  return diff
}

const AmcTable = () => {
  const amcList = useSelector((state) => state.amc.list)
  const dispatch = useDispatch()

  const handleExport = () => {
    const headers = ['Device ID', 'Facility', 'Contract Type', 'Start Date', 'End Date', 'Days Left']
    const rows = amcList.map(a => [
      a.deviceId,
      a.facility,
      a.contractType,
      a.startDate,
      a.endDate,
      calculateDaysLeft(a.endDate),
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'amc_contracts.csv')
  }

  return (
    <>
      <Button onClick={handleExport} variant="outlined" style={{ marginBottom: 10 }}>
        Export CSV
      </Button>

      <TableContainer component={Paper} className={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device ID</TableCell>
              <TableCell>Facility</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Days Left</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amcList.map((entry) => {
              const days = calculateDaysLeft(entry.endDate)
              return (
                <TableRow key={entry.id}>
                  <TableCell>{entry.deviceId}</TableCell>
                  <TableCell>{entry.facility}</TableCell>
                  <TableCell>{entry.contractType}</TableCell>
                  <TableCell>{entry.startDate}</TableCell>
                  <TableCell>{entry.endDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${days} days`}
                      color={days < 0 ? 'error' : days < 30 ? 'warning' : 'success'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => dispatch(deleteAmcEntry(entry.id))}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AmcTable
