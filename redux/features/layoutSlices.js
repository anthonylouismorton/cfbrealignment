import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const layout = createSlice({
  name: "layout",
  initialState: {
    fullscreen: false,
    showMobile: false,
    showList: false,
    mapHeight: null
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
    },
    setShowList: (state, action) => {
      state.showList = action.payload;
    },
    setMapHeight: (state, action) => {
      state.mapHeight = action.payload;
    }
  }
})

export const {openFullscreen, closeFullscreen, setShowMobile, setShowList, setMapHeight} = layout.actions;
export default layout.reducer;