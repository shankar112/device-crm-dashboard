import { configureStore } from '@reduxjs/toolkit'
import deviceReducer from '../features/devices/deviceSlice'
import trainingReducer from '../features/training/trainingSlice'
import visitReducer from '../features/visits/visitSlice'
import amcReducer from '../features/amc/amcSlice'
import alertReducer from '../features/alerts/alertSlice'

export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    training: trainingReducer,
    visits: visitReducer,
    amc: amcReducer,
    alerts: alertReducer,
  },
})
