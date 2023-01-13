import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date:'',
    letterDay:'',
    allAbsentUsers: [],
    coveredClasses:[]
};

export const absenceSlice = createSlice({
  name: "absence",
  initialState,
  reducers: {
    setDate: (state, action) => {
        state.date = action.payload;
    },
    setLetterDay: (state, action) => {
      state.letterDay = action.payload;
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
    setDate,
    setLetterDay,
    setAllAbsentUsers,
    setCoveredClasses
} = absenceSlice.actions;

export default absenceSlice.reducer;