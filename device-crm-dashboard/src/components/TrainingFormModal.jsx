import React, { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Grid, Checkbox, FormControlLabel, Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addTrainingEntry } from '../features/training/trainingSlice'

const initialForm = {
  deviceId: '',
  facility: '',
  engineer: '',
  checkDelivery: false,
  checkSetup: false,
  checkDemo: false,
  checkTraining: false,
  remarks: '',
  trainingCompleted: false,
  photo: null,
}

const TrainingFormModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialForm)
  const [photoURL, setPhotoURL] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else if (type === 'file') {
      const file = files[0]
      setFormData({ ...formData, photo: file })
      setPhotoURL(URL.createObjectURL(file))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = () => {
    dispatch(addTrainingEntry({ ...formData, date: new Date().toISOString() }))
    setFormData(initialForm)
    setPhotoURL(null)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>New Installation & Training Entry</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField fullWidth label="Device ID" name="deviceId" value={formData.deviceId} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Facility" name="facility" value={formData.facility} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Engineer Name" name="engineer" value={formData.engineer} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Checklist</Typography>
            <FormControlLabel control={<Checkbox name="checkDelivery" checked={formData.checkDelivery} onChange={handleChange} />} label="Delivery Confirmed" />
            <FormControlLabel control={<Checkbox name="checkSetup" checked={formData.checkSetup} onChange={handleChange} />} label="Device Setup" />
            <FormControlLabel control={<Checkbox name="checkDemo" checked={formData.checkDemo} onChange={handleChange} />} label="Demo Given" />
            <FormControlLabel control={<Checkbox name="checkTraining" checked={formData.checkTraining} onChange={handleChange} />} label="Training Completed" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth multiline minRows={2}
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Unboxing Photo</Typography>
            <input type="file" accept="image/*" name="photo" onChange={handleChange} />
            {photoURL && (
              <img src={photoURL} alt="preview" style={{ width: '100%', marginTop: 8, borderRadius: 4 }} />
            )}
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

export default TrainingFormModal
