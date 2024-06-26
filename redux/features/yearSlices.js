import { createSlice } from "@reduxjs/toolkit";

export const year = createSlice({
  name: "year",
  initialState: 1891,
  reducers: {
    setYear: (state, action) => {
      return action.payload;
    }
  }
})

export const { setYear } = year.actions;
export default year.reducer;