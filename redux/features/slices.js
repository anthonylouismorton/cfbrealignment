import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fullscreen = createSlice({
  name: "fullscreen",
  initialState: false,
  reducers: {
    openFullscreen: () => {
      return true;
    },
    closeFullscreen: () => {
      return false;
    }
  }
})

export const {openFullscreen, closeFullscreen} = fullscreen.actions;
export default fullscreen.reducer;