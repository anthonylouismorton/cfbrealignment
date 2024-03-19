import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const layout = createSlice({
  name: "layout",
  initialState: {
    fullscreen: false,
    showList: true,
    mapHeight: null
  },
  reducers: {
    openFullscreen: (state) => {
      state.fullscreen = true;
    },
    closeFullscreen: (state) => {
      state.fullscreen = false;
    },
    setShowList: (state, action) => {
      state.showList = action.payload;
    },
    setMapHeight: (state, action) => {
      state.mapHeight = action.payload;
    }
  }
})

export const {openFullscreen, closeFullscreen, setShowList, setMapHeight} = layout.actions;
export default layout.reducer;