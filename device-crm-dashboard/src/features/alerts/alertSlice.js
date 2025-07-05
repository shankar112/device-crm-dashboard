import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlertEntry: (state, action) => {
      state.list.push({ id: nanoid(), ...action.payload })
    },
    deleteAlertEntry: (state, action) => {
      state.list = state.list.filter((a) => a.id !== action.payload)
    },
  },
})

export const { addAlertEntry, deleteAlertEntry } = alertSlice.actions
export default alertSlice.reducer
