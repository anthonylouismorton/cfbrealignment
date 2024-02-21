import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const layout = createSlice({
  name: "layout",
  initialState: {
    fullscreen: false,
    showMobile: true
  },
  reducers: {
    openFullscreen: (state) => {
      state.fullscreen = true;
    },
    closeFullscreen: (state) => {
      state.fullscreen = false;
    },
    setShowMobile: (state, action) => {
      state.showMobile = action.payload;
    }
  }
})

export const {openFullscreen, closeFullscreen, setShowMobile} = layout.actions;
export default layout.reducer;