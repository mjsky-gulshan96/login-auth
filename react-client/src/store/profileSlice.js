import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: null,
  reducers: {
    setProfile: (state, actions) => {
      return actions.payload.profile;
    },
    removeProfile: () => {
      return null
    }
  }
})

export const profileActions = profileSlice.actions

export default profileSlice;