import { createSlice } from "@reduxjs/toolkit";

export const conferences = createSlice({
  name: "conferences",
  initialState: {
    activeConferences: [],
    conferenceChanges: [],
    legendConferences: []
  },
    reducers: {
      setLegend: (state, action) => {
        state['legendConferences'] = action.payload
      },
      setChanges: (state, action) => {
        state['conferenceChanges'] = action.payload
      },
    },
})

export const { setChanges, setLegend } = conferences.actions;
export default conferences.reducer;