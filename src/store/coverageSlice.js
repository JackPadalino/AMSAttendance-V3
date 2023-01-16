import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coverageDay:{},
    daySelected:false,
    selectedCoverageDate:'',
    allAbsentUsers: [],
    coveredClasses:[]
};

export const coverageSlice = createSlice({
  name: "coverage",
  initialState,
  reducers: {
    setCoverageDay: (state,action) => {
      state.coverageDay = action.payload;
    },
    resetCoverageDay: (state,action) => {
      state.coverageDay = initialState.coverageDay
    },
    setDaySelected:(state,action) => {
      state.daySelected = action.payload;
    },
    setSelectedCoverageDate: (state, action) => {
        state.selectedCoverageDate = action.payload;
    },
    setAllAbsentUsers: (state, action) => {
      state.allAbsentUsers = action.payload;
    },
    resetAllAbsentUsers: (state, action) => {
      state.allAbsentUsers = initialState.allAbsentUsers;
    },
    setCoveredClasses: (state, action) => {
      state.coveredClasses = action.payload;
    }
  },
});

export const {
    setCoverageDay,
    setDaySelected,
    resetCoverageDay,
    setSelectedCoverageDate,
    setAllAbsentUsers,
    resetAllAbsentUsers,
    setCoveredClasses
} = coverageSlice.actions;

export default coverageSlice.reducer;