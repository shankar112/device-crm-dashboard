import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    addTrainingEntry: (state, action) => {
      state.list.push({ id: nanoid(), ...action.payload })
    },
    deleteTrainingEntry: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTrainingEntry, deleteTrainingEntry } = trainingSlice.actions
export default trainingSlice.reducer
