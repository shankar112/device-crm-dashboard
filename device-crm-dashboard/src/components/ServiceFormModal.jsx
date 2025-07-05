import React, { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Grid, MenuItem, Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addVisitEntry } from '../features/visits/visitSlice'

const defaultForm = {
  deviceId: '',
  engineer: '',
  visitType: 'Preventive',
  notes: '',
  date: '',
  attachment: null,
}

const ServiceFormModal = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(defaultForm)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, files, type } = e.target
    if (type === 'file') {
      const file = files[0]
      setFormData({ ...formData, attachment: file })
      setPreview(URL.createObjectURL(file))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = () => {
    dispatch(addVisitEntry({ ...formData }))
    setFormData(defaultForm)
    setPreview(null)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Log Service Visit</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField fullWidth label="Device ID" name="deviceId" value={formData.deviceId} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Engineer" name="engineer" value={formData.engineer} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select fullWidth label="Visit Type"
              name="visitType" value={formData.visitType}
              onChange={handleChange}
            >
              <MenuItem value="Preventive">Preventive</MenuItem>
              <MenuItem value="Breakdown">Breakdown</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="date" name="date" label="Visit Date"
              value={formData.date} onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth multiline minRows={3} label="Visit Notes"
              name="notes" value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Attachment (photo or PDF)</Typography>
            <input type="file" name="attachment" accept="image/*,application/pdf" onChange={handleChange} />
            {preview && (
              <div style={{ marginTop: 10 }}>
                {formData.attachment.type.includes('pdf') ? (
                  <a href={preview} target="_blank" rel="noopener noreferrer">View PDF</a>
                ) : (
                  <img src={preview} alt="preview" style={{ maxWidth: '100%', marginTop: 8 }} />
                )}
              </div>
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

export default ServiceFormModal
