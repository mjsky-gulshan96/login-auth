import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './profileSlice'

const profileStore = configureStore({
  reducer: {
    profile: profileSlice.reducer
  }
})

export default profileStore;