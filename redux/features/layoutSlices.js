import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const layout = createSlice({
  name: "layout",
  initialState: {
    fullscreen: false,
    isYearVis: true
  },
  reducers: {
    openFullscreen: (state) => {
      state.fullscreen = true;
    },
    closeFullscreen: (state) => {
      state.fullscreen = false;
    },
    setYearVis: (state, action) => {
      state.isYearVis = action.payload;
    }
  }
})

export const {openFullscreen, closeFullscreen, setYearVis} = layout.actions;
export default layout.reducer;