import { createSlice } from "@reduxjs/toolkit";
import { MIN_YEAR } from '@/app/constants';

export const year = createSlice({
  name: "year",
  initialState: MIN_YEAR,
  reducers: {
    setYear: (state, action) => {
      return action.payload;
    }
  }
})

export const { setYear } = year.actions;
export default year.reducer;