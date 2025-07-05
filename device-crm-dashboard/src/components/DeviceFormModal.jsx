import React, { useEffect, useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addDevice, updateDevice } from '../features/devices/deviceSlice'

const defaultDevice = {
  deviceId: '',
  type: '',
  facility: '',
  status: 'Online',
  battery: 100,
  lastService: '',
  amcStatus: 'Active',
}

const DeviceFormModal = ({ open, handleClose, mode, initialData }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(defaultDevice)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData)
    } else {
      setFormData(defaultDevice)
    }
  }, [initialData, mode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.deviceId) newErrors.deviceId = 'Required'
    if (!formData.facility) newErrors.facility = 'Required'
    if (formData.battery < 0 || formData.battery > 100)
      newErrors.battery = 'Battery must be between 0 and 100'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    if (mode === 'edit') {
      dispatch(updateDevice(formData))
    } else {
      dispatch(addDevice(formData))
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Edit Device' : 'Add Device'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth label="Device ID" name="deviceId"
              value={formData.deviceId} onChange={handleChange}
              error={!!errors.deviceId} helperText={errors.deviceId}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth label="Type" name="type"
              value={formData.type} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Facility" name="facility"
              value={formData.facility} onChange={handleChange}
              error={!!errors.facility} helperText={errors.facility}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth select label="Status" name="status"
              value={formData.status} onChange={handleChange}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="number" label="Battery (%)" name="battery"
              value={formData.battery} onChange={handleChange}
              error={!!errors.battery} helperText={errors.battery}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth type="date" label="Last Service Date" name="lastService"
              value={formData.lastService} onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth select label="AMC/CMC Status" name="amcStatus"
              value={formData.amcStatus} onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === 'edit' ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeviceFormModal
