import React from 'react'
import { useSelector } from 'react-redux'
import {
  Grid, Paper, Typography, Box, Chip, Divider, List, ListItem, ListItemText
} from '@mui/material'

const Dashboard = () => {
  const devices = useSelector((state) => state.devices.list)
  const training = useSelector((state) => state.training.list)
  const visits = useSelector((state) => state.visits.list)
  const amc = useSelector((state) => state.amc.list)
  const alerts = useSelector((state) => state.alerts.list)

  const totalDevices = devices.length
  const onlineCount = devices.filter(d => d.status === 'Online').length
  const offlineCount = devices.filter(d => d.status === 'Offline').length
  const maintenanceCount = devices.filter(d => d.status === 'Maintenance').length

  const activeContracts = amc.filter(a => {
    const end = new Date(a.endDate)
    return end > new Date()
  }).length

  const expiringContracts = amc.filter(a => {
    const end = new Date(a.endDate)
    const daysLeft = (end - new Date()) / (1000 * 60 * 60 * 24)
    return daysLeft <= 30 && daysLeft >= 0
  }).length

  const recentAlerts = alerts.slice(-5).reverse()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard Summary</Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6">Total Devices</Typography>
            <Typography variant="h4">{totalDevices}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Chip label={`Online: ${onlineCount}`} color="success" style={{ marginRight: 5 }} />
            <Chip label={`Offline: ${offlineCount}`} color="error" style={{ marginRight: 5 }} />
            <Chip label={`Maintenance: ${maintenanceCount}`} color="warning" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6">Installations</Typography>
            <Typography variant="h4">{training.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6">Service Visits</Typography>
            <Typography variant="h4">{visits.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6">Alerts</Typography>
            <Typography variant="h4">{alerts.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6">AMC/CMC Contracts</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Chip label={`Active: ${activeContracts}`} color="success" style={{ marginRight: 10 }} />
            <Chip label={`Expiring Soon: ${expiringContracts}`} color="warning" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6">Recent Alerts</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <List dense>
              {recentAlerts.map((alert, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`[${alert.alertType}] ${alert.deviceId}`}
                    secondary={alert.notes}
                  />
                </ListItem>
              ))}
              {recentAlerts.length === 0 && <Typography>No recent alerts.</Typography>}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
