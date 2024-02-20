import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    schools: [],
    hoveredSchool: null,
    hoveredState: null,
    styling: {
      circleRadius: 3,
      logoOffset: 20,
      logoSize: -10,
      hoveredSchool: { x: 10, y: -5, fontSize: "12px", padding: "py-[2px] px-[5px]", rounded: "rounded-sm"},
    }
  },
    reducers: {
      setMapInfo: (state, action) => {
        const { map, value } = action.payload;
        state[map] = value;
      },
      setLogo: (state, action) => {
        console.log(action.payload)
        state.styling = action.payload.updateStyling;
      },
    },
});

export const { setMapInfo, setLogo } = map.actions;
export default map.reducer;