import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVisitEntry } from '../features/visits/visitSlice'
import styles from './DeviceTable.module.scss'

const ServiceTable = () => {
  const serviceList = useSelector((state) => state.visits.list)
  const dispatch = useDispatch()

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Engineer</TableCell>
            <TableCell>Visit Type</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Attachment</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceList.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.deviceId}</TableCell>
              <TableCell>{entry.engineer}</TableCell>
              <TableCell>
                <Chip label={entry.visitType} color={entry.visitType === 'Preventive' ? 'success' : 'error'} />
              </TableCell>
              <TableCell>{entry.notes}</TableCell>
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {entry.attachment ? (
                  entry.attachment.type.includes('pdf') ? (
                    <a href={URL.createObjectURL(entry.attachment)} target="_blank" rel="noopener noreferrer">PDF</a>
                  ) : (
                    <img src={URL.createObjectURL(entry.attachment)} alt="attachment" width={60} />
                  )
                ) : 'N/A'}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => dispatch(deleteVisitEntry(entry.id))}>
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

export default ServiceTable
