import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    schools: [],
    schoolModal: false,
    selectedSchool: null,
    hoveredSchool: null,
    hoveredState: { stateInfo: null },
    position: { coordinates: [-96.6, 38.7], zoom: 1 },
    mapSize: { width: 800, height: 500 },
    mapFill: [],
    toolTipPos: { longitude: null, latitude: null, longOffSet: 0, latOffSet: 0 },
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
        state.styling = action.payload.updateStyling;
      },
      setSchool: (state, action) => {
        if(action.payload.modal){
          state.schoolModal = action.payload.modal;
        }
        state.selectedSchool = action.payload.school
      }
    },
});

export const { setMapInfo, setLogo, setSchool } = map.actions;
export default map.reducer;