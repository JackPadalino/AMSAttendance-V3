import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date:'',
    letterDay:'',
    allAbsentUsers: [],
    singleAbsentUser:{},
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
    setSingleAbsentUser: (state, action) => {
      state.singleAbsentUser = action.payload;
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
    setSingleAbsentUser,
    setCoveredClasses
} = absenceSlice.actions;

export default absenceSlice.reducer;