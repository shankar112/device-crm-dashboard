import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Chip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlertEntry } from '../features/alerts/alertSlice'
import styles from './DeviceTable.module.scss'

const AlertTable = () => {
  const alerts = useSelector((state) => state.alerts.list)
  const dispatch = useDispatch()

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>{alert.deviceId}</TableCell>
              <TableCell>
                <Chip label={alert.alertType} color={
                  alert.alertType === 'Hardware' ? 'warning' :
                  alert.alertType === 'Software' ? 'info' : 'default'
                } />
              </TableCell>
              <TableCell>{alert.notes}</TableCell>
              <TableCell>
                {alert.photo && (
                  <img src={URL.createObjectURL(alert.photo)} alt="alert" width={60} />
                )}
              </TableCell>
              <TableCell>{new Date(alert.date).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => dispatch(deleteAlertEntry(alert.id))}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AlertTable
