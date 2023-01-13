import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allClasses: [],
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setAllClasses: (state, action) => {
      state.allClasses = action.payload;
    },
  },
});

export const {
  setAllClasses
} = classSlice.actions;

export default classSlice.reducer;