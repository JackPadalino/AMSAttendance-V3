import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coverageDate:'',
    coverageLetterDay:'',
    allAbsentUsers: [],
    coveredClasses:[]
};

export const coverageSlice = createSlice({
  name: "coverage",
  initialState,
  reducers: {
    setCoverageDate: (state, action) => {
        state.coverageDate = action.payload;
    },
    setCoverageLetterDay: (state, action) => {
      state.coverageLetterDay = action.payload;
    },
    setAllAbsentUsers: (state, action) => {
      state.allAbsentUsers = action.payload;
    },
    setCoveredClasses: (state, action) => {
      state.coveredClasses = action.payload;
    }
  },
});

export const {
    setCoverageDate,
    setCoverageLetterDay,
    setAllAbsentUsers,
    setCoveredClasses
} = coverageSlice.actions;

export default coverageSlice.reducer;