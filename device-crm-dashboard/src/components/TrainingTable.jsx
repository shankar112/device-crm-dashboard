import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTrainingEntry } from '../features/training/trainingSlice'
import styles from './DeviceTable.module.scss'

const TrainingTable = () => {
  const trainingList = useSelector((state) => state.training.list)
  const dispatch = useDispatch()

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Facility</TableCell>
            <TableCell>Engineer</TableCell>
            <TableCell>Checklist</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainingList.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.deviceId}</TableCell>
              <TableCell>{entry.facility}</TableCell>
              <TableCell>{entry.engineer}</TableCell>
              <TableCell>
                {entry.checkDelivery && <Chip label="Delivery" color="primary" size="small" />}
                {entry.checkSetup && <Chip label="Setup" color="success" size="small" />}
                {entry.checkDemo && <Chip label="Demo" color="warning" size="small" />}
                {entry.checkTraining && <Chip label="Training" color="info" size="small" />}
              </TableCell>
              <TableCell>{entry.remarks}</TableCell>
              <TableCell>
                {entry.photo ? <img src={URL.createObjectURL(entry.photo)} alt="uploaded" width={60} /> : 'N/A'}
              </TableCell>
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => dispatch(deleteTrainingEntry(entry.id))}>
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

export default TrainingTable
