import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const visitSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    addVisitEntry: (state, action) => {
      state.list.push({ id: nanoid(), ...action.payload })
    },
    deleteVisitEntry: (state, action) => {
      state.list = state.list.filter((v) => v.id !== action.payload)
    },
  },
})

export const { addVisitEntry, deleteVisitEntry } = visitSlice.actions
export default visitSlice.reducer
