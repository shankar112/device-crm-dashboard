import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      state.list.push({ id: nanoid(), ...action.payload })
    },
    deleteDevice: (state, action) => {
      state.list = state.list.filter((d) => d.id !== action.payload)
    },
    updateDevice: (state, action) => {
      const index = state.list.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) state.list[index] = action.payload
    },
  },
})

export const { addDevice, deleteDevice, updateDevice } = deviceSlice.actions
export default deviceSlice.reducer
