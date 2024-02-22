import { createSlice } from "@reduxjs/toolkit";

export const conFilter = createSlice({
  name: "conFilter",
  initialState: {
    'SEC':true,
    'Pac-12':true,
    'Big 12':true,
    'ACC':true,
    'Big Ten':true,
    'SOCON':true,
    'Big 8':true,
    'Border':true,
    'SWC':true,
    'C-USA':true,
    'WAC':true,
    'MVC':true,
    'Skyline':true,
    'WIUFA':true,
    'SIAA':true,
    'Big East':true,
    'BWC':true,
    'MWC':true,
    'RMAC':true,
    'Ivy':true,
    'Sun Belt':true,
    'AAC':true,
    'MAC':true,
    'Southland':true
  },
    reducers: {
      filterCon: (state, action) => {
        const { option, value } = action.payload;
        state[option] = value;
      },
      setConFromStor: (state, action) => {
        return action.payload;
      },
    },
})

export const { filterCon, setConFromStor } = conFilter.actions;
export default conFilter.reducer;