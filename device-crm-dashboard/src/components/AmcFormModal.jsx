import React, { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Grid, Button
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addAmcEntry } from '../features/amc/amcSlice'

const defaultForm = {
  deviceId: '',
  facility: '',
  contractType: 'AMC',
  startDate: '',
  endDate: '',
}

const AmcFormModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(defaultForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    dispatch(addAmcEntry({ ...formData }))
    setFormData(defaultForm)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add AMC/CMC Contract</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField fullWidth label="Device ID" name="deviceId" value={formData.deviceId} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Facility" name="facility" value={formData.facility} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select fullWidth label="Contract Type"
              name="contractType" value={formData.contractType}
              onChange={handleChange}
            >
              <MenuItem value="AMC">AMC</MenuItem>
              <MenuItem value="CMC">CMC</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="date" name="startDate"
              label="Start Date" value={formData.startDate}
              onChange={handleChange} InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="date" name="endDate"
              label="End Date" value={formData.endDate}
              onChange={handleChange} InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AmcFormModal
