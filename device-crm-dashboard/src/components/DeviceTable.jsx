import React, { useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Chip, LinearProgress, Tooltip, TextField, MenuItem,
  TableSortLabel, Grid, Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDevice } from '../features/devices/deviceSlice'
import DeviceFormModal from './DeviceFormModal'
import styles from './DeviceTable.module.scss'
import { saveAs } from 'file-saver'

const getStatusColor = (status) => {
  switch (status) {
    case 'Online': return 'success'
    case 'Offline': return 'error'
    case 'Maintenance': return 'warning'
    default: return 'default'
  }
}

const DeviceTable = () => {
  const allDevices = useSelector((state) => state.devices.list)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [editDevice, setEditDevice] = useState(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })

  const handleEdit = (device) => {
    setEditDevice(device)
    setModalOpen(true)
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const filteredDevices = allDevices
    .filter((device) =>
      device.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      device.facility.toLowerCase().includes(search.toLowerCase())
    )
    .filter((device) =>
      statusFilter === 'All' ? true : device.status === statusFilter
    )
    .sort((a, b) => {
      const { key, direction } = sortConfig
      if (!key) return 0
      const aVal = a[key]
      const bVal = b[key]

      if (key === 'lastService') {
        return direction === 'asc'
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal)
      }

      if (typeof aVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal
      }

      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    })

  const handleExport = () => {
    const headers = [
      'Device ID',
      'Type',
      'Facility',
      'Status',
      'Battery',
      'Last Service',
      'AMC/CMC'
    ]
    const rows = filteredDevices.map((d) => [
      d.deviceId,
      d.type,
      d.facility,
      d.status,
      `${d.battery}%`,
      d.lastService,
      d.amcStatus,
    ])
    const csv = [headers, ...rows].map((e) => e.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'device_inventory.csv')
  }

  return (
    <>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={5}>
          <TextField
            fullWidth label="Search by Device ID or Facility"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select fullWidth label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3} textAlign="right">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleExport}
            fullWidth
            style={{ height: '100%' }}
          >
            Export CSV
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} className={styles.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'deviceId'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('deviceId')}
                >
                  Device ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Type</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'facility'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('facility')}
                >
                  Facility
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'battery'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('battery')}
                >
                  Battery
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'lastService'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('lastService')}
                >
                  Last Service
                </TableSortLabel>
              </TableCell>
              <TableCell>AMC/CMC</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.deviceId}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.facility}</TableCell>
                <TableCell>
                  <Chip label={device.status} color={getStatusColor(device.status)} />
                </TableCell>
                <TableCell>
                  <Tooltip title={`${device.battery}%`}>
                    <LinearProgress
                      variant="determinate"
                      value={device.battery}
                      className={styles.battery}
                      color={device.battery < 30 ? 'error' : 'success'}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{device.lastService}</TableCell>
                <TableCell>
                  <Chip
                    label={device.amcStatus}
                    color={device.amcStatus === 'Active' ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(device)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => dispatch(deleteDevice(device.id))}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeviceFormModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        mode="edit"
        initialData={editDevice}
      />
    </>
  )
}

export default DeviceTable
