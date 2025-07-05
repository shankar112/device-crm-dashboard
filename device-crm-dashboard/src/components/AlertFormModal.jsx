import React, { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Grid, Button, Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addAlertEntry } from '../features/alerts/alertSlice'

const defaultForm = {
  deviceId: '',
  alertType: 'Hardware',
  notes: '',
  photo: null,
  date: '',
}

const AlertFormModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(defaultForm)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      const file = files[0]
      setFormData({ ...formData, photo: file })
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = () => {
    dispatch(addAlertEntry(formData))
    setFormData(defaultForm)
    setPreview(null)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Report Device Alert</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField fullWidth label="Device ID" name="deviceId" value={formData.deviceId} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select fullWidth label="Alert Type" name="alertType"
              value={formData.alertType} onChange={handleChange}
            >
              <MenuItem value="Hardware">Hardware</MenuItem>
              <MenuItem value="Software">Software</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth multiline minRows={2}
              label="Issue Description" name="notes"
              value={formData.notes} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="date" name="date" label="Reported On"
              value={formData.date} onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Photo Upload</Typography>
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
            {preview && <img src={preview} alt="alert-preview" style={{ width: '100%', marginTop: 8 }} />}
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

export default AlertFormModal
