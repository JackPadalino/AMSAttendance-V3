import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleDate:'',
    scheduleLetterDay:'',
    scheduleAbsentUser: {},
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setScheduleDate: (state, action) => {
        state.scheduleDate = action.payload;
    },
    setScheduleLetterDay: (state, action) => {
      state.scheduleLetterDay = action.payload;
    },
    setScheduleAbsentUser: (state, action) => {
      state.scheduleAbsentUser = action.payload;
    },
  },
});

export const {
    setScheduleDate,
    setScheduleLetterDay,
    setScheduleAbsentUser
} = scheduleSlice.actions;

export default scheduleSlice.reducer;