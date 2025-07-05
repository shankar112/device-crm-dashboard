import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const amcSlice = createSlice({
  name: 'amc',
  initialState,
  reducers: {
    addAmcEntry: (state, action) => {
      state.list.push({ id: nanoid(), ...action.payload })
    },
    deleteAmcEntry: (state, action) => {
      state.list = state.list.filter((a) => a.id !== action.payload)
    },
  },
})

export const { addAmcEntry, deleteAmcEntry } = amcSlice.actions
export default amcSlice.reducer
