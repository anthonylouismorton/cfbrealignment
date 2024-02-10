import { createSlice } from "@reduxjs/toolkit";

export const options = createSlice({
  name: "options",
  initialState: {
    showLogos: false,
    majorConferences: false,
    aqConferences: false, 
    powerConferences: false, 
    hideHistory: false, 
    hideLegend: false, 
    showWelcome: false, 
    smallLogos: false, 
    conFilter: false, 
    showLocation: false
  },
    reducers: {
      changeOption: (state, action) => {
        const { option, value } = action.payload;
        state[option] = value;
      },
    },
})

export const { changeOption } = options.actions;
export default options.reducer;